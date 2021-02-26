import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Table from '../../Components/Table/Table';
import Collapsible from '../../Components/Collapsible/Collapsible';
import Form from '../../Components/Form/Form';
import Summary from '../../Components/TransactionSummary/Summary';
import { TransactionColumns, TransactionColumnsHistory } from '../../Utils/Utils';

import { getTransactions, saveTransactionSummary, removeTransaction, lockTracker, SummaryByCategory } from '../../Services/base';

import './Transaction.style.scss';
import Analysis from '../../components/Analysis/Analysis';
import PropTypes from 'prop-types';
import SummaryChart from '../../components/SummaryChart/SummaryChart';

const ActionRow = (props) => {
    return (
        <button onClick={() => props.deleteTransaction()} className="waves-effect waves-light btn red lighten-2">Delete</button>
    )
}

ActionRow.PropTypes = {
    deleteTransaction: PropTypes.func
}


const Transactions = (props) => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [summaryReload, setsummaryReload] = useState(false);
    const [SummaryCategory, setSummaryCategory] = useState([]);
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
        try {
            const response = await getTransactions(Trackerid, filter);
            const transactions = response.data || [];
            const response1 = await SummaryByCategory();
            const SummaryCategory = response1.data || [];
            transactions && transactions.forEach(element => {
                element.action = <ActionRow deleteTransaction={() => deleteTransaction(element._id)} />;
            })
            setSummaryCategory(SummaryCategory);
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

    const renderTransactionHistory = (isHistory, TransactionColumnsHistory, transactions, TransactionColumns) => {
        return (
            <section>
                <h6>Transaction History</h6>
                {
                    transactions.length > 0 ? (
                        <Table customClass="transactions" showTotal responsive columns={isHistory ? TransactionColumnsHistory : TransactionColumns} rows={transactions} />
                    ) : (<div>No Data </div>)
                }
            </section>
        )
    }

    const renderTransactions = (isHistory) => {
        return (
            !isHistory &&
            <section>
                <h6>Add Transaction </h6>
                <Collapsible data={[{ label: "Deposite", content: <Form submit={(data) => submitTransaction(data, "deposite")} deposite /> }, { label: "Withdraw", content: <Form submit={(data) => submitTransaction(data, "withdraw")} /> }]} />
            </section>
        )
    }

    const renderSummary = (TrackerId) => {
        return (
            <section>
                <div className="tracker-summary">
                    <h6>Summary</h6>
                </div>
                {
                    <Summary reload={false} trackerId={TrackerId} />
                }
            </section>
        )
    }


    const renderTrackerInfo = (tracker, lock) => {
        return (
            <section className="tracker-header">
                <div>
                    <h5>{tracker.name}</h5>
                    <p>{tracker.description}</p>
                </div>
                {!isHistory ?
                    <button className='footer waves-effect waves-light btn blue lighten-2' onClick={lock}>Lock</button> : <div></div>
                }
            </section>
        )
    }


    const renderProgressBar = () => {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        )
    }

    return (

        <div>
            {isLoading ? (
                renderProgressBar()
            ) : (
                    <div className="transaction-wrapper">
                        {renderTrackerInfo(tracker, lock)}
                        <SummaryChart chartData={SummaryCategory} />
                        {renderSummary(TrackerId)}
                        {renderTransactions(isHistory)}
                        <hr />
                        <Analysis />
                        {renderTransactionHistory(isHistory, TransactionColumnsHistory, transactions, TransactionColumns)}
                    </div>
                )
            }
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}

Transactions.PropTypes = {
    id: PropTypes.number,
    tracker: PropTypes.number,
    isHistory: PropTypes.number,
    filter: PropTypes.bool
}


export default connect(mapStateToProps)(Transactions);
