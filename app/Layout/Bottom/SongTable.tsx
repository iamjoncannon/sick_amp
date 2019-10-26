import React from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout, useResizeColumns } from 'react-table'
import namor from 'namor'

const range = ( len : number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    // progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

const Container = styled.div`

  padding: .5rem;

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
      padding: 0.5rem;
      
      

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

function SongTable() {

  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      // {
      //   Header: 'Info',
      //   columns: [
      //     {
      //       Header: '',
      //       accessor: 'age',
      //       width: 50,
      //     },
      //     {
      //       Header: 'Visits',
      //       accessor: 'visits',
      //       width: 60,
      //     },
      //     {
      //       Header: 'Status',
      //       accessor: 'status',
      //     },
      //     {
      //       Header: 'Profile Progress',
      //       accessor: 'progress',
      //     },
      //   ],
      // },

    ],
    []
  )

  const data = React.useMemo(() => makeData(20), [])

  return (
    <Container>
      <Table columns={columns} data={data} />
    </Container>
  )
}

export default SongTable
