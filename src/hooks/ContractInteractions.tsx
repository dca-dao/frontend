import { BigNumber, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { QueryParams, useContractFunction, ERC20Interface } from '@usedapp/core'
import daiABI from "../chain-info/daiABI.json"
import dcaManagerABI from "../chain-info/facets/dcaManager.json"
import { Falsy } from '@usedapp/core/dist/esm/src/model/types'
import { useCall } from "@usedapp/core"

//test contract : 0xE627Fa9b65FBCaE3D872e73b83F70eAb82103B24
//kovan dai : 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa

const daiAddress = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'
const diamondAddress = '0x3D234faB36905f4d75753564f3301f2119Cb9cCA'

// Interacting with DAI through diamond contract

const daiInterface = new utils.Interface(daiABI)
const daiContract = new Contract(daiAddress, daiInterface) as any

const dcaManagerInterface = new utils.Interface(dcaManagerABI)
const dcaManagerContract = new Contract(diamondAddress, dcaManagerInterface) as any

export function useDcaDaiBalance(
    address: string | Falsy,
    queryParams: QueryParams = {}
): BigNumber | undefined {
    const { value: tokenBalance } =
        useCall(
            address &&
            {
                contract: new Contract(diamondAddress, dcaManagerInterface) as any, // instance of called contract
                method: "getDaiUserBalance", // Method to be called
                args: [address], // Method arguments - address to be checked for balance
            },
            queryParams
        ) ?? {}

    return tokenBalance?.[0]
}

export function useDcaWEthBalance(
    address: string | Falsy,
    queryParams: QueryParams = {}
): BigNumber | undefined {
    const { value: tokenBalance } =
        useCall(
            address &&
            {
                contract: new Contract(diamondAddress, dcaManagerInterface) as any, // instance of called contract
                method: "getWEthBalance", // Method to be called
                args: [address], // Method arguments - address to be checked for balance
            },
            queryParams
        ) ?? {}

    return tokenBalance?.[0]
}

export function useDcaSettings(
    address: string | Falsy,
    queryParams: QueryParams = {}
): { amount: BigNumber, period: BigNumber, lastDcaTimestamp: BigNumber } | undefined {
    const { value: tokenBalance } =
        useCall(
            address &&
            {
                contract: new Contract(diamondAddress, dcaManagerInterface) as any, // instance of called contract
                method: "getUserDcaSettings", // Method to be called
                args: [address], // Method arguments - address to be checked for balance
            },
            queryParams
        ) ?? {}

    return tokenBalance?.[0]
}













