import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Layout } from 'antd'
import 'antd/dist/antd.less'

import { Colour } from './ui/components'
import { ContextProvider } from './context'
import { BreakpointProvider } from 'react-socks'

import Header from './ui/layout/Header'
import Sidebar from './ui/layout/Sidebar'
import Overview from './ui/pages/Overview'
import Burn from './ui/pages/Burn'
import About from './ui/pages/About'
import DAO from './ui/pages/DAO'
import Help from './ui/pages/Help'
import Allocations from './ui/pages/Allocations'


const { Content } = Layout

const App = () => {

	return (
		<Router>
			<ContextProvider>
				<BreakpointProvider>
					<Header/>
					<main>
						<Content style={{ background: Colour().dgrey, color: Colour().white}}>
						<Sidebar />
							<div className="ant-wrapper">
								<Switch>
									<Route path="/" exact component={Overview} />
									<Route path="/overview" exact component={Overview} />
									{/*
									<Route path="/burn" exact component={Burn} />
									<Route path="/allocations" exact component={Allocations} />
									*/}
									<Route path="/help" exact component={Help} />
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
