import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../context'
import { Row, Col, Layout, Drawer } from 'antd';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button } from '../components/elements'

import Web3 from 'web3'
import { message } from 'antd';

import WalletConnect from "@trustwallet/walletconnect";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";


import logo from '../../assets/spartan-logo-white.png';

import WalletDrawer from './WalletDrawer'
import { getAddressShort, } from '../../common/utils'
import {
    getAssets, getTokenDetails, getListedTokens,
    getWalletData, getStakesData, getListedPools
} from '../../client/web3'

const { Header } = Layout;

const Headbar = (props) => {

    const context = useContext(Context)
    const [connecting, setConnecting] = useState(false)
    const [connected, setConnected] = useState(false)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if(context.connectedBSC){
            connectWallet()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.connectedBSC])

    const connectWallet = async () => {
        setConnecting(true)
        window.web3 = new Web3(window.ethereum);
        const account = (await window.web3.eth.getAccounts())[0];
        if (account) {
            loadData(account)
            context.setContext({
                "wallet": {
                  "metamask": true,
                //   "address": account,
                  // "account": account,
            }})
        } else {
            await ethEnabled()
            setConnected(false)
        }
    }

    const loadData = async (account)  => {
        message.loading('Loading tokens', 3);
        let assetArray = context.assetArray ? context.assetArray : await getAssets()
        context.setContext({ 'assetArray': assetArray })
        // let assetDetailsArray = context.assetDetailsArray ? context.assetDetailsArray : await getTokenDetails(account, assetArray)
        // context.setContext({ 'assetDetailsArray': assetDetailsArray })

        let tokenArray = context.tokenArray ? context.tokenArray : await getListedTokens()
        context.setContext({ 'tokenArray': tokenArray })
        // context.setContext({ 'poolsData': await getPoolsData(tokenArray) })

        let allTokens = assetArray.concat(tokenArray)
        var sortedTokens = [...new Set(allTokens)].sort()

        let tokenDetailsArray = context.tokenDetailsArray ? context.tokenDetailsArray : await getTokenDetails(account, sortedTokens)
        context.setContext({ 'tokenDetailsArray': tokenDetailsArray })

        message.loading('Loading wallet data', 3);
        let walletData = await getWalletData(account, tokenDetailsArray)
        context.setContext({ 'walletData': walletData })

        let poolArray = context.poolArray ? context.poolArray : await getListedPools()
        context.setContext({ 'poolArray': poolArray })

        let stakesData = context.stakesData ? context.stakesData : await getStakesData(account, tokenArray)
        context.setContext({ 'stakesData': stakesData })

        context.setContext({ 'connected': true })
        await getSpartaPrice()
        setConnecting(false)
        setConnected(true)
        message.success('Loaded!', 2);
    }

    const ethEnabled = () => {
        console.log('connecting')
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            setConnecting(true)
            return true;
        }
        return false;
    }

    const walletConnect = async () => {
        const walletConnector = window.mywallet = new WalletConnect({
          bridge: "https://bridge.walletconnect.org" // Required
        });
    
        walletConnector.killSession()
    
        // Check if connection is already established
        if (!walletConnector.connected) {
          console.log("Creating session")
          // create new session
          walletConnector.createSession().then(() => {
            // get uri for QR Code modal
            const uri = walletConnector.uri;
            // display QR Code modal
            WalletConnectQRCodeModal.open(uri, () => {
              console.log("QR Code Modal closed");
            })
          })
        }
    
        // Subscribe to connection events
        walletConnector.on("connect", (error, payload) => {
          if (error) {
            throw error;
          }
    
          // Close QR Code Modal
          WalletConnectQRCodeModal.close();
    
          // Get provided accounts and chainId
          // const { accounts, chainId } = payload.params[0];
    
          walletConnector.getAccounts().then(result => {
            // Returns the accounts
            const account = result.find((account) => account.network === 60);
            console.log("ACCOUNT:", account)
            console.log("WALLET CONNECT ACCOUNTS RESULTS " + account.address);
            // console.log("ADDR:", crypto.decodeAddress(account.address))

            loadData(account.address)

            context.setContext({
              "wallet": {
                "walletconnect": walletConnector,
                // "address": account.address,
                // "account": account,
              }
            }, () => {
            //   props.history.push("/")
            })
          })
            .catch(error => {
              // Error returned when rejected
              console.error(error);
            })
        })
    
        walletConnector.on("session_update", (error, payload) => {
          if (error) {
            throw error;
          }
    
          // Get updated accounts and chainId
          // const { accounts, chainId } = payload.params[0];
        })
    
        walletConnector.on("disconnect", (error, payload) => {
          if (error) {
            throw error;
          }
    
          // Delete walletConnector
        //   context.forgetWallet()
        })
    
      }
    

    const getSpartaPrice = async () => {
        // let resp = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=spartan&vs_currencies=usd')
        // console.log(resp.data.spartan.usd)
        // context.setContext({ 'spartanPrice': resp.data.spartan.usd })
        context.setContext({ 'spartanPrice': 0.3 })
        return
    }

    const addr = () => {
        return getAddressShort(context.walletData?.address)
    }

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <Header>
            <Row>
                <Col xs={4}>
                    <img src={logo} alt="SpartanLogo" style={{width:200, height:'auto'}}/>
                </Col>
                <Col xs={16}>
                <Button type="primary" onClick={() => walletConnect()}>MOBILE</Button>
                </Col>
                <Col xs={4} style={{ textAlign: 'right' }}>
                    {!connected && !connecting &&
                        <Button type="primary" onClick={connectWallet}>CONNECT</Button>
                    }
                    {connecting &&
                        <Button type="primary" icon={<LoadingOutlined />}>CONNECTING</Button>
                    }
                    {connected &&
                        <Button type="primary" icon={<UserOutlined />} onClick={showDrawer}>{addr()}</Button>
                    }
                </Col>
            </Row>
            <Drawer
                title={context.walletData?.address}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={350}
            >
                <WalletDrawer />
            </Drawer>

        </Header>
    )
}

export default Headbar