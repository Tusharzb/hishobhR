import React, { useState, useEffect } from 'react'
import Table from '../Table/Table';
import { getTransactionSummary } from '../../Services/base';
import { CircleLoader } from '../Loader/Loader';
import PropTypes from 'prop-types';
import './summary.style.scss';


const Summary = (props) => {
    const [TransactionSummary, setTransactionSummary] = useState([])
    const [isLoading, setisLoading] = useState(true)

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


    const trackerId = props.trackerId;
    const reload = props.reload;

    useEffect(() => {
        loaddData(trackerId)
    }, [trackerId, reload])



    const loaddData = async (trackerId) => {
        try {
            setisLoading(true)
            const response = await getTransactionSummary(trackerId);
            const trackerSummary = (response.data || []);
            setTransactionSummary(trackerSummary);
            setisLoading(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {isLoading ?
                <CircleLoader /> :
                TransactionSummary.length > 0 ? (
                    <Table customClass="summaryTable" columns={trackerSummary} rows={TransactionSummary} />
                ) : (<div>No Data </div>)
            }
        </div>
    )
}

Summary.PropTypes = {
    trackerId: PropTypes.number,
    reload: PropTypes.func
}

export default Summary;
