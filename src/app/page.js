'use client'
import { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';

// const getNewsData = async () => {
// 	try {
// 		const res = await fetch(`https://btp-2023.onrender.com/news`);
// 		const data = await res.json();
// 		console.log(data);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

export default function Home() {
  const [data, setData] = useState([]);

  const tableData = useMemo(() => {
    return data;
  }, [data])

  console.log(data)

  const tableColumns = useMemo(() => {
    console.log(data.length)
    console.log(data.length==0)
    if(data.length==0) return []

    console.log(data)

    return Object.keys(data[0]).map((e) => {
      return {
        "Header": e,
        "accessor": e
      };
    })
  }, [data])

  console.log(tableData,tableColumns)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns : tableColumns, data : tableData }, useSortBy);

  useEffect(() => {
    fetch(`https://btp-2023.onrender.com/news`)
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData)
        setData(resData["news"])
      })
  }, [])

  return (
    <div>
      <table {...getTableProps()} style={{ border: 'solid 1px white' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: 'solid 3px red',
                    color: 'white',
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? '🔽'
                        : '🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}