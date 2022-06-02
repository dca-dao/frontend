import React from 'react'
import { ChainId, DAppProvider } from "@usedapp/core"
import { Metamask } from "./components/Metamask"

function App() {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Kovan],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000
      }
    }}>
      <Metamask />
    </DAppProvider>
  )
}

export default App