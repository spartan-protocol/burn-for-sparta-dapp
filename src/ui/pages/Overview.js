import React from 'react'

import { Row, Col } from 'antd'
import { Abstract } from '../components/abstract'
import { SpartanPane } from '../components/SpartanPane'
import { UsefulLinks } from '../components/usefulLinks'

import { Colour, Click } from '../components'

import '../../App.less'

const Overview = (props) => {

	return (
		<div>
			<Row>
				<Col xs={24}>
					<h1 style={{ fontSize: 48 }}>SPARTA</h1>
					<span style={{
						marginBottom: "0.56rem",
						display: "block"
					}}>
						A PROTOCOL FOR INCENTIVISED LIQUIDITY AND SYNTHETIC ASSETS ON BINANCE SMART CHAIN
					</span>
					<Row>
						<Col xs={24} sm={24}>
							<p style={{
								textAlign: "justify"
							}}>
								<Abstract />
							</p>
						</Col>
					</Row>
				</Col>
			</Row>
			<br />
			<Row>
				<Col xs={8} style={{padding:10}}>
					<h1 style={{ fontSize: 48 }}>1</h1> <h1>SEND</h1>
					<h2>Send your BNB and BEP2 Assets from Binance Chain to Binance Smart Chain.</h2>
					<Click size={18}><a href='https://www.binance.org/en/smartChain' rel="noopener noreferrer" style={{ color: Colour().gold}}>SEND&nbsp;>></a></Click>
				</Col>
				<Col xs={8} style={{padding:10}}>
					<h1 style={{ fontSize: 48 }}>2</h1>  <h1>CONNECT</h1>
					<h2> Connect your Metamask with Binance Smart Chain.</h2>
					<Click size={18}><a href='https://medium.com/@spartanprotocol/connecting-metamask-to-bsc-mainnet-23e434bc670f' rel="noopener noreferrer"style={{ color: Colour().gold}}>CONNECT&nbsp;>></a></Click>
				</Col>
				<Col xs={8} style={{padding:10}}>
					<h1 style={{ fontSize: 48 }}>3</h1>  <h1>BURN</h1>
					<h2> Burn BNB and BEP20 assets to acquire your share of the 100,000,000 initial SPARTA.</h2>
					<Click size={18}><a href={window.location.origin + '/burn'} rel="noopener noreferrer" style={{ color: Colour().gold}}>BURN&nbsp;>></a></Click>
				</Col>
			</Row>

			<SpartanPane/>
			<hr />
			<Row>
				<Col sm={8}>
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
