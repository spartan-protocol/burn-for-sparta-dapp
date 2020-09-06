import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context'

import { Row, Col, Table, message, Modal, Input } from 'antd'
// import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Click, Colour } from '../components'
import { Button } from './elements'

import {
    BNB_ADDR, SPARTA_ADDR, getTokenData, getTokenContract, getAllocationData, getEligibleTokens, getSpartaContract
} from '../../client/web3.js'

import { formatWei, getBig } from '../../common/utils'
import { LoadingOutlined } from '@ant-design/icons'

var utils = require('ethers').utils;

export const BurnTable = () => {

    const context = useContext(Context)

    const [tokenTable, setTokenTable] = useState([])
    const [allocationTable, setAllocationTable] = useState([])
    const [modal, setModal] = useState(false)
    const [modalToken, setModalToken] = useState({
        name: '',
        balance: '',
        address: '',
        claimRate: '',
        allocation: '',
        claimed: ''
    })
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [claimAmount, setClaimAmount] = useState(false)
    const [spartaValue, setSpartaValue] = useState(0)
    const [startTx, setStartTx] = useState(false);

    useEffect(() => {

        if (context.walletData) {
            context.tokenArray ? loadAllocationData() : setAllocationTable(context.allocationTable)
        }
        // eslint-disable-next-line
    }, [context.walletData])

    const loadAllocationData = async () => {

        let eligibleTokens = []
        eligibleTokens = await getEligibleTokens(context.assetArray, context.walletData)
        let allocationTable = await getAllocationData(eligibleTokens, context.walletData)
        setAllocationTable(allocationTable)

        context.setContext({
            'allocationTable': allocationTable
        })
    }

    const unlockToken = async (record) => {
        const contract = getTokenContract(record.address)
        const supply = await contract.methods.totalSupply().call()
        await contract.methods.approve(SPARTA_ADDR, supply).send({
            from: context.walletData.address,
            gasPrice: '',
            gas: ''
        })
        message.success(`Approved!`, 2);
        tableUpdateApproved(record)
    }

    const tableUpdateApproved = (record) => {
        const newData = [...tokenTable];
        const index = newData.findIndex(item => record.address === item.address);
        const tokenObject = {
            address: record.address,
            name: record.name,
            balance: record.balance,
            symbol: record.symbol,
            maxClaim: record.maxClaim,
            claimRate: record.claimRate,
            approved: true,
            burnt: false
        }
        newData.splice(index, 1, tokenObject);
        setTokenTable(newData)
        context.setContext({
            'tokenArray': newData
        })
    }


    const showModal = (record) => {
        console.log(record)
        setModalToken({
            name: record.name,
            balance: record.balance,
            address: record.address,
            claimRate: record.claimRate,
            allocation: record.allocation,
            claimed: record.claimed
        })
        setModal(true)
    };

    const handleOk = (record) => {
        setConfirmLoading(true)
        setToken(record, 100)
    };

    const handleCancel = () => {
        setModal(false)
    };

    const changeAmount = (e) => {
        let wei = utils.parseEther(e.target.value)
        let actual = getMaxAmount(wei.toString(), modalToken)
        setClaimAmount(actual)
        setSpartaValue(actual * modalToken.claimRate / (10 ** 18))
    }

    const getMaxAmount = (amount, allocationData) => {
        let amt = getBig(amount)
        let remaining = (getBig(allocationData.allocation)).minus(getBig(allocationData.claimed))
        return amt.gt(remaining) ? remaining.toString() : amount.toString()
    }

    const set25 = async (record) => { setToken(record.address, 25) }
    const set50 = async (record) => { setToken(record.address, 50) }
    const set75 = async (record) => { setToken(record.address, 75) }
    const set100 = async (record) => { setToken(record.address, 100) }

    const setToken = async (address, rate) => {
        const tokenData = await getTokenData(address, context.walletData)
        const amount = getBig(tokenData.balance)
        const finalAmount = (((amount.times(rate)).div(100).integerValue(1))).toString()
        let actual = getMaxAmount(finalAmount, modalToken)
        console.log(actual, actual * modalToken.claimRate, modalToken)
        setClaimAmount(actual)
        setSpartaValue(actual * modalToken.claimRate / (10 ** 18))
    }

    const claim = async () => {
        setStartTx(true)
        let contract = getSpartaContract()
        console.log(modalToken.address, claimAmount)
        await contract.methods.claim(modalToken.address, claimAmount).send({
            from: context.walletData.address,
            gasPrice: '',
            gas: '',
            value: modalToken.address === BNB_ADDR ? claimAmount : 0
        })
        message.success(`Transaction Sent! $SPARTA is now in your wallet.`, 4);
        setStartTx(false)
        setModal(false)
    }

    const getLink = (record) => {
        // return getExplorerURL().concat('tx/').concat(record.txHash)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name) => (
                <h3 style={{ fontSize: 24 }}>{name}</h3>
            )
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
            render: (balance) => (
                <h3 style={{ fontSize: 24 }}>{formatWei(balance, 2, 2)}</h3>
            )
        },
        {
            title: 'SPARTA Value',
            key: 'value',
            render: (record) => (
                <h3 style={{ fontSize: 24 }}>{formatWei((record.balance * record.claimRate / (10 ** 18)), 2, 2)}</h3>
            )
        },
        {
            title: 'CLAIM',
            key: 'action',
            render: (record) => {
                const approved = record.approved

                var burnt = false
                if (record.txHash) {
                    burnt = true
                }
                return (
                    <div>
                        {(approved && !burnt) &&
                            <div>
                                <Button type="primary" onClick={() => showModal(record)}>CLAIM</Button>
                            </div>
                        }
                        {(!approved && !burnt) &&
                            <Button onClick={() => unlockToken(record)}>UNLOCK >></Button>
                        }
                        {burnt &&
                            <Click><a href={getLink(record)} rel="noopener noreferrer" title="Etherscan Link" target="_blank" style={{ color: "#D09800", fontSize: 16 }}>VIEW -></a></Click>
                        }

                        <Modal
                            title={`BURN ${modalToken.name}`}
                            visible={modal}
                            onOk={handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                            record={record}
                            footer={null}
                            width={800}
                        >
                            <ModalContent record={modalToken}
                                claim={claim}
                                spartaValue={spartaValue}
                                set25={set25}
                                set50={set50}
                                set75={set75}
                                set100={set100}
                                changeAmount={changeAmount}
                                startTx={startTx}
                                claimAmount={claimAmount}
                            />
                        </Modal>

                    </div>)
            }
        },
    ]

    const tableStyles = {
        margin: 0,
        padding: '49px 21px',
        borderRadius: '9px',
        borderColor: Colour().grey,
        backgroundColor: Colour().black,
    }

    return (
        <>
            <Table style={tableStyles} dataSource={allocationTable} columns={columns} rowKey="address" />
        </>
    )
}

