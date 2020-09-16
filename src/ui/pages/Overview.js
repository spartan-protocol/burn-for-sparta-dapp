import React from 'react'

import { Row, Col, Card } from 'antd'
import { Abstract } from '../components/abstract'
import { SpartanPane } from '../components/SpartanPane'
import { UsefulLinks } from '../components/usefulLinks'

import '../../App.less'

const Overview = (props) => {

	return (
		<div>
			<Row>
				<Col xs={24}>
					<Card>
						<h1 style={{ fontSize: 48}}>SPARTA</h1>
						<h2>A PROTOCOL FOR INCENTIVISED LIQUIDITY AND SYNTHETIC ASSETS ON BINANCE SMART CHAIN</h2>
						<h3><Abstract /></h3>
					</Card>
				</Col>
			</Row>

			<SpartanPane/>

			<Row type="flex" justify="space-around">
				<Col md={7}>
					<Card title="Step 1: Send">
							<h2>Send BNB & BEP2 assets from Binance Chain to Binance Smart Chain</h2>
							<div className='sparta-button'><a href='https://medium.com/@spartanprotocol/swap-bep2-token-for-its-bep20-equivalent-a5054eec314d' rel="noopener noreferrer">Send</a></div>
					</Card>
				</Col>
				<Col md={7}>
					<Card title="Step 2: Connect">
							<h2>Connect your MetaMask wallet with Binance Smart Chain</h2>
							<div className='sparta-button'><a href='https://medium.com/@spartanprotocol/connecting-metamask-to-bsc-mainnet-23e434bc670f' rel="noopener noreferrer">Connect</a></div>
					</Card>
				</Col>
				<Col md={7}>
					<Card title="Step 3: Burn">
						<h2>Burn BEP20 assets to acquire your share of the 100m initial SPARTA</h2>
						<div className='sparta-button'><a href={window.location.origin + '/burn'} rel="noopener noreferrer">Burn</a></div>
					</Card>
				</Col>
			</Row>

			<br/>
			<br/>
			<Row style={{textAlign:"center"}}>
				<Col sm={24}>
					<h1>LEARN MORE</h1>
					<UsefulLinks />
				</Col>
			</Row>
			<br/>
			<br/>
		</div>
	)
}

export default Overview
