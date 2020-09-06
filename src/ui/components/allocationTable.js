import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context'

import { Row, Col, Table } from 'antd'
// import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Text, } from '../components'

import tokenArray from '../../data/tokenArray.json'

export const AllocationTable = () => {

    const context = useContext(Context)

    const [tokenTable, setTokenTable] = useState([])

    useEffect(() => {
        context.tokenArray ? loadTokenData() : setTokenTable(tokenArray)
        // eslint-disable-next-line
    }, [])

    const loadTokenData = async () => {

        setTokenTable(tokenArray)

        context.setContext({
            'tokenArray': tokenArray
        })
    }



    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: (record) => {
                return (
                    <div>
                        <Text size={14} bold={true}>{record.name}</Text>
                    </div>
                )
            }
        },
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
        },
        {
            title: 'allocation',
            key: 'allocation',
            render: (record) => {
                return (
                    <div>
                        <Text>{record.allocation}</Text>
                    </div>
                )
            }
        },
        {
            title: 'claimRate',
            key: 'claimRate',
            render: (record) => {
                return (
                    <div>
                        <Text>{record.claimRate}</Text>
                    </div>
                )
            }
        },
        {
            title: 'Price',
            key: 'snapshotPrice',
            render: (record) => {
                return (
                    <div>
                        <Text>{record.snapshotPrice}</Text>
                    </div>
                )
            }
        },
        {
            title: 'totalValue',
            key: 'totalValue',
            render: (record) => {
                return (
                    <div>
                        <Text>{record.totalValue}</Text>
                    </div>
                )
            }
        },
        {
            title: 'spartaAllocation',
            key: 'spartaAllocation',
            render: (record) => {
                return (
                    <div>
                        <Text>{record.spartaAllocation}</Text>
                    </div>
                )
            }
        },
        {
            title: 'maxClaim',
            key: 'maxClaim',
            render: (record) => {
                return (
                    <div>
                        <Text>{record.maxClaim}</Text>
                    </div>
                )
            }
        },
    ];

    return(
        <div>
            <Row>
                <Col xs={24} style={{ paddingRight: 50 }}>
                    <Table dataSource={tokenTable} columns={columns} pagination={false} rowKey="address"></Table>
                </Col>
            </Row>
        </div>
    )
}

export default AllocationTable