import React from 'react'
import styled from 'styled-components'
import { Store } from './Store'
import { useTable, useBlockLayout, useResizeColumns } from 'react-table'
import namor from 'namor'

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

  .table {
    display: inline-block;
    border-spacing: 0;

    > div:first-child {
      border: 1px solid black;
      
      .tr:first-child {
        .th{
          div:not(last-child){

            border-right: 1px solid black
          }
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

  // clone to prevent mutating the store by filtering 
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

  console.log(formattedSongData)

  const data = React.useMemo(() => formattedSongData)

  return (
    <Container>
      <Table columns={columns} data={data} />
    </Container>
  )

}

// boilerplate from the table CSS library that will manage local state
// and local events- click, doubleclick, up, down

function Table({ columns, data }) {

  const [ selectedID, handleIDSelect ] = React.useState(0)

  React.useEffect(()=>{

    const keyPressHandler = (e: any) =>{

      e.preventDefault()
      e.stopPropagation()
    
      let { key } = e
      
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
 
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      // width: 100,
      maxWidth: 250,
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

  function handleClick(e: any){

    handleIDSelect(Number(e.target.parentNode.id))
  }

  return (

    <div {...getTableProps()} className="table">
    
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

      <div {...getTableBodyProps()}>

        {rows.map(
        
          (row, i) => {
           
            return prepareRow(row) || (
              
              <div {...row.getRowProps()} 
                   className={ Number(row.original.ID) === Number(selectedID) ? "tr selected" : "tr" } 
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
