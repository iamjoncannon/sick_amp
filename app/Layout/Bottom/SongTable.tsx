import React from 'react'
import styled, { withTheme } from 'styled-components'
import { Store } from '../../store/Store'
import { hydrateSongs } from '../../store/Thunks'
import { useTable, useBlockLayout, useResizeColumns } from 'react-table'

// Container styling from table library 

var Container = styled.div`

  height: 65.5vh;
  font-size: .75rem;
  font-weight: 500;
  overflow: scroll;
  user-select: none; 
   -webkit-user-select: none;
   -khtml-user-select: none; 
   -moz-user-select: none;
   -ms-user-select: none; 

   .headers .th {
      background-color: ${props=> props.theme.primaryColor}
   }

   .headers:hover{

     background-color: ${props=>props.theme.highlightColor} !important;
   }

  .tr:hover{
    opacity: .75;
    border: 1px solid rgba(255, 0, 0, .75);
  }

  .primary {
    background-color: ${props=> props.theme.tertiaryColor}
  }

  .secondary {
    background-color: ${props=> props.theme.primaryColor}
  }

  .selected {
    opacity: .75;
    border: 1px solid rgba(255, 0, 0, .75);
  }

  .draggedOver {

    border-top: 2px solid ${props=>props.theme.logoColor};
  }

  .playing {
    color: rgba(255, 0, 0, .9)
  }

  .table {
    display: inline-block;
    border-spacing: 0;

    > div:first-child {
      border: 1px solid black;
      
      .tr:first-child {
        .th{
          

            border-right: 1px solid black
        }
      }
    }
  
    .tr {
      :last-child {
        .th {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      padding-left: .5rem;
      padding-top: .25rem;
      padding-bottom: .25rem;
      
      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
      }

      ${'' /* The resizer styles! */}

      .resizer {
        display: inline-block;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;

        &.isResizing {
          
        }
      }
    }
  }
`

// container that manages global state from store

function SongTableContainer() {

  const { state, dispatch } = React.useContext(Store);
  const [ Page, setPage ] = React.useState(1)

  const { SelectedPlaylist, PlayLists, FilterState } = state 

  const CurrentPlayList = PlayLists[SelectedPlaylist]

  const isLoaded = !!CurrentPlayList.hydrated[Page]

  React.useEffect( ()=>{
    
    /*
      fetch songs for this page if not hydrated
    */

    if( !isLoaded ){

      hydrateSongs(state.token, dispatch, SelectedPlaylist, Page)
    }

    let container = document.getElementById("song_table")

    const handleScroll = () => {

        const { scrollTop, scrollHeight, offsetHeight } = container 
      
        if (scrollTop + offsetHeight > scrollHeight - 100 ) {

          if(!CurrentPlayList.hydrated.Complete && isLoaded){

              setPage(Page + 1)
            }
        }
    }

    container.addEventListener("scroll", handleScroll);

    return () => {

      container.removeEventListener("scroll", handleScroll)
    }
  })

  // format state for the table library 
  const generatedColumns = Object.values(state.Columns).map(column=>{
      
    return {
      Header: column.name, 
      accessor: column.name
    }
  })

  const columns = React.useMemo(
    ()=> generatedColumns, 
    []
  )
   

  // generate playlist from songs 

  let formattedSongData = SelectedPlaylist === "All" ? Object.values(state.Songs) : []

  if(state.SelectedPlaylist !== "All" && !!state.PlayLists){
        
    const currentList = PlayLists[SelectedPlaylist].files
    
    for(let song of currentList){

      // precaution
      let song_exists = state.Songs[song]

      if(song_exists){

          formattedSongData.push(state.Songs[song])
      }
    }

    // throttle precaution
    if(CurrentPlayList.files.length > 50 
        && isLoaded 
        && formattedSongData.length < 50){

      setPage(Page + 1)
    }
  }


  // generate list of filters 

  // we wanted to key into the FilterState object, now we want to
  // be able to iterate through each field and apply that filter 
  // as a test to each song -
  
  const FilterList = []

  for(let i = 0; i < Object.entries(FilterState).length; i++){

    // the entire object -- "genre" : { "rap": true, "country": true}
    let this_field = Object.entries(FilterState)[i]

    let field_name = this_field[0] 

    // { "rap": true, "country": true}
    let entries_in_field = Object.keys(this_field[1])

    if( field_name === "bpm"){

      // special case- pushing the array 
      FilterList.push(["bpm", this_field[1] ])
    }
    else if(entries_in_field.length){

      FilterList.push( [ field_name, entries_in_field ] )
    }
  }

  formattedSongData = formattedSongData.filter(song=>{

    let passesTest = true 

    FilterList.forEach((filter)=>{

      let test_field = filter[0]

      let this_test
      
      if(filter[0] === "bpm"){
        
        this_test = ( filter[1][0] < song[test_field] ) && ( song[test_field] < filter[1][1])
      }
      else {
      
        this_test = filter[1].includes(song[test_field])
      }

      passesTest = this_test
    })

    return passesTest 
  })

  // the table expects an array of objects - 
 
 const data = React.useMemo(() => formattedSongData)

  return (

    <Container id={"song_table"}>
      
      <Table 
        columns={columns} 
        data={data} 
      />

    </Container>
  )
}

/*

boilerplate from the table CSS library that will manage local state
and local events- click, doubleclick, up, down

this one is a bit longer, so I'm going to annotate

*/

