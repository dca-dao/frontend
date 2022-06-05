import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction } from '@usedapp/core'
import daiABI from "../chain-info/daiABI.json"
import dcaManagerABI from "../chain-info/facets/dcaManager.json"

//test contract : 0xE627Fa9b65FBCaE3D872e73b83F70eAb82103B24
//kovan dai : 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa

const daiAddress = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'
const diamondAddress = '0x4e551ab784a1acDDE29eb4A5C4c6275d8fA4D52D'

// Interacting with DAI through diamond contract

const daiInterface = new utils.Interface(daiABI)
const daiContract = new Contract(daiAddress, daiInterface) as any

export function ApproveDai() {
    const { state, send } = useContractFunction(daiContract, 'approve', { transactionName: 'Approve DAI' })

    return { state, send }
}

export function SendDai() {
    const { state, send } = useContractFunction(daiContract, 'transfer', { transactionName: 'Send DAI' })

    return { state, send }
}

const dcaManagerInterface = new utils.Interface(dcaManagerABI)
const dcaManagerContract = new Contract(diamondAddress, dcaManagerInterface) as any









