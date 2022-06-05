import * as React from 'react';
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useTokenBalance, useEthers, Config, useContractFunction } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import daiABI from "../../chain-info/daiABI.json"
import testABI from "../../chain-info/testABI.json"
import dcaManagerABI from "../../chain-info/facets/dcaManager.json"
import { ApproveDai, SendDai } from '../../hooks/ContractInteractions'
import { TextField, Paper } from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./style.css"
import DaiLogo from "../../dai.png"
import { Button, makeStyles } from "@material-ui/core"


//test contract : 0xE627Fa9b65FBCaE3D872e73b83F70eAb82103B24
//kovan dai : 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa

export const DcaForm = () => {

    // Contract addresses
    const daiAddress = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'
    const testAddress = '0xE627Fa9b65FBCaE3D872e73b83F70eAb82103B24'
    const diamondAddress = "0x4e551ab784a1acDDE29eb4A5C4c6275d8fA4D52D"

    // Use metamask connected account
    const { account } = useEthers()
    const isConnected = account !== undefined

    // Display DAI balance
    const daiBalance = useTokenBalance(daiAddress, account)

    // //DAI contract functions


    // const approveDai = (diamondAddress: string, amount: string) => {
    //     send(diamondAddress, amount)
    // }

    // const sendDAI = (amount: string, tokenAddress: string) => {
    //     void send(amount, tokenAddress)
    // }
    // const approve = (diamonAddress: string, amount: string) => {
    //     ApproveDai(diamondAddress, amount)
    // }

    const [frequency, setFrequency] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setFrequency(event.target.value as string);
    };

    return (
        // <div>
        //     {daiBalance && (
        //         <div className="balance">
        //             Dai balance:
        //             <p className="bold">{formatEther(daiBalance)}</p>
        //         </div>
        //     )}
        //     <div>
        //         <button onClick={() => approveDai(diamondAddress, "1000000000000000000000000")}>Invest</button>
        //         <p>Status: {status}</p>
        //     </div>
        // </div>

        <div id="mainDiv">

            {!isConnected ? (
                <div id="dcaDiv">
                    <Paper id="notCoPaper">
                        <h2>Please connect to the kovan network through metamask</h2>
                    </Paper>
                </div>

            ) : (
                <div id="dcaDiv">
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
                        <div>
                            {daiBalance && (
                                <div className="balance">
                                    Maximum:
                                    <p className="bold">{formatEther(daiBalance)}</p>
                                </div>
                            )}
                        </div>
                        <Button color="primary" variant="contained">
                            Invest
                        </Button>
                    </Paper>

                    <Paper elevation={3} id="ongoingPaper">
                        <h2>Ongoing DCA</h2>
                        <p>Total value : </p>
                        <Button color="primary" variant="contained">
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