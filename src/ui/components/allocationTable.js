import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context'

import { Row, Col, Table, Progress } from 'antd'
// import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Text, Colour, } from '../components'
import { formatWei, convertFromWeiDigits } from '../../common/utils'

import tokenArray from '../../data/tokenArray.json'
import { getSpartaContract, getExplorerURL } from '../../client/web3'

export const AllocationTable = () => {

    const context = useContext(Context)

    const [tokenTable, setTokenTable] = useState([])
    const [marketData, setMarketData] = useState(
        { priceUSD: 0.3, priceBNB: 0.01, bnbPrice: 30 })

    useEffect(() => {
        // context.tokenArray ? loadTokenData() : setTokenTable(tokenTable)
        loadTokenData()
        if (context.marketData) {
            setMarketData(context.marketData)
        }
        // eslint-disable-next-line
    }, [context.marketData])

    const loadTokenData = async () => {

        let contract = getSpartaContract()

        for (let i = 0; i < tokenArray.length; i++) {
            let data = await contract.methods.getAssetDetails(tokenArray[i].address).call()
            // console.log(data.claimed)
            tokenArray[i].claimed = data.claimed
        }
        console.log({ tokenArray })
        setTokenTable(tokenArray)

        context.setContext({
            'tokenArray': tokenArray
        })
    }



    const columns = [
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
            fixed: 'left',
        },
        {
            title: 'Name',
            key: 'name',
            render: (record) => {
                return (
                    <div>
                        <a href={`${getExplorerURL()}token/${record.address}`} target="blank">
                <Text size={14} bold={true} color={Colour().gold}>{record.name}</Text>
                        </a>
                    </div>
                )
            }
        },
        {
            title: 'Token Allocation',
            key: 'allocation',
            render: (record) => {
                return (
                    <div>
                        <Text>{formatWei(record.allocation, 0, 0)}</Text>
                    </div>
                )
            }
        },
        {
            title: 'Progress',
            key: 'progress',
            render: (record) => {
                return (
                    <div>
                        <Progress percent={(+record.claimed / +record.allocation) * 100}
                            status="active" size="small" showInfo={false} strokeColor={Colour().gold} />
                    </div>
                )
            }
        },
        {
            title: 'SPARTA per Token',
            key: 'claimRate',
            render: (record) => {
                return (
                    <div>
                        <Text>{convertFromWeiDigits(record.claimRate, 4)}</Text>
                    </div>
                )
            }
        },
                {
            title: 'SPARTA Allocation',
            key: 'spartaAllocation',
            render: (record) => {
                return (
                    <div>
                        <Text>{record.spartaAllocation.toLocaleString()}</Text>
                    </div>
                )
            }
        },
        {
            title: 'Market Value',
            key: 'price',
            render: (record) => {
                return (
                    <div>
                        <Text>${convertFromWeiDigits(record.claimRate * marketData.priceUSD, 4)}</Text>
                    </div>
                )
            }
        },
        // {
        //     title: 'Total Value',
        //     key: 'totalValue',
        //     render: (record) => {
        //         return (
        //             <div>
        //                 <Text>{currency((record.spartaAllocation * marketData.priceUSD), 0, 0)}</Text>
        //             </div>
        //         )
        //     }
        // }
    ];

    return (
        <div>
        <Row gutter={[16, 16]} type="flex" justify="center">
                <Col xs={24}>
                    <Table dataSource={tokenTable} columns={columns} pagination={false} rowKey="address" scroll={{ x: 1000 }}></Table>
                </Col>
            </Row>
        </div>
    )
}

export default AllocationTable
