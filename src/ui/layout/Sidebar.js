import React, { useState, useEffect } from 'react'
import { Row, Menu, Layout } from 'antd'

import logo from '../../assets/spartan-protocol-logo.png';

import { MediumOutlined } from '@ant-design/icons'
import { Icon } from '../components'
import GithubIcon from '../../assets/github.svg'
import TelegramIcon from '../../assets/telegram.svg'

const { Sider } = Layout

const Sidebar = (props) => {

  const [page, setPage] = useState(null)
  const menu_items = [
    "overview",
    "burn",
    "allocations",
    // "stake",
    // "trade",
    "help",
    "about"
  ]

    useEffect(() => {
      let pathname = window.location.pathname.split("/")[1]
      if(!pathname){
        setPage("overview")
      }
      if (menu_items.includes(pathname)) {
        setPage(pathname)
      }
    }, [menu_items])

return (
  <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo">
        <a href="/"><img src={logo} alt="SpartanLogo" style={{display:'block', width:'70%', height:'auto', margin:'auto', marginBottom:20}}/></a>
      </div>
      <hr style={{ width: '100%', margin: '0.9rem 0 1.2rem' }} />
      <Menu theme="dark" mode="inline" selectedKeys={[page]}>
        <Menu.Item key="overview">
          <a href="/overview"><Icon icon="overview"></Icon>Overview</a>
        </Menu.Item>
        <Menu.Item key="burn">
          <a href="/burn"><Icon icon="burn"></Icon>Burn</a>
        </Menu.Item>
        <Menu.Item key="allocations">
          <a href="/allocations"><Icon icon="allocations"></Icon>Allocations</a>
        </Menu.Item>
        <Menu.Item key="help">
          <a href="/help"><Icon icon="help"></Icon>Help</a>
        </Menu.Item>
        <Menu.Item key="about">
          <a href="/about"><Icon icon="about"></Icon>About</a>
        </Menu.Item>
      </Menu>
      <Row className="sidebar-footer" type="flex" span={24} style={{ width: '100%', justifyContent: 'left', paddingBottom: '14px' }}>
        <hr style={{ width: '100%', margin: '0.9rem 0 1.2rem' }} />
        <ul style={{ listStyle: 'none', display: 'inline-flex', marginLeft:20 }}>
            <li style={{ margin: '5px'}}>
              <a href="https://t.me/SpartanProtocolOrg" rel="noopener noreferrer" target="_blank">
                <img src={TelegramIcon} alt="Spartan Telegram Group Logo" style={{ maxHeight: '16px' }}/>
              </a>
            </li>
            <li style={{ margin: '5px'}}>
              <a href="https://medium.com/@spartanprotocol" rel="noopener noreferrer" target="_blank">
                <MediumOutlined style={{ margin: '5px 0 0 0', color: '#fff' }}/>
              </a>
            </li>
            <li style={{ margin: '5px'}}>
              <a href="https://github.com/spartan-protocol" rel="noopener noreferrer" target="_blank">
                <img src={GithubIcon} alt="Spartanasset Github Logo" style={{ maxHeight: '16px' }}/>
              </a>
            </li>
        </ul>
        </Row>
    </Sider>
    </Layout>
  );
}

export default Sidebar
