import React, { useEffect, useState } from 'react';

import Table from '../../components/Table/Table';
import Collapsible from '../../components/Collapsible/Collapsible';
import Form from '../../components/Form/Form';

import { getTransactions, getTransactionSummary } from '../../services/base';

import './Transaction.style.scss';



const Transactions = (props) => {
    const [transactions, setTransactions] = useState([]);
    const [TransactionSummary, setTransactionSummary] = useState([])
    const [isLoading, setisLoading] = useState(true);
    const [columns, setcolumns] = useState([{
        label: "Reason",
        key: "reason"
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

    const [trackerSummary, settrackerSummary] = useState([{
        label: "Withdraw",
        key: "totalwithdraw"
    },
    {
        label: "Deposite",
        key: "totaldeposite"
    },
    {
        label: "Balance",
        key: "balance"
    }]);



    useEffect(() => {
        const id = props.match.params.id;
        loadData(id);
    }, [])

    const loadData = async (Trackerid) => {
        Promise.all([
            getTransactions(Trackerid),
            getTransactionSummary(Trackerid)
        ]).then(response => {
            console.log(response)
            const transactions = (response[0].data.data || []);
            const trackerSummary = (response[1].data.data || []);
            console.log(trackerSummary,transactions)
            setTransactions(transactions);
            setTransactionSummary(trackerSummary);
        });
        setisLoading(false);
    }

    const withdrawForm = (data)=>{
        console.log("withdraw",data);
    } 

    
    const depositeForm = (data)=>{
        console.log("deposite",data);
    } 


    return (
        <div>
            {
                isLoading ? (
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                ) : (
                        <div>
                            <section>
                                <h4>Transaction Summary</h4>
                                {
                                    TransactionSummary.length > 0 ? (
                                        <Table columns={trackerSummary} rows={TransactionSummary} />
                                        ) : (<div>No Data </div>)
                                    }
                            </section>
                           <Collapsible data={[{label:"Deposite",content: <Form submit={depositeForm} deposite /> },{label:"Withdraw",content:<Form submit={withdrawForm} /> }]} />
                            <section>
                                <h4>Transaction</h4>
                                {
                                    transactions.length > 0 ? (
                                        <Table columns={columns} rows={transactions} />
                                    ) : (<div>No Data </div>)
                                }
                            </section>
                        </div>
                    )}
        </div>
    )
}

export default Transactions
