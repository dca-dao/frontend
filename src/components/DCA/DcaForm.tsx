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
// 0x3D234faB36905f4d75753564f3301f2119Cb9cCA

export const DcaForm = () => {

    // Contract addresses
    const daiAddress = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'
    const diamondAddress = "0xe76B1F8e12d6491639c798B58De0b49F9b3b6ce2"

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

    const fundDai = (amount: string) => {
        sendFundDai(amount)
    }

    // Withdraw DAI
    const { state: stateWithdrawDai, send: sendWithdrawDai } = useContractFunction(dcaManagerContract, 'withdrawDai', { transactionName: 'Withdraw DAI' })

    const withdrawDai = (amount: string,) => {
        sendWithdrawDai(amount)
    }

    // Withdraw WETH
    const { state: stateWithdrawWeth, send: sendWithdrawWeth } = useContractFunction(dcaManagerContract, 'withdrawWEth', { transactionName: 'Withdraw WETH' })

    const withdrawWeth = (amount: string) => {
        sendWithdrawWeth(amount)
    }

    // Set DCA Settings
    const { state: stateSetDcaSettings, send: sendSetDcaSettings } = useContractFunction(dcaManagerContract, 'setDcaSettings', { transactionName: 'Set DCA Settings' })

    const setDcaSettings = (amount: string, interval: string) => {
        sendSetDcaSettings(amount, interval)
    }

    // DCA amount funded
    const [amount, setAmount] = React.useState('');

    const amountHandleChange = (amountEvent: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(amountEvent.target.value as string);
    };

    let amountNb: number = parseFloat(amount) * 10 ** 18

    // DCA frequency in seconds
    const [frequency, setFrequency] = React.useState('');

    const frequencyHandleChange = (frequencyEvent: SelectChangeEvent) => {
        setFrequency(frequencyEvent.target.value as string);
    };

    // DCA amount to invest
    const [invest, setinvest] = React.useState('');

    const investHandleChange = (investEvent: React.ChangeEvent<HTMLInputElement>) => {
        setinvest(investEvent.target.value as string);
    };

    let investNb: number = parseFloat(invest) * 10 ** 18

    // WETH withdraw amount
    const [wethWd, setWethWd] = React.useState('');

    const wethWdHandleChange = (wethWdEvent: React.ChangeEvent<HTMLInputElement>) => {
        setWethWd(wethWdEvent.target.value as string);
    };

    let wethWdNb: number = parseFloat(wethWd) * 10 ** 18

    // DCA withdraw amount
    const [daiWd, setDaiWd] = React.useState('');

    const daiWdHandleChange = (daiWdEvent: React.ChangeEvent<HTMLInputElement>) => {
        setDaiWd(daiWdEvent.target.value as string);
    };

    let daiWdNb: number = parseFloat(daiWd) * 10 ** 18


    // Contract settings
    const dcaDaiBalance = useDcaDaiBalance(account)
    const dcaWEthBalance = useDcaWEthBalance(account)
    const dcaSettings = useDcaSettings(account)

    // Transaction status


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
                        <TextField id="dcaFund" label="Amount to fund in DAI" variant="outlined" margin='normal' type="number" fullWidth value={amount}
                            onChange={amountHandleChange} />
                        <div id="walletBalance">
                            {daiBalance && (
                                <div className="balance" id="fundMax">
                                    Wallet balance:
                                    <p className="bold">{formatEther(daiBalance)}</p>
                                </div>
                            )}
                        </div>
                        <div id="status">
                            <p>
                                Approval status: {stateApproveDai.status} <br />
                                Transaction status : {stateFundDai.status}
                            </p>
                        </div>
                        <Button onClick={() => approveDai(diamondAddress, "1000000000000000000000000")} color="primary" variant="contained" id="approve">
                            Approve DAI
                        </Button>
                        <Button onClick={() => fundDai(String(amountNb))} color="primary" variant="contained">
                            Fund with DAI
                        </Button>
                    </Paper>

                    <Paper elevation={3} id="dcaPaper">
                        <h2>Start your DCA</h2>
                        <div id="dcaInputs">
                            <TextField id="dcaInput" label="Amount to invest" variant="outlined" margin='normal' type="number" fullWidth value={invest}
                                onChange={investHandleChange} />

                            <FormControl id="dcaFrequency" margin='normal' fullWidth>
                                <InputLabel id="select-label">Frequency</InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="select"
                                    value={frequency}
                                    label="Frequency"
                                    onChange={frequencyHandleChange}
                                >
                                    <MenuItem value={86400}>Daily</MenuItem>
                                    <MenuItem value={302400}>Bi-weekly</MenuItem>
                                    <MenuItem value={604800}>Weekly</MenuItem>
                                    <MenuItem value={2592000}>Monthly</MenuItem>

                                </Select>
                            </FormControl>
                        </div>
                        <div id="dcaBalanceInfos">
                            {dcaDaiBalance && (
                                <div className="balance" id="daiBal">
                                    DCA DAI Balance :
                                    <p className="bold">{formatEther(dcaDaiBalance)}</p>
                                </div>
                            )}
                        </div>
                        <div id="status">
                            Transaction status : {stateSetDcaSettings.status}
                        </div>
                        <Button onClick={() => setDcaSettings(String(investNb), frequency)} color="primary" variant="contained">
                            Set DCA Settings
                        </Button>
                    </Paper>

                    <Paper elevation={3} id="ongoingPaper">
                        <h2>Ongoing DCA</h2>
                        <div id="dcaSettingsInfos">
                            {dcaSettings && (
                                <div className="balance">
                                    DCA Settings :
                                    <p className="bold">Amount : {formatEther(dcaSettings.amount)}</p>
                                    <p className="bold">Period  : {parseInt(dcaSettings.period._hex, 16) / 86400} day(s)</p>
                                </div>
                            )}
                        </div>
                    </Paper>
                    <Paper elevation={3} id="withdrawPaper">
                        <h2>Withdraw assets</h2>
                        <div id="dcaBalanceInfos">
                            <div id="dcaDaiBalance" >
                                <TextField id="dcaWithdrawDaiInput" label="Amount of DAI to withdraw" variant="outlined" margin='normal' type="number" value={daiWd}
                                    onChange={daiWdHandleChange} />
                                {dcaDaiBalance && (
                                    <div className="balance" id="daiBalw">
                                        DCA DAI Balance :
                                        <p className="bold">{formatEther(dcaDaiBalance)}</p>
                                    </div>
                                )}
                                <div id="status">
                                    Transaction status : {stateWithdrawDai.status}
                                </div>

                                <Button onClick={() => withdrawDai(String(daiWdNb))} color="primary" variant="contained">
                                    Withdraw DAI
                                </Button>
                            </div>
                            <div id="dcaWethBalance">
                                <TextField id="dcaWithdrawWethInput" label="Amount of WETH to withdraw" variant="outlined" margin='normal' type="number" value={wethWd}
                                    onChange={wethWdHandleChange} />
                                {dcaWEthBalance && (
                                    <div className="balance" id="wethBalw">
                                        DCA WETH Balance :
                                        <p className="bold">{formatEther(dcaWEthBalance)}</p>
                                    </div>
                                )}
                                <div id="status">
                                    Transaction status : {stateWithdrawWeth.status}
                                </div>

                                <Button onClick={() => withdrawWeth(String(wethWdNb))} color="primary" variant="contained">
                                    Withdraw WETH
                                </Button>
                            </div>
                        </div>
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