import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useTokenBalance, useEthers, Config } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

//test contract : 0xE627Fa9b65FBCaE3D872e73b83F70eAb82103B24
//kovan dai : 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa

export const DcaForm = () => {

    const DAI = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'

    const { account } = useEthers()
    const daiBalance = useTokenBalance(DAI, account)

    return (
        <div>
            {daiBalance && (
                <div className="balance">
                    Dai balance:
                    <p className="bold">{formatEther(daiBalance)}</p>
                </div>
            )}
        </div>
    )
}

