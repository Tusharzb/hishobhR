import React, { useEffect } from 'react'
import moment from 'moment';
import './Table.style.scss';
const DEFAULT_CLASSNAME = "trasaction-table"

const Table = (props) => {
    const { columns, rows, showTotal } = props;

    const formatDate = (value) => {
        return moment(value).format('MMMM Do YYYY');
    }

    const findTotal = (data, key) => {
        return data.reduce((a, b) => a += b[key], 0)
    }

    return (

        <div className={`row ${DEFAULT_CLASSNAME}`}>
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
                        {showTotal && (rows && rows.length) > 0 &&
                            <tr>
                                <td>Total</td>
                                <td></td>
                                <td><h6 className={`${DEFAULT_CLASSNAME}-withdraw`}>{findTotal(rows, "withdraw")}</h6></td>
                                <td><h6 className={`${DEFAULT_CLASSNAME}-deposite`}>{findTotal(rows, "deposite")}</h6></td>
                                <td></td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Table