import React, { useEffect } from 'react'

const Table = (props) => {
    const { columns, rows } = props;

    useEffect(() => {
        console.log(columns)
        console.log(rows)

    })

    return (
        <div className="row">
            <div className="col s12">
                <table className={`${props.responsive ? 'responsive-table  highlight' : 'table  highlight'}`}>
                    <thead>
                        <tr>
                            {
                                columns ? columns.map(item => (
                                    <th key={item._id}>{item.label}</th>
                                )) : (<th></th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {rows ? rows.map(item => (
                            <tr key={item._id}>
                                {columns ? (columns.map(column => (<td key={column._id}> {item[column.key]} </td>))) : ""}
                            </tr>
                        )) : (<tr></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Table