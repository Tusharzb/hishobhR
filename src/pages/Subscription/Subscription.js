import React, { Component } from 'react'
import { ReduxFields } from '../../components/ReduxFields/ReduxFields';
import { LocalForm } from 'react-redux-form';
import './subscription.style.scss';
import { createSubscription } from '../../Services/base';


export default class Subscription extends Component {


    constructor(props) {
        super(props)
        this.state = {
            fields: [
                {
                    label: "name",
                    name: "name",
                    type: "text",
                    required: true,
                },
                {
                    label: "Repeat date",
                    name: "repeatDate",
                    type: "select",
                    options: [...Array(30).keys()].map(item => ({ "value": item, "label": item })),
                    required: true,
                },
                {
                    label: "amount",
                    name: "amount",
                    type: "number",
                    required: true,
                },
            ]
        }
    }
    
    handleSubmit = async(values) => { 
        try{
           const repsonse =  await createSubscription(values);
            console.log(repsonse);
        }catch(err){
            console.log(err)
        } 
    }


    render() {
        return (
            <div>
                <h5>Subscriptions</h5>
                <LocalForm
                    onSubmit={(values) => this.handleSubmit(values)}
                >
                    <div className="row">
                        {this.state.fields.map((field, index) => (
                            <div className="col s4">
                                <ReduxFields field={field} id={field.name} />
                            </div>
                        ))}
                    </div>

                    <div className="footer">
                        <button className="footer waves-effect waves-light btn blue lighten-2" type="submit">Save</button>
                    </div>
                </LocalForm>
            </div>
        )
    }
}
