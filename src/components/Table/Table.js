import React, { useEffect } from 'react'

const Table = (props) => {
    const { columns, rows } = props;

    useEffect(() => {
        console.log(columns)
        console.log(rows)

    })

    return (
        <div>

            <table className="responsive-table highlight">
                <thead>
                    <tr>
                        {
                            columns ? columns.map(item => (
                                <th key={item._id} className="heading"><h6>{item.label}</h6></th>
                            )) : (<th></th>)
                        }
                    </tr>
                </thead>

                <tbody>
                    {rows ? rows.map(item => (
                        <tr key={item._id}>
                            {columns ? (columns.map(column => (<td key={column._id}> {item[column.key]} </td>) )) : ""}
                        </tr>
                    )) : (<tr></tr>)}
                </tbody>
            </table>
        </div>
    )
}


export default Table