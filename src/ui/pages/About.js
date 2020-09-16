import React from 'react'

import { Row, Col, Card	} from 'antd'

import '../../App.less'

const About = (props) => {

	return (
		<div>
			<Row gutter={[16, 16]} type="flex" justify="center">
				<Col xs={24}>
					<Card>
						<h1 style={{ fontSize: 48}}>SPARTAN PROTOCOL</h1>
						<h2>A PROTOCOL FOR INCENTIVISED LIQUIDITY AND SYNTHETIC ASSETS ON BINANCE SMART CHAIN</h2>
						<p>The Spartan Protocol incentivises the formation of capital in liquidity pools, such that they can be used for synthetic token generation, lending, derivatives and more.</p>
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]} type="flex" justify="center">
				<Col lg={12}>
					<Card>
						<h1>LIQUIDITY POOLS</h1>
						<p>The heart of the Spartan Protocol are its incentivised liquidity pools, driving on-market capital formation.
						The liquidity pools are facilitated by an automated-market-maker (AMM) algorithm with liquidity-sensitive fees.
						Liquidity-sensitive fees ensure the system can sense correct token purchasing power at all times, allowing scalable and risk-tolerant growth.</p>
					</Card>
				</Col>

				<Col lg={12}>
					<Card>
						<h1>SYNTHETIC TOKEN GENERATION</h1>
						<p>The Spartan Protocol allows the generation of synthetic assets, using price anchors offered by its own liquidity pools, collaterised by liquidity pool shares.
						Liquidity pool shares are on-market, value-stabilised and can be instantly liquidated.
						Liquidity-sensitive fees ensure positions taken up scale with the depth of available liquidity, preventing deleeraging spirals common to other systems.</p>
					</Card>
				</Col>

				<Col lg={12}>
					<Card>
						<h1>LENDING AND DERIVATIVES</h1>
						<p>Synthetic token minters are short the value of the token, and long the value of their collateral. By winding up their position, they can achieve leverage. The opposite is also true for those wishing to leverage long an token.
						Lending is possible using a system of fees and collaterised debt.
						Liquidations of unhealthy positions are done instantly via liquidity pools, ensuring the system is always safe.</p>
					</Card>
				</Col>

				<Col lg={12}>
					<Card>
						<h1>$SPARTA</h1>
						<p>A programmable incentive token with a reward stream.
						Initial supply of 100 million distributed to a minimum of 9000 members from 30 selected Binance Chain projects using Proof-of-Burn.
						Daily liquidity incentives beginning at 30% APY reducing over 10 years.
						Maximum supply of 300 million.</p>
					</Card>
				</Col>

				<Col lg={12}>
					<Card>
						<h1>PROJECT</h1>
						<p>The project is galvanized by the communities of former Binance Chain projects.
						Individual token holders destroy their previous assets to acquire $SPARTA.
						30 Binance Chain projects selected to participate.
						The project begins decentralised from Day 0; there is no official team and no treasury.
						The protocol is autonomous and does not need ongoing maintenance.</p>
						</Card>
				</Col>

				<Col lg={12}>
					<Card>
						<h1>BINANCE SMART CHAIN</h1>
						<p>The project is a directional bet on Binance Smart Chain. Do not acquire $SPARTA if you do not subscribe to this direction.
						Binance Smart Chain is an EVM-compatible delegated-PoS blockchain, with fast (3-sec) blocktimes, good developer support and sufficient decentralisation.
						The BEP2 token community is second only to the ERC-20 community, and all can be linked to Binance Smart Chain.
						This project may fail, despite best attempts. Know the risks.
						</p>
					</Card>
				</Col>

			</Row>
			<br/>


		</div>
	)
}

export default About
