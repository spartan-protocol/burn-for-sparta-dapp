import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../../context'
import { Link} from 'react-router-dom'
import { Table, Row, Col, Tabs, Button } from 'antd'

import { getListedTokens, getListedPools, getPoolsData, getGlobalData } from '../../client/web3'
import { formatUSD, formatAPY, convertFromWei } from '../../common/utils'
import '../../common/styles.css'
import { paneStyles, colStyles } from '../components/styles'
import { SwapOutlined, LoginOutlined, LoadingOutlined } from '@ant-design/icons';

import { LabelGroup } from '../components/elements'
import { ColourCoin } from '../components/common'
import CreatePool from '../components/CreatePool'


const { TabPane } = Tabs

const Pools = (props) => {

    const context = useContext(Context)
    const [tab, setTab] = useState('1')

    const [globalData, setGlobalData] = useState({
        totalStaked: 0,
        totalFees: 0,
        totalVolume: 0,
        stakeTx: 0,
        unstakeTx: 0,
        swapTx: 0,
    })

    useEffect(() => {
        if (context.connected) {
            getData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.connected])

    const getData = async () => {
        setGlobalData(await getGlobalData())
    }

    const onChange = key => {
        setTab(key)
    }
    //Pools STAKING and CREATE POOL TAB
    return (
        <>          
            <Tabs defaultActiveKey='1' activeKey={tab} onChange={onChange} size={'large'} style={{ marginTop: 0, textAlign: "center" }}>
                <TabPane tab="STAKING" key="1" style={{ textAlign: "left" }}>
                    <h1>POOLS</h1>                   
                    <br />
                        <Row>
                        <Col xs={24} xl={5}>
                                <PoolsPaneSide globalData={globalData}/>
                            </Col>
                            <Col xs={24} xl={19}>
                                <PoolTable />
                            </Col>
                        </Row>                      
                </TabPane>
                <TabPane tab="CREATE A POOL" key="2" style={{ textAlign: "left" }}>      
                    <Row style={paneStyles}>
                        <Col style={{ padding: 20 }}> 
                    <h1>CREATE A POOL</h1>
                    <h2>Instructions</h2>
                    <p>1. Ensure your Metamask is connected to the Binance Smart Chain (BSC) 
                        <br />
                        2. Enter the token address you wish to open a pool for 
                        <br />
                    3. Choose the amount of the token you would like to pledge to the pool
                        <br />
                        4. Choose the amount of the SPARTA you would like to pledge to the pool</p>
                        <br />
                            <CreatePool />
                        </Col>
                    </Row>
                </TabPane>                
            </Tabs>        
        </>
    )
}

export default Pools

const PoolTable = (props) => {

    const context = useContext(Context)

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = async () => {
        let tokenArray = await getListedTokens()
        context.setContext({ 'tokenArray': tokenArray })
        
        let poolArray = await getListedPools()
        context.setContext({ 'poolArray': poolArray })
        context.setContext({ 'poolsData': await getPoolsData(tokenArray) })
        console.log(tokenArray)
        console.log(poolArray)
    }

    const columns = [
        {
            render: (record) => (
                <div>
                    <ColourCoin symbol={record.symbol} size={36} />
                </div>
            )
        },
        {
            title: 'Pool',
            dataIndex: 'symbol',
            key: 'symbol',
            render: (symbol) => (
                <h3>{symbol}</h3>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                <p>{formatUSD(price, context.spartanPrice)}</p>
            )
        },
        {
            title: 'Depth',
            dataIndex: 'depth',
            key: 'depth',
            render: (depth) => (
                <p>{formatUSD(convertFromWei(depth), context.spartanPrice)}</p>
            )
        },
        {
            title: 'Volume',
            dataIndex: 'volume',
            key: 'volume',
            render: (volume) => (
                <p>{formatUSD(convertFromWei(volume), context.spartanPrice)}</p>
            )
        },
        {
            title: 'TX Count',
            dataIndex: 'txCount',
            key: 'txCount',
            render: (txCount) => (
                <p>{txCount.toLocaleString()}</p>
            )
        },
        {
            title: 'APY',
            dataIndex: 'apy',
            key: 'apy',
            render: (apy) => (
                <p>{formatAPY(apy)}</p>
            )
        }, {
            title: 'REVENUE',
            dataIndex: 'fees',
            key: 'fees',
            render: (fees) => (
                <p>{formatUSD(convertFromWei(fees), context.spartanPrice)}</p>
            )
        },
        {
            render: (record) => (
                <div>
                    <Link to={`/stake/stake?pool=${record.address}`}><Button type={'primary'} size='small' icon={<LoginOutlined />}>STAKE >></Button></Link>
                    <br /><br />
                    <Link to={`/stake/swap?pool=${record.address}`}><Button type={'text'} size='small' icon={<SwapOutlined />}>TRADE >></Button></Link>                             
                </div>
            )
        }
    ]

    const tableStyles = {
        margin: -20,
        marginRight: -40
    }

    return (
        <>
            {!context.connected &&
                <LoadingOutlined />
            }
            {context.connected &&
                <Row style={paneStyles}>
                    <Col xs={24} style={{ padding: 20 }}>
                        <Table style={tableStyles} dataSource={context.poolsData} columns={columns} pagination={false} rowKey="symbol" />
                    </Col>
                </Row>
            }
            <br />
        </>
    )
}

export const PoolsPaneSide = (props) => {

    const context = useContext(Context)

    const rowStylesPane = {
        marginTop: 20
    }

    return (
        <div>
            <Row style={paneStyles}>
                <Col xs={24} style={colStyles}>
                    <Row>
                        <Col xs={6} xl={24} style={rowStylesPane}>
                            <LabelGroup size={20} element={formatUSD(convertFromWei(props.globalData?.totalStaked), context.spartanPrice)} label={'Total Staked'} />
                        </Col>
                        <Col xs={6} xl={24} style={rowStylesPane}>
                            <LabelGroup size={20} element={formatUSD(convertFromWei(props.globalData?.totalVolume), context.spartanPrice)} label={'Total Volume'} />
                        </Col>
                        <Col xs={6} xl={24} style={rowStylesPane}>
                            <LabelGroup size={20} element={+props.globalData?.unstakeTx + +props.globalData?.stakeTx + +props.globalData?.swapTx} label={'TX COUNT'} />
                        </Col>
                        <Col xs={6} xl={24} style={rowStylesPane}>
                            <LabelGroup size={20} element={formatUSD(convertFromWei(props.globalData?.totalFees), context.spartanPrice)} label={'Total Fees'} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

