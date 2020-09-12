import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context'

import { Row, Col, Table, Progress } from 'antd'
// import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Text, Colour, } from '../components'
import { formatWei } from '../../common/utils'

import tokenArray from '../../data/tokenArray.json'
import { getSpartaContract } from '../../client/web3'

export const AllocationTable = () => {

    const context = useContext(Context)

    const [tokenTable, setTokenTable] = useState([])

    useEffect(() => {
        context.tokenArray ? loadTokenData() : setTokenTable(tokenArray)
        // eslint-disable-next-line
    }, [])

    const loadTokenData = async () => {

        let contract = getSpartaContract()

        for(let i = 0; i<tokenArray.length; i++){
            let data = await contract.methods.getAssetDetails(tokenArray[i].address).call()
            // console.log(data.claimed)
            tokenArray[i].claimed = data.claimed
        }
        console.log({tokenArray})
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
                        <Text size={14} bold={true}>{record.name}</Text>
                    </div>
                )
            }
        },
        {
            title: 'Allocation',
            key: 'allocation',
            render: (record) => {
                return (
                    <div>
                        <Text>{formatWei(record.allocation, 2, 2)}</Text>
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
                        <Progress percent={(+record.claimed / +record.allocation)*100} 
                        status="active" size="small" showInfo={false} strokeColor={Colour().gold} />
                    </div>
                )
            }
        },
        {
            title: 'Snapshot Price',
            key: 'snapshotPrice',
            render: (record) => {
                return (
                    <div>
                        <Text>{record.snapshotPrice}</Text>
                    </div>
                )
            }
        },
        // {
        //     title: 'Claim Rate',
        //     key: 'claimRate',
        //     render: (record) => {
        //         return (
        //             <div>
        //                 <Text>{formatWei(record.claimRate, 2, 2)}</Text>
        //             </div>
        //         )
        //     }
        // },
        {
            title: 'Sparta Allocation',
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
            title: 'Total Value',
            key: 'totalValue',
            render: (record) => {
                return (
                    <div>
                        <Text>{record.totalValue}</Text>
                    </div>
                )
            }
        }
    ];

    return(
        <div>
            <Row>
                <Col xs={24} style={{ paddingRight: 50 }}>
                    <Table dataSource={tokenTable} columns={columns} pagination={false} rowKey="address" scroll={{ x: 1000 }}></Table>
                </Col>
            </Row>
        </div>
    )
}

export default AllocationTable
