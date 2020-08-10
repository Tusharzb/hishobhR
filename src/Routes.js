import React, { lazy } from 'react';
import { Route, Switch , Redirect} from 'react-router-dom';

const Home = import(lazy('./pages/Home/Home'));
const Transactions = import(lazy('./pages/Transactions/Transactions'));

const Routes = (props) => {
    return (
        <div>
            <Switch>
                <Route path="/trackers/:id"  component={Transactions}/>
                <Route exact path="/trackers"  component={Home} />
                <Redirect exact from='/' to='/trackers'/>
            </Switch>
        </div>
    );
};

export default Routes;