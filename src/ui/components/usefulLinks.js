import { Col, Row } from "antd"
import { Click, Colour } from "../components"
import React from "react"

import { SPARTA_ADDR, getExplorerURL } from '../../client/web3'

export const UsefulLinks = (props) => {
    return (
        <>
            <Row>
                <Col>
                    <Click><a href={`${getExplorerURL()}token/${SPARTA_ADDR}`} rel="noopener noreferrer" title="Etherscan Link" target="_blank" style={{ color: Colour().gold, fontSize: 12 }}>SPARTAN CONTRACT -></a></Click>
                </Col>
            </Row>
        </>
    )
}
