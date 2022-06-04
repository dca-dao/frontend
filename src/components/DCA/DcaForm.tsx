import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useTokenBalance, useEthers, Config, useContractFunction } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import daiABI from "../../chain-info/daiABI.json"
import testABI from "../../chain-info/testABI.json"

//test contract : 0xE627Fa9b65FBCaE3D872e73b83F70eAb82103B24
//kovan dai : 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa

export const DcaForm = () => {

    const daiAddress = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'
    const testAddress = '0xE627Fa9b65FBCaE3D872e73b83F70eAb82103B24'

    const { account } = useEthers()

    const daiBalance = useTokenBalance(daiAddress, account)
    const contractInterface = new utils.Interface(testABI)
    const contract = new Contract(testAddress, contractInterface) as any

    const { state, send } = useContractFunction(contract, 'fund', { transactionName: 'Fund DCA' })
    const { status } = state

    const sendDAI = () => {
        void send({ value: 100000000000000 })
    }

    return (
        <div>
            {daiBalance && (
                <div className="balance">
                    Dai balance:
                    <p className="bold">{formatEther(daiBalance)}</p>
                </div>
            )}
            <div>
                <button onClick={() => sendDAI()}>Invest</button>
                <p>Status: {status}</p>
            </div>
        </div>
    )
}

