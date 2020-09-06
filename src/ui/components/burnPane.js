import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../context'
import Web3 from "web3"

import { SPARTA_ADDR, SPARTA_ABI, ROUTER_ADDR, ROUTER_ABI, getExplorerURL, getAccount, getSpartaContract } from '../../client/web3.js'
import { convertFromWei, currency } from '../../common/utils'

import { Row, Col, Input, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { LabelGrey, Sublabel, Colour, Text } from '../components'
import { Button } from './elements'
import { nodeAPI } from "../../client/web3";

export const BurnPane = () => {

    const context = useContext(Context)
    const [account, setAccount] = useState(
        { address: '', spartaBalance: '', ethBalance: '', uniBalance: '', uniSupply: '' })
    const [connected, setConnected] = useState(false)

    const [loaded, setLoaded] = useState(null)
    const [burnEthFlag, setBurnEthFlag] = useState(null)
    const [ethTx, setEthTx] = useState(null)
    const [currentBurn, setCurrentBurn] = useState(0)

    const notSpendAmount = 0
    const spendable = (account.ethBalance - notSpendAmount).toPrecision(4) < 0 ?
        0 : (account.ethBalance - notSpendAmount).toPrecision(4)

    const [amount, setAmount] = useState({ toSpend: 0 })

    useEffect(() => {
        connect()
    })

    useEffect(() => {
        loadBurnData()
        // eslint-disable-next-line
    }, [])

    const connect = async () => {
        const account = await getAccount()
        if (account) {
            const contract = await getSpartaContract()
            context.accountData ? getAccountData() : loadAccountData(contract, account)
            setConnected(true)
        }
    }

    const loadBurnData = async () => {
        // const contract = await getSpartaContract()
        // const day = await contract.methods.currentDay().call()
        // const era = 1
        // const currentBurn = convertFromWei(await contract.methods.mapEraDay_UnitsRemaining(era, day).call())
        // setCurrentBurn(currentBurn)
    }

    const getAccountData = async () => {
        setAccount(context.accountData)
    }

    const loadAccountData = async (contract_, address) => {
        // const ethBalance = convertFromWei(await window.web3.eth.getBalance(address))
        // const spartaBalance = convertFromWei(await contract_.methods.balanceOf(address).call())
        // const exchangeContract = new window.web3.eth.Contract(ROUTER_ABI(), ROUTER_ADDR())
        // const uniBalance = convertFromWei(await exchangeContract.methods.balanceOf(address).call())
        // const uniSupply = convertFromWei(await exchangeContract.methods.totalSupply().call())
        // const accountData = {
        //     address: address,
        //     spartaBalance: spartaBalance,
        //     ethBalance: ethBalance,
        //     uniBalance: uniBalance,
        //     uniSupply: uniSupply
        // }

        // let spendable = ethBalance - notSpendAmount
        // spendable = spendable < 0 ? 0 : spendable.toPrecision(4)

        // setAccount(accountData)
        // context.setContext({ 'accountData': accountData })
        // setAmount({ toSpend: spendable })
    }

    const setMaxAmount = async () => {
        let spendable = account.ethBalance - notSpendAmount
        spendable = spendable < 0 ? 0 : spendable.toPrecision(4)
        setAmount({ toSpend: spendable })
    }

    const onInputAmountChange = e => {
        setAmount({ toSpend: e.target.value })
    }

    const getVethValue = () => {
        let ethAmount = amount.toSpend < 0 ? 0 : amount.toSpend
        let value = (+ethAmount / (+ethAmount + +currentBurn)) * 2048
        value = value < 0 || isNaN(value) ? 0 : value
        return value
    }

    const burnEther = async () => {
        const burnAmount = Web3.utils.toWei(amount.toSpend, 'ether')
        setBurnEthFlag('TRUE')
        const tx = await window.web3.eth.sendTransaction({ from: account.address, to: SPARTA_ADDR(), value: burnAmount })
        setEthTx(tx.transactionHash)
        setLoaded(true)
        const contract = new window.web3.eth.Contract(SPARTA_ABI(), SPARTA_ADDR())
        loadAccountData(contract, account.address)
    }

    const getLink = (tx) => {
        console.log(getExplorerURL().concat('tx/').concat(tx))
        return getExplorerURL().concat('tx/').concat(tx)
    }

    return (
        <>
            <Row>
                <Col xs={24} sm={12}>
                    <Input size={'large'} style={{ marginBottom: 10 }} onChange={onInputAmountChange} value={amount.toSpend} placeholder={amount.toSpend} />
                    {/* <br /><br />
                    <Button
                        backgroundColor="transparent"
                        onClick={setMaxAmount}
                        style={{ float: 'right' }}
                    >
                        {currency(spendable, 0, 5, 'BNB')}
                    </Button>
                    <Tooltip placement="right" title="This is your maximum spendable Ether.
					Hit the number to set it as amount to spend.">
                        &nbsp;<QuestionCircleOutlined style={{ color: Colour().grey, marginBottom: 0 }} />
                    </Tooltip>
                    <LabelGrey display={'block'} style={{ fontStyle: 'italic' }}>Spendable BNB</LabelGrey> */}
                </Col>

            </Row>

            <Row>

                <Col xs={24} sm={12} style={{ float:"left" }}>
                    {amount.toSpend > 0 && connected
                        ? <Button onClick={burnEther}
                        type="primary" size={"large"} style={{}}
                        >BURN >></Button>
                        : <Button disabled>BURN >></Button>
                    }
                    <Sublabel>BURN TO ACQUIRE SPARTA</Sublabel>

                    {burnEthFlag &&
                        <>
                            {loaded &&
                                <>
                                    <a href={getLink(ethTx)} rel="noopener noreferrer" title="Transaction Link" target="_blank" style={{ color: Colour().gold }}> VIEW TRANSACTION -> </a>
                                </>
                            }
                        </>
                    }
                </Col>

                {/* <Col xs={24} sm={6} style={{ marginTop: '-3px' }}>
                    <Text size={32}>{currency(getVethValue(), 0, 2, 'SPARTA')}
                        <Tooltip placement="right" title="The amount of SPARTA you get is&nbsp;dependent on how much you burn, compared to how much everyone else burns.">
                            &nbsp;<QuestionCircleOutlined style={{ color: Colour().grey, marginBottom: 0 }} />
                        </Tooltip>
                    </Text>
                    <LabelGrey display={'block'} style={{ fontStyle: 'italic' }}>Potential SPARTA value</LabelGrey>
                </Col> */}
            </Row>
        </>
    )
}