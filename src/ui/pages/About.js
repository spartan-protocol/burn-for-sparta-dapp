import React from 'react'

import { Row, Col } from 'antd'
import { UsefulLinks } from '../components/usefulLinks'

import '../../App.less'

const About = (props) => {

	return (
		<div>
			<Row>
				<Col xs={24}>
					<h1>SPARTAN PROTOCOL</h1>

					<h2> A PROTOCOL FOR INCENTIVISED LIQUIDITY AND SYNTHETIC ASSETS ON BINANCE SMART CHAIN </h2>

					<p>The Spartan Protocol incentivises the formation of capital in liquidity pools, such that they can be used for synthetic token generation, lending, derivatives and more.</p>

					<h2>LIQUIDITY POOLS</h2>
					<p>The heart of the Spartan Protocol are its incentivised liquidity pools, driving on-market capital formation.

					The liquidity pools are facilitated by an automated-market-maker (AMM) algorithm with liquidity-sensitive fees.

Liquidity-sensitive fees ensure the system can sense correct token purchasing power at all times, allowing scalable and risk-tolerant growth.</p>

					

					<h2>SYNTHETIC TOKEN GENERATION</h2>
					<p>The Spartan Protocol allows the generation of synthetic assets, using price anchors offered by its own liquidity pools, collaterised by liquidity pool shares.

Liquidity pool shares are on-market, value-stabilised and can be instantly liquidated.

Liquidity-sensitive fees ensure positions taken up scale with the depth of available liquidity, preventing deleveraging spirals common to other systems.</p>

					<h2>LENDING AND DERIVATIVES</h2>
					<p>Synthetic token minters are short the value of the token, and long the value of their collateral. By winding up their position, they can achieve leverage. The opposite is also true for those wishing to leverage long an token.

Lending is possible using a system of fees and collaterised debt.

Liquidations of unhealthy positions are done instantly via liquidity pools, ensuring the system is always safe.</p>

					<h2>$SPARTA</h2>
					<p>A programmable incentive token with a reward stream.
Initial supply of 100 million distributed to a minimum of 9000 members from 30 selected Binance Chain projects using Proof-of-Burn.
Daily liquidity incentives beginning at 30% APY reducing over 10 years.
Maximum supply of 300 million.</p>

					<h2>PROJECT</h2>
					<p>The project is galvanized by the communities of former Binance Chain projects.
Individual token holders destroy their previous assets to acquire $SPARTA.
30 Binance Chain projects selected to participate.
The project begins decentralised from Day 0; there is no official team and no treasury.
The protocol is autonomous and does not need ongoing maintenance.</p>

					<h2>BINANCE SMART CHAIN</h2>
					<p>The project is a directional bet on Binance Smart Chain. Do not acquire $SPARTA if you do not subscribe to this direction.
Binance Smart Chain is an EVM-compatible delegated-PoS blockchain, with fast (3-sec) blocktimes, good developer support and sufficient decentralisation.
The BEP2 token community is second only to the ERC-20 community, and all can be linked to Binance Smart Chain.
This project may fail, despite best attempts. Know the risks.
</p>

				</Col>
			</Row>
			<br/>
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

export default About
