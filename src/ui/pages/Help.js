import React, { useState } from 'react'

import '../../App.less'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const Help = () => {

	const [tab, setTab] = useState('1')

	const onChange = key => {
		setTab(key)
	}

	return (
		<>
			<Tabs defaultActiveKey='1' activeKey={tab} onChange={onChange} size={'large'} style={{ marginTop: 0, textAlign: "center" }}>

				<TabPane tab="TOKENS MISSING?" key="1" style={{ textAlign: "left" }}>
				<h1>Are Your Tokens Missing on MetaMask?</h1>
				<ul>
					<li>Don't worry! You probably have not yet added your custom token.</li>
					<li>- Click on MetaMask</li>
					<li>- Click on assets</li>
					<li>- Scroll down</li>
					<li>- Click 'Add Token'</li>
					<li>- Click 'Custom Token' then add the correct token address (look on BSCScan.com)</li>
				</ul>
				</TabPane>

				<TabPane tab="TROUBLESHOOTING" key="2" style={{ textAlign: "left" }}>
				<h1>Stuck on connecting!</h1>
				<ul>
					<li>If you are using Brave browser, please disable shields for this website.</li>
					<li>Refresh the page and ensure MetaMask has allowed the website.</li>
					<li>Ensure it says "connected" in MetaMask, if not then you need to allow the wallet connection to the website.</li>
				</ul>

					<h1>Stuck pending transaction in MetaMask!</h1>
					<ul>
						<li>Simply click on the MetaMask extension, then click on the network selection box up the top and change it to "Main Ethereum Network".</li>
						<li>Then change it back to "BSC Mainnet". The transaction will now fail, no fees will be charged and your queue will be cleared.</li>
					</ul>

					<h1>Ledger connection issues!</h1>
					<ul>
						<li>Ensure your Ledger has the latest firmware update.</li>
						<li>Ensure all Ledger apps are up to date.</li>
						<li>After updating apps, make sure 'contract data' is enabled in the ETH app, this reverts when you update apps!</li>
						<li>Make sure the ETH app is open and your Ledger is unlocked just before you action the MetaMask submit button.</li>
						<li>Try different USB cable.</li>
						<li>Try different USB port.</li>
						<li>Try different browser (if you are using Brave, try chrome or vice versa)</li>
						<li>Try an older portable release Chrome-forked browser failing that.</li>
						<li>Even if your Ledger works normally elsewhere, you may have to do some or all of the above.</li>
						<li>LEDGERS ARE EXTREMELY PICKY!</li>
					</ul>
					<h1>Reach out on telegram for assistance ONLY after you have tried all of the above!</h1>
				</TabPane>

			</Tabs>
			<br/><br/>

		</>
	)
}
export default Help

