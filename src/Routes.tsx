import React from 'react';
import { ChainId, DAppProvider } from "@usedapp/core"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Metamask } from './components/DCA/Metamask';
import { ResponsiveAppBar } from './components/Landing/AppBar';
import { LandingCore } from './components/Landing/LandingCore';
import { NotFound } from './components/404/NotFound';
import { DcaForm } from './components/DCA/DcaForm';


function Routes() {
    return (
        <DAppProvider config={{
            supportedChains: [ChainId.Kovan],
            notifications: {
                expirationPeriod: 1000,
                checkInterval: 1000
            }
        }}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <ResponsiveAppBar />
                        <LandingCore />
                    </Route>
                    <Route exact path="/dca">
                        <Metamask />
                        <DcaForm />
                    </Route>
                    <Route>
                        <ResponsiveAppBar />
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </DAppProvider>

    )
}

export default Routes;