import { useTable, useSortBy } from 'react-table'
import DATA from './DATA.json'
import { COLUMNS } from './COLUMNS'
import { useMemo } from 'react'
import './Table.css'

export const SortingTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => DATA, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data
    }, useSortBy)

    return(
        <div>
            <table {...getTableProps()}>

                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th style={{width: '200px'}} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? 
                                            (column.isSortedDesc ? 
                                                <img className='arrow' src="https://www.pathstoliteracy.org/sites/pathstoliteracy.perkinsdev1.org/files/arrow_pointing_up_pixabay.png"/> 
                                                : 
                                                <img className='arrow down' src="https://www.pathstoliteracy.org/sites/pathstoliteracy.perkinsdev1.org/files/arrow_pointing_up_pixabay.png"/>) 
                                        : ''}
                                    </span>
                                </th>
                            ))}
                            
                        </tr>
                    ))}
                    
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    )
}