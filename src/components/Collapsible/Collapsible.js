import React, { useEffect } from 'react'
import PropTypes from 'prop-types';

const Collapsible = (props) => {

    useEffect(() => {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});
    }, [])

    const renderData = () => {
        const { data } = props;
        return data.map((item, key) => (
            <li key={key} className="deposite">
                <div className={`collapsible-header ${item.label === 'Withdraw' ? 'red lighten-2' : 'green lighten-2'}`}>{item.label}</div>
                <div className="collapsible-body"><span>{item.content}</span></div>
            </li>
        ))
    }
    return (
        <div className={props.className}>
            <ul className="collapsible">
                {renderData()}
            </ul>
        </div>
    )
}

Collapsible.PropTypes = {
    data: PropTypes.array,
    className: PropTypes.string
}

export default Collapsible
