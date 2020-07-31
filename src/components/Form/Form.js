import React,{useEffect,useState} from 'react'


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
            <div className="row valign-wrapper">
                <div className="input-field col s4">
                    <input id="first_name" type="text" className="validate" onChange={e=>setReason(e.target.value)}/>
                    <label for="first_name">First Name</label>
                </div>
                <div class="input-field col s3">
                    <select placeholder="Select" onChange={e=>setCategory(e.target.value)}>
                    {categories.map((item,key) =>{
                        return <option key={key} value={item}>{item}</option>
                    })}
                    </select>
                    <label>Materialize Select</label>
                </div>
                <div className="input-field col s3">
                    <input id="first_name" type="text" className="validate" onChange={e=>setAmount(e.target.value)}/>
                    <label for="first_name">Amount</label>
                </div>
                <div className="col s2 ">
                <button class={`waves-effect waves-light btn ${props.deposite ? 'green lighten-3' : 'red lighten-3'}`} onClick={submit}>button</button>
                </div>
            </div>
        </div>
    )
}

export default Form
