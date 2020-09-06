import React, { useEffect, useState } from 'react'

import { LabelGrey } from '../components'
import { BurnTable } from '../components/burnTable'
import { AllocationTable } from '../components/allocationTable'

import '../../App.less'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const Burn = () => {

	const [safari, setSafari] = useState(null)
	const [tab, setTab] = useState('1')
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		setSafari(isSafari)
		let pathname = window.location.pathname.split("/")[1]
		if (pathname === 'claim' && !loaded) {
			setLoaded(true)
			setTab('2')
		}
		// eslint-disable-next-line
	}, [])

	const onChange = key => {
		setTab(key)
	}

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
					{!safari &&
						<>
							<BurnTable/>
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
							<AllocationTable/>
						</>
					}
				</TabPane>
			</Tabs>
		</>
	)
}
export default Burn
