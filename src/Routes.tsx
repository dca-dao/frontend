import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Metamask } from './components/DCA/Metamask';
import { ResponsiveAppBar } from './components/Landing/AppBar';
import { LandingCore } from './components/Landing/LandingCore';


function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <ResponsiveAppBar />
                    <LandingCore />
                </Route>
                <Route exact path="/dca">
                    <Metamask />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;