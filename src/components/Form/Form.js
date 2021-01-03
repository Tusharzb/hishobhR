import React, { useEffect, useState } from 'react'
import { categories } from '../../Utils/Utils';
import Select from 'react-select';


import './Form.style.scss';

const Form = (props) => {
    const [Reason, setReason] = useState("");
    const [Category, setCategory] = useState('');
    const [Amount, setAmount] = useState("");


    let instances = "";
    useEffect(() => {
        instances = M.FormSelect.init(document.querySelectorAll('select'), {});
    }, [])

    const submit = () => {
        console.log({ Reason, Category, Amount })
        if (Reason && Category && Amount) {
            props.submit({ Reason, Category, Amount })
            setReason("")
            setCategory('')
            // instances.destory();
            setAmount("")
        }
    }
    const optionGenerator = (array) => {
        return array.map(item => ({ value: item, label: item }))
    }

    const onCategorySelect=(option)=>{
        setCategory(option.label);
    }

    return (
        <div>
            <div className="row">
                <div className="input-field col s12 m4">
                    <input value={Reason} placeholder="reason" type="text" className="validate" onChange={e => setReason(e.target.value)} />
                </div>
                <div className="input-field col s12 m3">
                    <Select
                        className="single-select"
                        classNamePrefix="select"
                        onChange={onCategorySelect}
                        options={optionGenerator(categories)}
                        placeholder="Select Category"
                    />
                </div>
                <div className="input-field col s12 m3">
                    <input value={Amount} placeholder="amount" type="Number" className="validate" onChange={e => setAmount(e.target.value)} />
                </div>
                <div className="col s12 m2">
                    <button className={`footer waves-effect waves-light btn ${props.deposite ? 'green lighten-2' : 'red lighten-2'}`} onClick={submit}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default Form
