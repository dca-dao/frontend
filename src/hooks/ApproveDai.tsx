import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction } from '@usedapp/core'
import daiABI from "../chain-info/daiABI.json"

const daiAddress = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'

// Interacting with DAI through diamond contract

const daiInterface = new utils.Interface(daiABI)
const daiContract = new Contract(daiAddress, daiInterface) as any

//DAI contract functions

export const ApproveDaiComp = () => {

    //DAI contract functions
    const { state, send } = useContractFunction(daiContract, 'approve', { transactionName: 'Approve DAI' })

    const approveDai = (diamondAddress: string, amount: string) => {
        send(diamondAddress, amount)
    }

    return { state, send }
}

// export const ApproveDai = (diamondAddress: string, amount: string) => {
//     const { send } = useContractFunction(daiContract, 'approve', { transactionName: 'Approve DAI' })
//     send(diamondAddress, amount)
// }