import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Table from '../../Components/Table/Table';
import Collapsible from '../../Components/Collapsible/Collapsible';
import Form from '../../Components/Form/Form';
import Summary from '../../Components/TransactionSummary/Summary';
import { TransactionColumns, TransactionColumnsHistory } from '../../Utils/Utils';

import { getTransactions, saveTransactionSummary, removeTransaction, lockTracker } from '../../Services/base';

import './Transaction.style.scss';
import Analysis from '../../components/Analysis/Analysis';


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
        label: "Created",
        key: "createdOn",
        type: "date"
    },
    {
        label: "Action",
        key: "action"
    }]);


    const [TrackerId, setTrackerId] = useState("");

    const id = props.match.params.id;
    const { tracker, isHistory } = props.location.state;
    const { filter } = props;
    useEffect(() => {
        setTrackerId(id)
        loadData(id);
        return () => {
            localStorage.clear('activeTracker');
        }
    }, [filter])

    const deleteTransaction = async (transactionId) => {
        try {
            const transaction = await removeTransaction(transactionId);
            if (transaction) {
                await loadData(id)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const loadData = async (Trackerid) => {
        // setisLoading(true);
        try {
            const response = await getTransactions(Trackerid, filter);
            const transactions = response.data || [];
            console.log(response.data)
            transactions && transactions.forEach(element => {
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
        } else {
            payload.deposite = data.Amount;
            payload.withdraw = "0";
        }
        try {
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
            const response = await lockTracker({ TrackerId });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            {isLoading ? (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            ) : (
                    <div className="transaction-wrapper">
                        <section className="tracker-header">
                            <div>
                                <h5>{tracker.name}</h5>
                                <p>{tracker.description}</p>
                            </div>
                            {!isHistory ?
                                <button className='footer waves-effect waves-light btn blue lighten-2' onClick={lock}>Lock</button> : <div></div>
                            }
                        </section>
                        <section>
                            <div className="tracker-summary">
                                <h6>Summary</h6>
                            </div>
                            {
                                <Summary reload={false} trackerId={TrackerId} />
                            }
                        </section>
                        {!isHistory &&
                            <section>
                                <h6>Add Transaction </h6>
                                <Collapsible data={[{ label: "Deposite", content: <Form submit={(data) => submitTransaction(data, "deposite")} deposite /> }, { label: "Withdraw", content: <Form submit={(data) => submitTransaction(data, "withdraw")} /> }]} />
                            </section>
                        }
                        <hr />
                        <Analysis />
                        <section>
                            <h6>Transaction History</h6>
                            {
                                transactions.length > 0 ? (
                                    <Table responsive columns={isHistory ? TransactionColumnsHistory : TransactionColumns} rows={transactions} />
                                ) : (<div>No Data </div>)
                            }
                        </section>
                    </div>
                )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}

export default connect(mapStateToProps)(Transactions);
