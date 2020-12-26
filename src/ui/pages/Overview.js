import React from 'react'

import { Row, Col, Card } from 'antd'
import { Abstract } from '../components/abstract'
import { SpartanPane } from '../components/SpartanPane'
import { UsefulLinks } from '../components/usefulLinks'

import '../../App.less'

const Overview = (props) => {

	return (
		<div>
			<Row gutter={[10, 10]} type="flex" justify="space-around">
				<Col xs={24}>
					<Card>
						<h1 style={{ fontSize: 48}}>SPARTA</h1>
						<h2>A PROTOCOL FOR INCENTIVISED LIQUIDITY AND SYNTHETIC ASSETS ON BINANCE SMART CHAIN</h2>
						<h3><Abstract /></h3>
					</Card>
				</Col>
				<Col xs={24}>
					<SpartanPane/>
				</Col>
				<Col xs={24}>
					<h4>BURN PHASE IS NOW OVER/CLOSED!</h4>
				</Col>
				<Col xs={24} sm={12} lg={24}>
					<Card title="LEARN MORE">
					<UsefulLinks />
					</Card>
				</Col>
			</Row>

		</div>
	)
}

export default Overview
