import React,{useEffect} from 'react'
import PropTypes from 'prop-types';

import './Tabs.style.scss';

function Tabs(props) {
    useEffect(()=>{
        var instance = M.Tabs.init(document.getElementById('tab'), {});
    },[])

    const renderTabHeader = () =>{
        const { TabTitle, classArray } = props;
        return TabTitle.map(label=>(
                <li className={`tab col s3 ${classArray[label]}`}><a href={`#${label}`}>{label}</a></li>
            ))
    }

    const renderTabData = ()=>{
        const { TabTitle,TabData } = props;
        return TabTitle.map(label =>(
                <div id={label} className="col s12">{TabData[label]}</div>
        ))
    }

    return (
        <div>
            <div className="row">
                <div className="col s12">
                    <ul className="tabs" id="tab">
                        {renderTabHeader()}
                    </ul>
                </div>
                {renderTabData()}
            </div>
        </div>
    )
}

Tabs.PropTypes = {
    TabTitle: PropTypes.string,
    TabData: PropTypes.array
}

export default Tabs
