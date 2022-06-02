import React from 'react';
import { ChainId, DAppProvider } from "@usedapp/core"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Metamask } from './components/DCA/Metamask';
import { ResponsiveAppBar } from './components/Landing/AppBar';
import { LandingCore } from './components/Landing/LandingCore';
import { NotFound } from './components/404/NotFound';


function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <ResponsiveAppBar />
                    <LandingCore />
                </Route>
                <Route exact path="/dca">
                    <DAppProvider config={{
                        supportedChains: [ChainId.Kovan],
                        notifications: {
                            expirationPeriod: 1000,
                            checkInterval: 1000
                        }
                    }}>
                        <Metamask />
                    </DAppProvider>
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;