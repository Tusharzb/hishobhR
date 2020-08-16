import React, { useEffect, useState } from 'react';

import Table from '../../Components/Table/Table';
import Collapsible from '../../Components/Collapsible/Collapsible';
import Form from '../../Components/Form/Form';
import Summary from '../../Components/TransactionSummary/Summary';

import { getTransactions, saveTransactionSummary, removeTransaction, lockTracker } from '../../Services/base';

import './Transaction.style.scss';


const ActionRow = (props) => {
    return (
        <button onClick={() => props.deleteTransaction()} className="waves-effect waves-light btn red lighten-2">Delete</button>
    )
}


const Transactions = (props) => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [summaryReload, setsummaryReload] = useState(false);
    const [columns, setcolumns] = useState([{
        label: "Reason",
        key: "reason"
    },
    {
        label: 'Category',
        key: 'category'
    },
    {
        label: "Withdraw",
        key: "withdraw"
    },
    {
        label: "Deposite",
        key: "deposite"
    },
    {
        label: "Action",
        key: "action"
    }]);


    const [TrackerId, setTrackerId] = useState("");

    const id = props.match.params.id;

    useEffect(() => {
        setTrackerId(id)
        loadData(id);
    }, [])

    const deleteTransaction = async (transactionId) => {
        try {
            const transaction = await removeTransaction(transactionId);
            if (transaction) {
                console.log(transactionId);
                console.log(transaction);
                loadData(TrackerId)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const loadData = async (Trackerid) => {
        setisLoading(true);
        try {
            const response = await getTransactions(Trackerid);
            console.log(response)
            const transactions = (response.data.data || []);
            transactions.forEach(element => {
                element.action = <ActionRow deleteTransaction={() => deleteTransaction(element._id)} />;
            })
            setTransactions(transactions);
            setisLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const submitTransaction = async (data, type) => {
        const payload = {
            reason: data.Reason,
            category: data.Category
        }
        if (type === "withdraw") {
            payload.withdraw = data.Amount;
            payload.deposite = "0";
            console.log("withdraw", payload);
        } else {
            payload.deposite = data.Amount;
            payload.withdraw = "0";
            console.log("deposite", payload);
        }
        try {
            console.log(TrackerId)
            const transaction = await saveTransactionSummary(TrackerId, payload);
            if (transaction) {
                loadData(TrackerId);
                setsummaryReload(!summaryReload);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const lock = async () => {
        try {
            const response = await lockTracker({TrackerId});
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            {
                isLoading ? (
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                ) : (
                        <div className="transaction-wrapper">
                            <section>
                                <div className="tracker-header">
                                    <h4>Transaction Summary</h4>
                                    <button className='footer waves-effect waves-light btn blue lighten-2' onClick={lock}>Lock</button>
                                </div>
                                {
                                    <Summary reload={false} trackerId={TrackerId} />
                                }
                            </section>
                            <section>

                                <Collapsible data={[{ label: "Deposite", content: <Form submit={(data) => submitTransaction(data, "deposite")} deposite /> }, { label: "Withdraw", content: <Form submit={(data) => submitTransaction(data, "withdraw")} /> }]} />
                            </section>
                            <hr />
                            <section>
                                <h4>Transaction</h4>
                                {
                                    transactions.length > 0 ? (
                                        <Table responsive columns={columns} rows={transactions} />
                                    ) : (<div>No Data </div>)
                                }
                            </section>
                        </div>
                    )}
        </div>
    )
}

export default Transactions
