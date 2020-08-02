import React,{useState,useEffect } from 'react'
import Table from '../Table/Table';
import { getTransactionSummary } from '../../services/base';
import { CircleLoader } from '../Loader/Loader';



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
    }, [trackerId,reload])

    

    const loaddData = async (trackerId) => {
        try {
            setisLoading(true)
            const response = await getTransactionSummary(trackerId);
            const trackerSummary = (response.data.data || []);
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
                    <CircleLoader/> : 
                TransactionSummary.length > 0 ? (
                    <Table columns={trackerSummary} rows={TransactionSummary} />
                ) : (<div>No Data </div>)
            }
        </div>
    )
}

export default Summary;
