import React from 'react'
import { Row, Col } from 'antd'
import { Colour, Click, Text } from '../components'

const Card = (props) => {

    const cardStyles = {
        borderWidth: '1px',
        borderRadius: 6,
        padding: 20,
        backgroundColor: Colour().black
    }

    return (
        <>
            <Row>
                <Col xs={24} style={cardStyles}>
                    <Click size={18}><a href={window.location.origin + props.link} rel="noopener noreferrer" title={props.title} style={{ color: Colour().gold}}>{props.title}&nbsp;>></a></Click>
                    <br />
                    <Text size={16}>{props.subtitle}</Text>
                    <br />
                </Col>
            </Row>
        </>
    )
}

export const QuickNavCards = () => {

    const cardContent = () => {
        return [
            {
                title: 'BURN',
                subtitle: 'Acquire Spartan by burning BEP2 tokens.',
                link: "/acquire"
            },
            {
                title: 'STAKE',
                subtitle: 'Stake Sparta to earn trading fees.',
                link: "/stake"
            },
            {
                title: 'TRADE',
                subtitle: 'Buy or sell Sparta',
                link: "/trade"
            },
            {
                title: 'EARN',
                subtitle: 'Lock in the Spartan DAO to earn incentives',
                link: "/earn"
            }
         ]
    }

    const cardStyles = {
        marginTop: 10,
        // marginLeft:20,
        padding: 10,
    }

    return (
        <>
            <Row id="SpartanEcosystemCards0">
                <Col style={cardStyles} xs={12}>
                    <Card title={cardContent()[0].title}
                        subtitle={cardContent()[0].subtitle}
                        link={cardContent()[0].link} />
                </Col>
                <Col style={cardStyles} xs={12}>
                    <Card title={cardContent()[1].title}
                        subtitle={cardContent()[1].subtitle}
                        link={cardContent()[1].link} />
                </Col>
            </Row>
            <Row id="SpartanEcosystemCards1">
                <Col style={cardStyles} xs={12}>
                    <Card title={cardContent()[2].title}
                        subtitle={cardContent()[2].subtitle}
                        link={cardContent()[2].link} />
                </Col>
                <Col style={cardStyles} xs={12}>
                    <Card title={cardContent()[3].title}
                        subtitle={cardContent()[3].subtitle}
                        link={cardContent()[3].link} />
                </Col>
            </Row>
        </>
    )
}