export default BurnTable

const ModalContent = (props) => {

    return (
        <div>

            <Row>
                <Col xs={12} style={{ paddingRight: 20 }}>
                    <h3>BURN AN AMOUNT</h3>
                    <Input onChange={props.changeAmount}
                        placeholder={'Enter amount to burn'}
                        allowClear={true}></Input>
                    <br /><br />
                    <h3>BURN A PROPORTION</h3>
                    <Button style={{ marginLeft: 10 }} onClick={() => props.set25(props.record)} type={'secondary'}>25%</Button>&nbsp;
                    <Button style={{ marginLeft: 10 }} onClick={() => props.set50(props.record)} type={'secondary'}>50%</Button>&nbsp;
                    <Button style={{ marginLeft: 10 }} onClick={() => props.set75(props.record)} type={'secondary'}>75%</Button>&nbsp;
                    <Button style={{ marginLeft: 10 }} onClick={() => props.set100(props.record)} type={'secondary'}>MAX</Button>
                </Col>
                <Col xs={12} style={{ paddingLeft: 20 }}>
                    <h3>SPARTA VALUE</h3>

                    <h3 style={{ fontSize: 24 }}>{formatWei(props.spartaValue, 2, 2)}</h3>

                    {props.startTx &&
                        <LoadingOutlined style={{ color: Colour().white, fontSize: 24 }} />
                    }

                    {props.claimAmount > 0 &&
                        <Button style={{ marginLeft: 10, float: 'right' }} onClick={() => props.claim()}>BURN</Button>
                    }

                </Col>
            </Row>
        </div>
    )
}