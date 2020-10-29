import React, { useEffect } from 'react'
import moment from 'moment';

const Table = (props) => {
    const { columns, rows } = props;

    useEffect(() => {
        console.log({ columns })
        console.log({rows})
    }, [columns])

    const formatDate = (value) => {
        return moment(value).format('MMMM Do YYYY');
    }

    return (

        <div className="row">
            <div className="col s12">
                <table className={`${props.responsive ? 'responsive-table  highlight' : 'table  highlight'}`}>
                    <thead>
                        <tr>
                            {(columns && columns.length > 0) ? (columns.map((item, key) => (
                                <th key={key}>{item.label}</th>
                            ))) : (<th ></th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {(rows && rows.length) > 0 ? (rows.map((item, key) => (
                            <tr key={key}>
                                {columns ? (columns.map((column, key) => (<td key={key}> {item[column.key] ?
                                    (column.type && column.type === "date") ? formatDate(item[column.key]) : item[column.key]
                                    : ""} </td>))) : ""}
                            </tr>
                        ))) : (<tr ></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Table