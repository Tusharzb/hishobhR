import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getTrackers, getTransactions } from '../../Services/base';
import moment from 'moment';
import Card from "../../Components/Card/Card";
import Analysis from '../../components/Analysis/Analysis';
import { TransactionColumnsHistory, TransactionColumns } from '../../Utils/Utils';
import Table from '../../Components/Table/Table';

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trackers: [],
            isLoading: true,
            title: '',
            description: '',
            transactions: []
        };
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const { filter } = this.props;
        if (Object.keys(filter).length > 0 && filter !== prevProps.filter) {
            this.loadFilterData();
        }
    }

    loadFilterData = async () => {
        const { filter } = this.props;
        try {
            const response = await getTransactions("", filter);
            const transactions = response.data || [];
            this.setState({ transactions });
        } catch (err) {
            console.log(err);
        }
    }

    loadData = async () => {
        this.setState({ isLoading: true });
        try {
            const userId = "5f12bf65af7273065c1a0700";
            const response = await getTrackers(userId, { isHistory: true });
            const trackers = response.data;
            if (trackers.length > 0) {
                this.setState({ trackers: trackers });
            }
            this.setState({ isLoading: false });
        } catch (err) {
            console.log(err);
        }
    };

    GoTo = (id) => {
        const { trackers } = this.state;
        const { location, history } = this.props;
        const selectedIndex = trackers.find(item => item._id === id);
        history.push({ pathname: `${location.pathname}/${id}`, state: { tracker: selectedIndex, isHistory: true } });
    }


    getDateOnly = (date) => {
        return moment(date).format("DD-MM-YYYY");
    }

    render() {
        const { isLoading, trackers, transactions } = this.state;
        return (
            <div className="history-wrapper">
                <section className="body-wrapper">
                    <Analysis />
                    {transactions.length > 0 ?
                        <Table showTotal responsive columns={TransactionColumnsHistory} rows={transactions} />
                    :<i>Data not found...</i>}
                    <h4>Locked Trackers</h4>
                    {
                        isLoading ? (
                            <div className="progress" >
                                <div className="indeterminate"></div>
                            </div>
                        ) : trackers && trackers.length > 0 ? (
                            <div className="row">
                                {trackers.map(item => (
                                    <div key={item._id} className="col s12 m4">
                                        <Card  createdOn={this.getDateOnly(item.createdOn)} title={item.name} id={item._id} content={item.description} action1={{ label: "Select", action: this.GoTo }} isHistory />
                                    </div>
                                ))}
                            </div>
                        ) : (
                                    <div>No History</div>
                                )
                    }
                </section>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}

export default connect(mapStateToProps, null)(History);
