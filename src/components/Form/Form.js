import React,{useEffect,useState} from 'react'

import './Form.style.scss';

const Form = (props) => {
    const [Reason, setReason] = useState();
    const [Category, setCategory] = useState();
    const [Amount, setAmount] = useState();

    const categories = [
        "Personal",
        "Movies",
        "Gym",
        "Donation",
        "Salary",
        "Electronics",
        "Games",
        "Food",
        "Travel",
    ]
    

    useEffect(()=>{
            var instances = M.FormSelect.init(document.querySelectorAll('select'), {});
    },[])

    const submit = () =>{
        if(Reason && Category && Amount){
            props.submit({Reason,Category,Amount})
        }
    }

    return (
        <div>
            <div className="row">
                <div className="input-field col s12 m4">
                    <input id="first_name" type="text" className="validate" onChange={e=>setReason(e.target.value)}/>
                    <label for="first_name">First Name</label>
                </div>
                <div class="input-field col s12 m3">
                    <select placeholder="Select" onChange={e=>setCategory(e.target.value)}>
                    {categories.map((item,key) =>{
                        return <option key={key} value={item}>{item}</option>
                    })}
                    </select>
                    <label>Materialize Select</label>
                </div>
                <div className="input-field col s12 m3">
                    <input id="first_name" type="text" className="validate" onChange={e=>setAmount(e.target.value)}/>
                    <label for="first_name">Amount</label>
                </div>
                <div className="col s12 m2">
                    <button class={`footer waves-effect waves-light btn ${props.deposite ? 'green lighten-3' : 'red lighten-3'}`} onClick={submit}>button</button>
                </div>
            </div>
        </div>
    )
}

export default Form
