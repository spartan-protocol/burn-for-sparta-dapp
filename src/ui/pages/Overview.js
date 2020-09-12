import React from 'react'

import { Row, Col } from 'antd'
import { Abstract } from '../components/abstract'
import { SpartanPane } from '../components/SpartanPane'
import { UsefulLinks } from '../components/usefulLinks'

import '../../App.less'

const Overview = (props) => {

	return (
		<div>
			<Row>
				<Col xs={24}>
					<h1 style={{ fontSize: 48, textAlign:"Center" }}>SPARTA</h1>
					<span style={{
						marginBottom: "0.56rem",
						display: "block",
						textAlign:"Center"
					}}>
						A PROTOCOL FOR INCENTIVISED LIQUIDITY AND SYNTHETIC ASSETS ON BINANCE SMART CHAIN
					</span>
					<Row>
						<Col xs={24}>
							<p style={{
								textAlign: "center"
							}}>
								<Abstract />
							</p>
						</Col>
					</Row>
				</Col>
			</Row>
			<br />
			<Row type="flex" justify="space-around">
				<Col md={7} className="sparta-tile">
					<Row>
						<h1>1</h1> <h1>SEND</h1>
					</Row>
					<Row>
						<h2>Send BNB & BEP2 assets from Binance Chain to Binance Smart Chain</h2>
					</Row>
					<Row>
						<div className='sparta-button'><a href='https://medium.com/@spartanprotocol/swap-bep2-token-for-its-bep20-equivalent-a5054eec314d' rel="noopener noreferrer">SEND</a></div>
					</Row>
				</Col>
				<Col md={7} className="sparta-tile">
					<Row>
						<h1>2</h1>  <h1>CONNECT</h1>
					</Row>
					<Row>
						<h2>Connect your MetaMask wallet with Binance Smart Chain</h2>
					</Row>
					<Row type="flex" align="middle">
						<div className='sparta-button'><a href='https://medium.com/@spartanprotocol/connecting-metamask-to-bsc-mainnet-23e434bc670f' rel="noopener noreferrer">CONNECT</a></div>
					</Row>
				</Col>
				<Col md={7} className="sparta-tile">
					<Row>
						<h1>3</h1>  <h1>BURN</h1>
					</Row>
					<Row>
						<h2>Burn BNB & BEP20 assets. Acquire your share of the 100m initial SPARTA</h2>
					</Row>
					<Row>
						<div className='sparta-button'><a href={window.location.origin + '/burn'} rel="noopener noreferrer">BURN</a></div>
					</Row>
				</Col>
			</Row>

			<SpartanPane/>
			<hr />
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
