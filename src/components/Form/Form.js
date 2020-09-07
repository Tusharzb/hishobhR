import React,{useEffect,useState} from 'react'
import {categories} from '../../Utils/Utils';

import './Form.style.scss';

const Form = (props) => {
    const [Reason, setReason] = useState("");
    const [Category, setCategory] = useState('');
    const [Amount, setAmount] = useState("");

    
    let instances ="";
    useEffect(()=>{
        instances = M.FormSelect.init(document.querySelectorAll('select'), {});
    },[])

    const submit = () =>{
        console.log({Reason,Category,Amount})
        if(Reason && Category && Amount){
            props.submit({Reason,Category,Amount})
            setReason("")
            setCategory('')
            // instances.destory();
            setAmount("")
        }
    }

    return (
        <div>
            <div className="row">
                <div className="input-field col s12 m4">
                    <input value={Reason} placeholder="reason" type="text" className="validate" onChange={e=>setReason(e.target.value)}/>
                </div>
                <div className="input-field col s12 m3">
                    <select value={Category} placeholder="Select" onChange={e=>setCategory(e.target.value)}>
                    <option value=""  >Select Category</option>
                    {categories.map((item,key) =>{
                        return <option key={key} value={item} >{item}</option>
                    })}
                    </select>
                    <label>Category Select</label>
                </div>
                <div className="input-field col s12 m3">
                    <input value={Amount} placeholder="amount" type="number" className="validate" onChange={e=>setAmount(e.target.value)}/>
                </div>
                <div className="col s12 m2">
                    <button className={`footer waves-effect waves-light btn ${props.deposite ? 'green lighten-2' : 'red lighten-2'}`} onClick={submit}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default Form
