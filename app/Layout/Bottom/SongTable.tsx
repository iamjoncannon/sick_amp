import React from 'react'
import styled from 'styled-components'
import { Store } from '../../store/Store'
import { useTable, useBlockLayout, useResizeColumns } from 'react-table'

/*

Note- there are a ton of type errors in this library which 
I have not been able to resolve

*/


// Container styling from table library 

var Container = styled.div`

  font-size: .75rem;
  font-weight: 500;

  padding: .1rem;

  user-select: none; 
   -webkit-user-select: none;
   -khtml-user-select: none; 
   -moz-user-select: none;
   -ms-user-select: none; 

   .headers .th {

   }

   .headers:hover{
     background-color: grey !important;
   }

  .tr:hover{
    background-color: orange; 
  }

  .selected {
    
    background-color: orange;
  }

  .playing {
    color: blue; 
    opacity: .5;
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

function SongTable() {

  const { state, dispatch } = React.useContext(Store);

  // format state for the table library 
  const generatedColumns = Object.keys(state.ColumnHash).map(key=>{
      
    return {
      Header: key, 
      accessor: key
    }
  })

  const columns = React.useMemo(
    ()=> generatedColumns, 
    []
  )

  // clone to prevent store mutations from filtering 
  let formattedSongData = JSON.parse(JSON.stringify(state.Songs))
  
  // filter list if playlist selected  

  if(state.SelectedPlaylist !== "All" && !!state.PlayLists){
    
    const currentList = state.PlayLists[state.SelectedPlaylist].ids
    
    for(let song in formattedSongData){

      if(!currentList.includes(formattedSongData[song].ID)){

        delete formattedSongData[song]
      }
    }
  }

  formattedSongData = Object.values(formattedSongData)

  const data = React.useMemo(() => formattedSongData)

  return (
    <Container>
      <Table columns={columns} data={data} />
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

  // hook to manage keyboard events- 

  React.useEffect(()=>{

    const keyPressHandler = (e: any) =>{

      e.preventDefault()
      e.stopPropagation()
    
      const { key, code } = e

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
  
        let newSeletedID = selectedID - 1
    
        handleIDSelect(newSeletedID)
      }
      
      if(key === "ArrowDown"){
  
        let newSeletedID = selectedID + 1
    
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

  const handleDoubleClick = (e: any) => {

      dispatch({
        type: "PLAY_TRACK",
        payload: e.target.parentNode.id
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

            const isSelected = Number(row.original.ID) === Number(selectedID) 

            if(isSelected){

              calculatedStyle += " selected"

              console.log("hitting selected", selectedID)
            }

            const isPlaying = Number(row.original.ID) === Number(state.Transport.current) 

            if(isPlaying){

              calculatedStyle += " playing"

              console.log('hitting isPlaying', state.Transport.current )
            }
            
           
            return prepareRow(row) || (
              
              <div {...row.getRowProps()} 
                   draggable
                   onDoubleClick={e=>handleDoubleClick(e)}
                   onDragStart={(e)=>onDragStart(e, Number(row.original.ID))} 
                   className={ calculatedStyle } 
                   id={row.original.ID} 
                   onClick={e=>handleClick(e)}
              >

                {row.cells.map(cell => {
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

export default SongTable