function Table({ columns, data }) {

  const { state, dispatch } = React.useContext(Store);
  
  const [ selectedID, handleIDSelect ] = React.useState(0)
  const [ isDraggedOver, handleDragOver ] = React.useState(null)

  // hook to manage keyboard events- 

  React.useEffect(()=>{

    const keyPressHandler = (e: any) =>{

      if(state.isEditingNewPlayList) return 
      if(state.isTypingInSearchBar) return 
      
      e.preventDefault()
    
      const { key, code } = e
      const { PlayLists, SelectedPlaylist } = state 
      
      if(code === "Enter"){

        dispatch({
          type: "PLAY_TRACK",
          payload: selectedID 
        })
      }

      if(code === "Space"){

        dispatch({
          type: "TOGGLE_PLAYERSTATE",
          payload: null 
        })
      }
      
      if(key === "ArrowUp"){

        let newSeletedID 

        if(SelectedPlaylist === "All"){

          newSeletedID = selectedID === 1 ? PlayLists["All"].length -1 : Number(selectedID) - 1 
        }
        else{

            // if its a specific playlist, then we need to find the index of the track in the 
            // playlists files and return the previous index, or end if 0 

            const CurrentPlaylist = PlayLists[SelectedPlaylist].files

            const current_index = CurrentPlaylist.indexOf(selectedID)

            newSeletedID = current_index === 0 ? CurrentPlaylist[CurrentPlaylist.length -1] : CurrentPlaylist[current_index -1 ] 
        
        }
  
        handleIDSelect(newSeletedID)
      }
      
      if(key === "ArrowDown"){

        let newSeletedID 

        if(SelectedPlaylist === "All"){

          newSeletedID = selectedID === PlayLists["All"].length -1 ? 1 : Number(selectedID) + 1 
      }
      else{

          let CurrentPlaylist = PlayLists[SelectedPlaylist].files

          const current_index = CurrentPlaylist.indexOf(selectedID)

          newSeletedID = current_index === CurrentPlaylist.length -1 ? CurrentPlaylist[0] : CurrentPlaylist[current_index + 1 ] 
      }
        
        handleIDSelect(newSeletedID)
      }
    }
    
    window.addEventListener('keydown', keyPressHandler)

    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    }
  })
 
  // our callbacks to manage events on the tracks 

  function handleClick(e: any){

    handleIDSelect(Number(e.target.parentNode.id))
  }

  const onDragStart = (e : any, id: number) => {
    
    e.dataTransfer.setData( "track", id)
  }

  const onDragEnd = () => {

    dispatch({type: "DRAG_OVER_PLAYLIST", payload: null})
  }

  const handleDoubleClick = (e: any) => {

      dispatch({
        type: "PLAY_TRACK",
        payload: e.target.parentNode.id
      })
  }

  const onDragOver = (e : any) => {

    const { id } = e.target.parentNode

    e.preventDefault()

    handleDragOver(id)
  }

  const onDrop = (e: any) => {

    handleDragOver(null)

    const { id } = e.target.parentNode

    const item_to_be_moved = e.dataTransfer.getData( "track")

    dispatch({
        type: "REARRANGE_PLAYLIST",
        payload: {
            item_to_put_before: Number(id),
            item_to_be_moved: Number(item_to_be_moved)
        }
    })

  }

  // column boilerplate from the table library: 

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      // width: 100,
      maxWidth: 500,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns
  )

  return (

    <div {...getTableProps()} className="table">
    
    {/* Column Headers  */}

      <div>

        {headerGroups.map(headerGroup => (
        
          <div {...headerGroup.getHeaderGroupProps()} className="tr headers">

            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps()} className="th">
                {column.render('Header')}
                {/* Use column.getResizerProps to hook up the events correctly */}
                <div
                  {...column.getResizerProps()}
                  className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                />
              </div>
            ))}

          </div>

        ))}
      </div>

      {/* The song tracks  */}

      <div {...getTableBodyProps()}>

        {rows.map(
        
          (row : any, i : number) => {
            
            // check if locally selected or globally playing 

            let calculatedStyle = "tr"

            const isSelected = Number(row.original.id) === Number(selectedID) 

            if(i % 2 === 0 ){
              
              calculatedStyle += " primary"
            }
            else{

              calculatedStyle += " secondary"
            }

            if(isSelected){

              calculatedStyle += " selected"
            }

            const isPlaying = Number(row.original.id) === Number(state.Transport.current) 

            if(isPlaying){

              calculatedStyle += " playing"
            }

            if(!!isDraggedOver && Number(row.original.id) === Number(isDraggedOver)){

              calculatedStyle += " draggedOver"
            }

            return prepareRow(row) || (
              
              <div 
                {...row.getRowProps()} 
                draggable
                onDoubleClick={e=>handleDoubleClick(e)}
                onDragStart={(e)=>onDragStart(e, Number(row.original.id))} 
                onDragEnd={onDragEnd}
                onDragOver={ e=> state.SelectedPlaylist !== "All" && onDragOver(e)}
                className={ calculatedStyle } 
                id={row.original.id} 
                onClick={e=>handleClick(e)}
                onDrop={(e)=> state.SelectedPlaylist !== "All" && onDrop(e)}
              >

                {row.cells.map( cell => {
                  
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render('Cell')}
                    </div>
                  )
                })}

              </div>
            )
          }
        )}
      </div>

    </div>
  )
}

export default SongTableContainer
