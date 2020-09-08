import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Layout } from 'antd'
import 'antd/dist/antd.less'

import Header from './ui/layout/Header'
import Sidebar from './ui/layout/Sidebar'
import Overview from './ui/pages/Overview'
import Burn from './ui/pages/Burn'
import About from './ui/pages/About'
import DAO from './ui/pages/DAO'
import { Colour } from './ui/components'

import { ContextProvider } from './context'

import { BreakpointProvider } from 'react-socks'

const { Content } = Layout

const App = () => {

	return (
		<Router>
			<ContextProvider>
				<BreakpointProvider>
					<Header/>
					<main>
						<Sidebar />
						<Content style={{ background: Colour().dgrey, color: Colour().white}}>
							<div className="ant-wrapper">
								<Switch>
									<Route path="/" exact component={Overview} />
									<Route path="/overview" exact component={Overview} />
									<Route path="/burn" exact component={Burn} />
									<Route path="/dao" exact component={DAO} />
									<Route path="/about" exact component={About} />
								</Switch>
							</div>
						</Content>
					</main>
				</BreakpointProvider>
			</ContextProvider>
		</Router>
	);
}

export default App
