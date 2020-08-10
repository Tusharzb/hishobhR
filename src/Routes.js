import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// const Home = lazy(() => import('./pages/Home/Home'));
// const Transactions = lazy(() => import('./pages/Transactions/Transactions'));
import Home from './pages/Home/Home';
import Transactions from './pages/Transactions/Transactions';

const Routes = (props) => {
    return (
        <div>
            <Switch>
                <Route path="/trackers/:id" component={Transactions} />
                <Route exact path="/trackers" component={Home} />
                <Redirect exact from='/' to='/trackers' />
            </Switch>
        </div>
    );
};

export default Routes;