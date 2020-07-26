import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home/Home';
import Tracker from './pages/Tracker';

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path="/trackers" >
                    <Tracker />
                </Route>
                <Route path="/" >
                    <Home />
                </Route>
            </Switch>
        </div>
    );
};

export default Routes;