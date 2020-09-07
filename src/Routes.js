import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// const Home = lazy(() => import('./pages/Home/Home'));
// const Transactions = lazy(() => import('./pages/Transactions/Transactions'));
import Home from './pages/Home/Home';
import Transactions from './pages/Transactions/Transactions';
import History from './pages/History/History';

const Routes = (props) => {
    return (
        <div>
            <Switch>
                <Route path="/trackers/:id" component={Transactions} />
                <Route exact path="/trackers" component={Home} />
                <Route exact path="/history/:id" component={Transactions} />
                <Route exact path="/history" component={History} />
                <Redirect exact from='/' to='/trackers' />
            </Switch>
        </div>
    );
};

export default Routes;