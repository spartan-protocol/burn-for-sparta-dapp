import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context'

import { LabelGrey } from '../components'
import { BurnTable } from '../components/burnTable'
import { AllocationTable } from '../components/allocationTable'

import { Click, Colour, Center, Button } from "../components"

import '../../App.less'
import { Tabs, Modal, Row, Col } from 'antd'

const { TabPane } = Tabs

const Burn = () => {

	const context = useContext(Context)

	const [safari, setSafari] = useState(null)
	const [tab, setTab] = useState('1')
	const [loaded, setLoaded] = useState(false)
	const [modal, setModal] = useState(false)
	const [confirmLoading, setConfirmLoading] = useState(false)

	useEffect(() => {
		var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		setSafari(isSafari)
		let pathname = window.location.pathname.split("/")[1]
		if (pathname === 'burn' && !loaded) {
			setLoaded(true)
			setTab('1')
			if(!context.connectedBSC){
				setModal(true)
			}
		}
		// eslint-disable-next-line
	}, [])

	const onChange = key => {
		setTab(key)
	}

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
			<Tabs defaultActiveKey='1' activeKey={tab} onChange={onChange} size={'large'} style={{ marginTop: 0, textAlign: "center" }}>

				<TabPane tab="BURN ASSETS" key="1" style={{ textAlign: "left" }}>
					<h1>CLAIM SPARTA</h1>
					<h2>Claim your share of SPARTA by burning BNB and BEP20 assets.</h2>
					<p>All assets burnt are forever destroyed. SPARTA will be minted and sent to your address.</p>
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
				</TabPane>

				<TabPane tab="ALLOCATIONS" key="2" style={{ textAlign: "left" }}>
					<h1>ALLOCATION TABLE</h1>
					<h2>30 BINANCE CHAIN PROJECTS ARE BURNING FOR SPARTA</h2>
					{safari &&
						<>
							<LabelGrey>Sending Binance Smart Chain transactions requires Chrome and Metamask</LabelGrey>
							<a href='https://metamask.io' rel="noopener noreferrer" title="Metamask Link" target="_blank" style={{ color: "#C7692B", fontSize: 12 }}>Download Metamask</a>
						</>
					}
					{!safari &&
						<>
							<AllocationTable />
						</>
					}
				</TabPane>

			</Tabs>

			<br/><br/>

			<Tabs defaultActiveKey='3' activeKey={tab} onChange={onChange} size={'large'} style={{ marginTop: 0, textAlign: "center" }}>

				<TabPane tab="TOKENS MISSING?" key="3" style={{ textAlign: "left" }}>
				<h1>Are Your Tokens Missing on MetaMask?</h1>
				<ul>
					<li>Don't worry! You probably have not yet added your custom token.</li>
					<li>- Click on MetaMask</li>
					<li>- Click on assets</li>
					<li>- Scroll down</li>
					<li>- Click 'Add Token'</li>
					<li>- Click 'Custom Token'</li>
					<li><b>Token address for SPARTA:</b> 0xe4ae305ebe1abe663f261bc00534067c80ad677c</li>
					<li><b>Token address for CAN:</b> 0x007ea5c0ea75a8df45d288a4debdd5bb633f9e56</li>
					<li><b>Token address for RAVEN:</b> 0xcd7c5025753a49f1881b31c48caa7c517bb46308</li>
				</ul>
				</TabPane>

				<TabPane tab="TROUBLESHOOTING" key="4" style={{ textAlign: "left" }}>
				<h1>Stuck on connecting!</h1>
				<ul>
					<li>If you are using Brave browser, please disable shields for this website.</li>
					<li></li>
					<li>Refresh the page and ensure MetaMask has allowed the website.</li>
					<li></li>
					<li>Ensure it says "connected" in MetaMask, if not then you need to allow the wallet connection to the website.</li>
				</ul>

					<h1>Stuck pending transaction in MetaMask!</h1>
					<ul>
						<li>Simply click on the MetaMask extension, then click on the network selection box up the top and change it to "Main Ethereum Network".</li>
						<li></li>
						<li>Then change it back to "BSC Mainnet". The transaction will now fail, no fees will be charged and your queue will be cleared.</li>
					</ul>

					<h1>Ledger connection issues!</h1>
					<ul>
						<li>Ensure your Ledger has the latest firmware update.</li>
						<li></li>
						<li>Ensure all Ledger apps are up to date.</li>
						<li></li>
						<li>After updating apps, make sure 'contract data' is enabled in the ETH app, this reverts when you update apps!</li>
						<li></li>
						<li>Make sure the ETH app is open and your Ledger is unlocked just before you action the MetaMask submit button.</li>
						<li></li>
						<li>Try different USB cable.</li>
						<li></li>
						<li>Try different USB port.</li>
						<li></li>
						<li>Try different browser (if you are using Brave, try chrome or vice versa)</li>
						<li></li>
						<li>Try an older portable release Chrome-forked browser failing that.</li>
						<li></li>
						<li>Even if your Ledger works normally elsewhere, you may have to do some or all of the above.</li>
						<li></li>
						<li>LEDGERS ARE EXTREMELY PICKY!</li>
					</ul>
					<h1>Reach out on telegram for assistance ONLY after you have tried all of the above!</h1>
				</TabPane>

			</Tabs>

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
