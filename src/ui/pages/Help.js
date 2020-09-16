import '../../App.less'
import { Card, Row, Col } from 'antd'

const Help = () => {

	return (
		<>
			<Card>
				<h1 style={{ fontSize: 48}}>HELP</h1>
				<h2>TROUBLESHOOTING TECHNICAL ISSUES</h2>
			</Card>

			<Row gutter={[16, 16]} type="flex" justify="center">
				<Col lg={7}>
					<Card>
						<h1>Tokens missing on MetaMask?</h1>
						<p>Don't worry! You probably have not yet added your custom token.</p>
						<p>Click on MetaMask. Click on assets. Scroll down. Click 'Add Token'.</p>
						<p>Click 'Custom Token' then add the correct token address (look on BSCScan.com)</p>
					</Card>
				</Col>

				<Col lg={7}>
					<Card>
						<h1>Wallet stuck on connecting!</h1>
						<p>If you are using Brave browser, please disable shields for this website.</p>
						<p>Refresh the page and ensure MetaMask has been allowed the access the website.</p>
						<p>Ensure it says "connected" in MetaMask, if not then you need to allow the wallet's connection to the website.</p>
					</Card>
				</Col>

				<Col lg={7}>
					<Card>
						<h1>Stuck transaction in MetaMask?</h1>
						<p>Simply click on the MetaMask extension, then click on the network selection box up the top and change it to "Main Ethereum Network".</p>
						<p>Then change it back to "BSC Mainnet". The transaction will now fail, no fees will be charged and your queue will be cleared.</p>
					</Card>
				</Col>

				<Col lg={20}>
					<Card>
						<h1>Ledger connection issues?</h1>
						<p>Ensure your Ledger has the latest firmware update & all apps are up to date.</p>
						<p>After updating apps, make sure 'contract data' is enabled in the ETH app, this reverts when you update apps!</p>
						<p>Make sure the ETH app is open and your Ledger is unlocked just before you action the MetaMask submit button.</p>
						<p>Try different USB cable & a different USB port.</p>
						<p>Try different browser (if you are using Brave, try chrome or vice versa)</p>
						<p>Try an older portable release Chrome-forked browser failing that.</p>
						<p>Even if your Ledger works normally elsewhere, you may have to do some or all of the above.</p>
						<p>LEDGERS ARE EXTREMELY PICKY!</p>
					</Card>
				</Col>

			</Row>

			<br/><br/>

		</>
	)
}
export default Help
