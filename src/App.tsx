import React from 'react'
import { ChainId, DAppProvider } from "@usedapp/core"
import { Metamask } from "./components/DCA/Metamask"
import { ResponsiveAppBar } from "./components/Landing/AppBar"
import { LandingCore } from './components/Landing/LandingCore'

function App() {
  return (

    // <DAppProvider config={{
    //   supportedChains: [ChainId.Kovan],
    //   notifications: {
    //     expirationPeriod: 1000,
    //     checkInterval: 1000
    //   }
    // }}>
    //   <Metamask />
    // </DAppProvider>
    //<ResponsiveAppBar />
    <LandingCore />
  )
}

export default App
