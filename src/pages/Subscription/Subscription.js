import React, { Component } from 'react';
import moment from 'moment';
import { ReduxFields } from '../../components/ReduxFields/ReduxFields';
import { LocalForm } from 'react-redux-form';
import './subscription.style.scss';
import { createSubscription, getSubscription, deleteSubscription } from '../../Services/base';
import { SubscriptionColumns } from '../../Utils/Utils';
import Table from '../../Components/Table/Table';
import { CircleLoader } from '../../Components/Loader/Loader';

const ActionRow = (props) => {
    return (
        <button onClick={(e) => props.deleteTransaction(e)} className="waves-effect waves-light btn red lighten-2">Delete</button>
    )
}


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
            ],
            subscription: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.LoadSubscription();
    }

    LoadSubscription = async () => {
        try {
            const sub = await getSubscription();
            console.log({ sub });
            const formatSub = sub.data.map(item => ({
                ...item, repeatDate: this.getDate(item.repeatDate), amount: `${item.amount}/-`,
                action: <ActionRow deleteTransaction={() => this.deleteTransaction(e,item._id)} />
            }));
            this.setState({ subscription: formatSub, isLoading: false });
        } catch (err) {
            console.log(err);
        }
    }

    deleteTransaction = async (transactionId) => {
        try {
            const transaction = await deleteSubscription(transactionId);
            if (transaction) {
                await loadData(id)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // get the appropriate repeate date of subscription
    getDate = (date) => {
        const repeatDate = moment().date(date);
        const current = moment();
        if (repeatDate.isAfter(current)) {
            return repeatDate.format('LL');
        } else {
            return repeatDate.add(1, 'M').format('LL');
        }
    }

    handleSubmit = async (value) => {
        console.log({value});
        try {
            const repsonse = await createSubscription(values);
            console.log(repsonse);
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        const { isLoading, subscription } = this.state;
        return (
            <div>
                <h5>Subscriptions</h5>
                <LocalForm
                    onSubmit={() => this.handleSubmit()}
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
                    <div>
                        <h6>Active Subscription</h6>
                        {!isLoading ?
                            <Table responsive columns={SubscriptionColumns} rows={subscription} />
                            : <CircleLoader />
                        }
                    </div>
                </LocalForm>
            </div>
        )
    }
}
