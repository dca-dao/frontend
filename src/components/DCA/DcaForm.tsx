import * as React from 'react';
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useEthers, Config, useContractFunction, useTokenBalance } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import daiABI from "../../chain-info/daiABI.json"
import testABI from "../../chain-info/testABI.json"
import dcaManagerABI from "../../chain-info/facets/dcaManager.json"
import { TextField, Paper } from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./style.css"
import DaiLogo from "../../dai.png"
import { Button, makeStyles } from "@material-ui/core"
import { useDcaDaiBalance, useDcaWEthBalance, useDcaSettings } from '../../hooks/ContractInteractions'

//test contract : 0xE627Fa9b65FBCaE3D872e73b83F70eAb82103B24
//kovan dai : 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa
// 0x4e551ab784a1acDDE29eb4A5C4c6275d8fA4D52D

export const DcaForm = () => {

    // Contract addresses
    const daiAddress = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'
    const diamondAddress = "0x4e551ab784a1acDDE29eb4A5C4c6275d8fA4D52D"
    const dcaManagerAddress = "0x7633f4dDa2be60982A85ae337079869681e0Ce85"

    // Use metamask connected account
    const { account } = useEthers()
    const isConnected = account !== undefined

    // Display DAI balance
    const daiBalance = useTokenBalance(daiAddress, account)

    const daiInterface = new utils.Interface(daiABI)
    const daiContract = new Contract(daiAddress, daiInterface) as any

    // Approve DAI
    const { state: stateApproveDai, send: sendApproveDai } = useContractFunction(daiContract, 'approve', { transactionName: 'Approve DAI' })

    const approveDai = (diamondAddress: string, amount: string) => {
        sendApproveDai(diamondAddress, amount)
    }

    const dcaManagerInterface = new utils.Interface(dcaManagerABI)
    const dcaManagerContract = new Contract(diamondAddress, dcaManagerInterface) as any

    // Fund
    const { state: stateFundDai, send: sendFundDai } = useContractFunction(dcaManagerContract, 'fundAccount', { transactionName: 'Fund account' })

    const fundDai = (amount: string, address: string) => {
        sendFundDai(amount, address)
    }

    // Withdraw
    const { state: stateWithdraw, send: sendWithdraw } = useContractFunction(dcaManagerContract, 'withdraw', { transactionName: 'Withdraw account' })

    const withdraw = (amount: string, address: string) => {
        sendWithdraw(amount, address)
    }

    // Set DCA Settings
    const { state: stateSetDcaSettings, send: sendSetDcaSettings } = useContractFunction(dcaManagerContract, 'setDcaSettings', { transactionName: 'Set DCA Settings' })

    const setDcaSettings = (amount: string, interval: string) => {
        sendSetDcaSettings(amount, interval)
    }


    // DCA frequency in seconds
    const [frequency, setFrequency] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setFrequency(event.target.value as string);
    };

    const dcaDaiBalance = useDcaDaiBalance(account)
    const dcaWEthBalance = useDcaWEthBalance(account)
    const dcaSettings = useDcaSettings(account)

    return (
        <div id="mainDiv">

            {!isConnected ? (
                <div id="dcaDiv">
                    <Paper id="notCoPaper">
                        <h2>Please connect to the kovan network through metamask</h2>
                    </Paper>
                </div>

            ) : (
                <div id="dcaDiv">
                    <Paper elevation={3} id="fundPaper">
                        <h2>Fund your account</h2>
                        <TextField id="dcaFund" label="Amount to fund" variant="outlined" margin='normal' type="number" fullWidth />
                        <div>
                            {daiBalance && (
                                <div className="balance">
                                    Maximum:
                                    <p className="bold">{formatEther(daiBalance)}</p>
                                </div>
                            )}
                        </div>
                        <Button onClick={() => approveDai(diamondAddress, "1000000000000000000000000")} color="primary" variant="contained">
                            Approve DAI
                        </Button>
                        <Button onClick={() => fundDai("", "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa")} color="primary" variant="contained">
                            Fund with DAI
                        </Button>

                        <Button onClick={() => setDcaSettings("1000", "86400")} color="primary" variant="contained">
                            Set DCA Settings
                        </Button>
                    </Paper>

                    <Paper elevation={3} id="dcaPaper">
                        <h2>Start your DCA</h2>
                        <div id="dcaInputs">
                            <TextField id="dcaInput" label="Amount to invest" variant="outlined" margin='normal' type="number" fullWidth />
                            <FormControl id="dcaFrequency" margin='normal' fullWidth>
                                <InputLabel id="select-label">Frequency</InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="select"
                                    value={frequency}
                                    label="Frequency"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={86400}>Daily</MenuItem>
                                    <MenuItem value={302400}>Bi-weekly</MenuItem>
                                    <MenuItem value={604800}>Weekly</MenuItem>
                                    <MenuItem value={2592000}>Monthly</MenuItem>

                                </Select>
                            </FormControl>
                        </div>
                        {dcaDaiBalance && (
                            <div className="balance">
                                DCA DAI Balance :
                                <p className="bold">{formatEther(dcaDaiBalance)}</p>
                            </div>
                        )}
                        {dcaWEthBalance && (
                            <div className="balance">
                                DCA WETH Balance :
                                <p className="bold">{formatEther(dcaWEthBalance)}</p>
                            </div>
                        )}
                        {dcaSettings && (
                            <div className="balance">
                                DCA Settings :
                                <p className="bold">Amount : {formatEther(dcaSettings.amount)}</p>
                                <p className="bold">Period  : {parseInt(dcaSettings.period._hex, 16)}</p>
                            </div>
                        )}
                        <Button color="primary" variant="contained">
                            Invest
                        </Button>
                    </Paper>

                    <Paper elevation={3} id="ongoingPaper">
                        <h2>Ongoing DCA</h2>
                        <p>Total value : </p>
                        <Button onClick={() => withdraw("1000000000000000000", "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa")} color="primary" variant="contained">
                            Withdraw
                        </Button>
                    </Paper>

                    <Paper elevation={3} id="stablePaper">
                        <h2>Supported stablecoins</h2>
                        <img id="dai" src={DaiLogo} alt="dai" />
                    </Paper>
                </div>
            )}

        </div>
    )
}