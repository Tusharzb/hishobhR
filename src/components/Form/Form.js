import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import PropTypes from 'prop-types';


import './Form.style.scss';
import { getCategories } from '../../services/base';

const Form = (props) => {
    const [Reason, setReason] = useState("");
    const [Category, setCategory] = useState('');
    const [Amount, setAmount] = useState("");
    const [Categories, setCategories] = useState([]);

    const loadData = async () => {
        const respsonse = await getCategories();
        const categories = respsonse.data ? respsonse.data : [];
        setCategories(categories)
    }
    let instances = "";
    useEffect(() => {
        instances = M.FormSelect.init(document.querySelectorAll('select'), {});
        loadData();
    }, [])

    const submit = () => {
        if (Reason && Category && Amount) {
            props.submit({ Reason, Category, Amount })
            setReason("")
            setCategory('')
            setAmount("")
        }
    }
    const optionGenerator = (array) => {
        return array.map(item => ({ value: item.name, label: item.name }))
    }

    const onCategorySelect = (option) => {
        setCategory(option.label);
    }

    return (
        <div>
            <div className="row">
                <div className="input-field col s12 m4">
                    <input value={Reason} placeholder="reason" type="text" className="validate" onChange={e => setReason(e.target.value)} />
                </div>
                <div className="input-field col s12 m3">
                    {Categories.length > 0 && < Select
                        className="single-select"
                        classNamePrefix="select"
                        onChange={onCategorySelect}
                        options={optionGenerator(Categories)}
                        placeholder="Select Category"
                    />}
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

Form.PropTypes = {
    submit: PropTypes.func,
    deposite: PropTypes.bool,
}


export default Form
