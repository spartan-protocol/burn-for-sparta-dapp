import React from 'react'
import icon from '../../assets/spartan-coin.png'
// import coin from '../../assets/coins/sparta.png'

export const Logo = () => {
    return (
        <img src={icon} alt="Spartan-icon" height={100} style={{ marginLeft: 40, marginRight: 40 }} />
    )
}

export const Coin = (props) => {
    const imgStyles = {
        heigh: 100,
        marginLeft: 40,
        marginRight: 40
      }
    return (
        <img src={`../../assets/coins/${(props.symbol).toLowerCase()}.png`}  alt={`${(props.symbol).toLowerCase()}-icon`} style={imgStyles}   />
    )
}

