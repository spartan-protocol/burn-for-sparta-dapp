import { Col, Row } from "antd"
import { Click, Colour } from "../components"
import React from "react"

import { SPARTA_ADDR, getExplorerURL } from '../../client/web3'

export const UsefulLinks = (props) => {
    return (
        <>
            <Row>
                <Col>
                  <Row>
                    <Click><a href={`${getExplorerURL()}token/${SPARTA_ADDR}`} rel="noopener noreferrer" title="Etherscan Link" target="_blank" style={{ color: Colour().gold, fontSize: 12 }}>SPARTAN CONTRACT &gt; &gt;</a></Click>
                  </Row>
                  <Row>
                    <Click><a href={`${getExplorerURL()}address/0x000000000000000000000000000000000000dead`} rel="noopener noreferrer" title="Etherscan Link" target="_blank" style={{ color: Colour().gold, fontSize: 12 }}>BURN ADDRESS &gt; &gt;</a></Click>
                  </Row>
                  <Row>
                    <Click><a href="https://youtu.be/7yS2rQMbrnA" rel="noopener noreferrer" title="Video Guide to Burn for SPARTA" target="_blank" style={{ color: Colour().gold, fontSize: 12 }}>Video guide to burning tokens for SPARTA</a></Click>
                  </Row>
                </Col>
            </Row>
            <br/><br/>
        </>
    )
}
