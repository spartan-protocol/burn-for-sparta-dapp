import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../context'

import Web3 from 'web3'

import {
    SPARTA_ADDR, getSpartanPrice, getExplorerURL, ERC20_ABI,
    // getTokenContract, nodeAPI, UTILS_ADDR, UTILS_ABI,
    // getNewTokenData, getAccount,
} from '../../client/web3.js'
import { convertFromWei, currency } from '../../common/utils'

import { Row, Col } from 'antd'
import { LabelGrey, Colour, Text } from '../components'
import { Logo } from './logo'

export const SpartanPane = () => {

    const context = useContext(Context)

    const [spartanData, setSpartanData] = useState(
        { name: '', symbol: '', totalSupply: '', decimals: '', genesis: '' })
    const [emissionData, setEmissionData] = useState(
        { balance: '', totalBurnt: '', totalEmitted: 0, totalFees: '' })
    const [marketData, setMarketData] = useState(
        { priceUSD: '', priceETH: '', ethPrice: '' })

    useEffect(() => {
        context.spartanData ? getspartanData() : loadspartanData()
        loadEmissionData()
        loadMarketData()
        // eslint-disable-next-line
    }, [])

    const getspartanData = () => {
        setSpartanData(context.spartanData)
    }

    const loadspartanData = async () => {
        // let web3 = new Web3(new Web3.providers.HttpProvider(nodeAPI()))
        // let contract = new web3.eth.Contract(UTILS_ABI, UTILS_ADDR)
        // console.log(contract)
        // var spartanData = await contract.methods.getTokenDetails(SPARTA_ADDR).call()
        
        // let account = await getAccount()
        // let spartanData = await getNewTokenData(SPARTA_ADDR, account)
        let spartanData = {
            name: 'SPARTAN PROTOCOL TOKEN',
            symbol: 'SPARTA',
            maxSupply: 300000000,
            initalSupply: 100000000,
        }
        console.log({ spartanData })
        context.setContext({
            "spartanData": spartanData
        })
        setSpartanData(spartanData)
    }

    const loadEmissionData = async () => {
        // let web3 = new Web3(new Web3.providers.HttpProvider(nodeAPI()))
        // let web3 = new Web3(Web3.givenProvider || nodeAPI())
        // let web3 = new Web3(nodeAPI())
        // let web3 = new Web3(new Web3.providers.HttpProvider('https://chain-api.singapore-01.ankr.com/7129aa8e-7000-4b28-9ae2-4c80dbcfd4d3'))
        let web3 = new Web3(Web3.givenProvider)
        let contract = new web3.eth.Contract(ERC20_ABI, SPARTA_ADDR)
        // console.log(contract)
        // let totalSupply = 'test'

        // let contract = await getTokenContract(SPARTA_ADDR)
        let totalSupply = convertFromWei(await contract.methods.totalSupply().call())
        let emissionData = {
            totalEmitted: totalSupply,
        }
        setEmissionData(emissionData)
        context.setContext({ "emissionData": emissionData })
    }

    const loadMarketData = async () => {
        let spartaPrice = await getSpartanPrice()

        const marketData = {
            priceUSD: spartaPrice,
        }

        setMarketData(marketData)
        context.setContext({
            "marketData": marketData
        })
    }

    const SpartanStatsStyles = {
        padding: '49px 21px',
        borderRadius: '9px',
        borderColor: Colour().grey,
        backgroundColor: Colour().black,
    }

    return (
        <Row id="SpartanStatsTable" style={SpartanStatsStyles}>

            <Col xs={24} sm={18} style={{ paddingLeft: 20 }}>
                <Row>
                    <Col xs={24}>
                        <Text size={32}> {spartanData.name}({spartanData.symbol})</Text>
                    </Col>
                    <Col xs={0}>
                    </Col>
                </Row>

                <Row style={{ marginTop: 20 }}>
                    <Col xs={24} sm={12}>
                        <LabelGrey size={14}>MAX SUPPLY</LabelGrey>
                        <br />
                        <Text size={24}>{currency(spartanData.maxSupply, 0, 0, 'SPARTA').replace('SPARTA', '')}</Text>
                    </Col>
                    <Col xs={24} sm={12}>
                        <LabelGrey size={14}>INITIAL DISTRIBUTION</LabelGrey>
                        <br />
                        <Text size={24}>{currency(spartanData.initalSupply, 0, 0, 'SPARTA').replace('SPARTA', '')}</Text>
                    </Col>
                </Row>

                <Row style={{ marginTop: 20 }}>
                    <Col xs={24} sm={12}>
                        <LabelGrey size={14}>EMITTED</LabelGrey>
                        <br />
                        <Text size={24}>{currency(emissionData.totalEmitted, 0, 0, 'SPARTA').replace('SPARTA', '')}</Text>
                    </Col>
                    <Col id="SpartanStatsTableCircCap" xs={24} sm={12}>
                        <LabelGrey size={14}>CIRCULATING CAP</LabelGrey>
                        <br />
                        <Text size={24}>{currency((emissionData.totalEmitted * marketData.priceUSD), 0, 0)}</Text>
                    </Col>
                </Row>
                <br />
                <a id="SpartanStatsTableContractAddress" href={`${getExplorerURL()}address/${SPARTA_ADDR}`} target="blank" style={{ fontSize: 16, color: Colour().gold }}>{SPARTA_ADDR}</a>
            </Col>
            <Col id="SpartanStatsTableCurrentPrice" xs={24} sm={6} style={{ paddingRight: 20 }}>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <Logo />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Text size={32}>{currency(marketData.priceUSD, 2, 2)}</Text>
                </div>
            </Col>
        </Row>
    )
}