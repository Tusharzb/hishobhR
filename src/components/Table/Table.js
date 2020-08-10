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
                                columns ? columns.map((item,key) => (
                                    <th key={key}>{item.label}</th>
                                )) : (<th key={item._id}></th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {rows ? rows.map((item,key) => (
                            <tr key={key}>
                                {columns ? (columns.map((column,key) => (<td key={key}> {item[column.key] ? item[column.key] : ""} </td>))) : ""}
                            </tr>
                        )) : (<tr key={key}></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Table