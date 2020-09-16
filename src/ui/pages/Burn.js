import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context'

import { LabelGrey } from '../components'
import { BurnTable } from '../components/burnTable'

import { Click, Colour, Center, Button } from "../components"

import '../../App.less'
import { Modal, Row, Col, Card } from 'antd'

const Burn = () => {

	const context = useContext(Context)

	const [safari, setSafari] = useState(null)
	const [loaded, setLoaded] = useState(false)
	const [modal, setModal] = useState(false)
	const [confirmLoading, setConfirmLoading] = useState(false)

	useEffect(() => {
		var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		setSafari(isSafari)
		let pathname = window.location.pathname.split("/")[1]
		if (pathname === 'burn' && !loaded) {
			setLoaded(true)
			if(!context.connectedBSC){
				setModal(true)
			}
		}
		// eslint-disable-next-line
	}, [])

	const showModal = () => {
		setModal(true)
	};

	const handleOk = () => {
		setConfirmLoading(true)
		context.setContext({connectedBSC:true})
		setModal(false)
	};

	const handleCancel = () => {
		setModal(false)
	};

	return (
		<>
			<Card>
				<h1 style={{ fontSize: 48}}>CLAIM SPARTA</h1>
				<h2>CLAIM YOUR SHARE OF SPARTA BY BURNING BNB AND BEP20 ASSETS</h2>
				<h3>All assets burnt are forever destroyed. SPARTA will be minted and sent to your address.</h3>
			</Card>

					{safari &&
						<>
							<LabelGrey>Sending Binance Smart Chain transactions requires Chrome and Metamask</LabelGrey>
							<br />
							<a href='https://metamask.io' rel="noopener noreferrer" title="Metamask Link" target="_blank" style={{ color: "#C7692B", fontSize: 12 }}>Download Metamask</a>
						</>
					}

					{!safari && context.connectedBSC &&
						<>
							<BurnTable />
						</>
					}

					{!safari && !context.connectedBSC &&
						<>
						<br/><br/><br/><br/>
						<Center><h3>It doesn't look like you are connected with Binance Smart Chain</h3></Center>
						<Center><Button onClick={showModal} type="primary">CHECK</Button></Center>
						</>
					}

			<br/><br/>

			<Modal
				title={`CONNECT`}
				visible={modal}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				// footer={null}
				width={400}
			>
				<ModalContent />
			</Modal>
		</>
	)
}
export default Burn

const ModalContent = (props) => {

    return (
        <div>

            <Row>
                <Col xs={24}>
                    <p>In order to use this DApp you will need to connect with Binance Smart Chain.</p>
                    <p>You need to set your Metamask to connect to a different network.</p>
					<Click><a href='https://medium.com/@spartanprotocol/connecting-metamask-to-bsc-mainnet-23e434bc670f' rel="noopener noreferrer" title="Burn Address" target="_blank" style={{ color: Colour().gold, fontSize: 12 }}>LEARN HERE -></a></Click>
					<br/><br/>
					<p>If you have connected properly, click OK.</p>
                </Col>
            </Row>
        </div>
    )
}
