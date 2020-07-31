import React,{useEffect} from 'react'

const Collapsible = (props) => {

    useEffect(()=>{
            var elems = document.querySelectorAll('.collapsible');
            var instances = M.Collapsible.init(elems, {});
    },[])

   const renderData = () =>{
        const { data } = props;
        return data.map(item=>(
                <li className="deposite">
                <div className={`collapsible-header ${item.label === 'Withdraw' ? 'red lighten-3': 'green lighten-3'}`}>{item.label}</div>
                <div className="collapsible-body"><span>{item.content}</span></div>
                </li>
            ))
    }
    return (
        <div>
            <ul className="collapsible">
            {renderData()}
        </ul>
        </div>
    )
}

export default Collapsible
