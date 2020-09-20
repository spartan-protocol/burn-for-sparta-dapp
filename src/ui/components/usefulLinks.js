import { Col, Row } from "antd"
import React from "react"

import { SPARTA_ADDR, getExplorerURL } from '../../client/web3'

export const UsefulLinks = (props) => {
    return (
        <>
                <Col>
                  <Row>
                    <div className='sparta-button'><a href={`${getExplorerURL()}token/${SPARTA_ADDR}`} rel="noopener noreferrer" title="Etherscan Link" target="_blank">Spartan Contract</a></div>
                  </Row>
                  <Row>
                    <div className='sparta-button'><a href={`${getExplorerURL()}address/0x000000000000000000000000000000000000dead`} rel="noopener noreferrer" title="Etherscan Link" target="_blank">Burn Address</a></div>
                  </Row>
                  <Row>
                    <div className='sparta-button'><a href="https://youtu.be/7yS2rQMbrnA" rel="noopener noreferrer" title="Video Guide to Burn for SPARTA" target="_blank">Burn Guide (YouTube)</a></div>
                  </Row>
                </Col>
        </>
    )
}
