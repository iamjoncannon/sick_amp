import React from 'react'
import styled from 'styled-components'
import { Store } from './Store'
import { useTable, useBlockLayout, useResizeColumns } from 'react-table'
import namor from 'namor'

var Container = styled.div`

  font-size: .75rem;

  padding: .25rem;

  user-select: none; 
   -webkit-user-select: none;
   -khtml-user-select: none; 
   -moz-user-select: none;
   -ms-user-select: none; 

  .table {
    display: inline-block;
    border-spacing: 0;

    > div:first-child {
      border: 1px solid black;
      
      .tr:first-child {
        .th{
          div:not(last-child){

            border-right: 2px solid black
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
      overflow: hidden;
      padding: 0.25rem;
      
      

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

function SongTable() {

  const { state, dispatch } = React.useContext(Store);

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

  const formattedSongData = Object.values(state.Songs)

  const data = React.useMemo(() => formattedSongData, [])

  return (
    <Container>
      <Table columns={columns} data={data} />
    </Container>
  )
}

function Table({ columns, data }) {

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 150,
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
    
      <div>

        {headerGroups.map(headerGroup => (
        
          <div {...headerGroup.getHeaderGroupProps()} className="tr">
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
        
          (row, i) =>
            prepareRow(row) || (
              <div {...row.getRowProps()} className="tr" onClick={(e)=>console.dir(e.target)}>
                {row.cells.map(cell => {
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render('Cell')}
                    </div>
                  )
                })}
              </div>
            )
        )}
      </div>
    </div>
  )
}


export default SongTable
