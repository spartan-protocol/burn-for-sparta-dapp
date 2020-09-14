import BigNumber from 'bignumber.js'

export const one = 1 * 10 ** 18;
export const oneBN = new BigNumber(1 * 10 ** 18)

export function bn(number){
    return new BigNumber(number)
}

export function getBN(BN){
    return (new BigNumber(BN)).toFixed()
}

export function formatBN(BN, n = 2) {
    return BN.toFixed(n)
}

export function getBig(BN){
    return new BigNumber(BN)
}

export function BN2Str(BN) {
    return (new BigNumber(BN)).toFixed()
}

export const totalSupply = (new BigNumber(1000000*10**18)).toFixed(0)

// export function convertFromWei(number) {
//     const num = new BigNumber(number)
//     const final = num.div(10**18)
//     return final.toString()
// }

// export function convertToWei(number) {
//     const num = new BigNumber(number)
//     const final = num.multipliedBy(10**18)
//     return (final).toFixed(0)
// }

export function convertFromWei(number) {
    var num = new BigNumber(number)
    var final = num.div(10**18)
    return final.toFixed(2)
}

export function convertToWei(number) {
    var num = new BigNumber(number)
    var final = num.multipliedBy(10**18)
    return final
}

export function convertToDate(date) {
    return new Date(1000 * date).toLocaleDateString("en-GB", { year: 'numeric', month: 'short', day: 'numeric' })
}

export function currency(amount, minFractionDigits = 0, maxFractionDigits = 2, currency = 'USD', locales = 'en-US') {
    let symbol
    let cryptocurrency = false
    let options = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits
    }

    if (currency === 'BNB') {
        options = {
            style: 'decimal',
            minimumFractionDigits: minFractionDigits,
            maximumFractionDigits: maxFractionDigits
        }
        symbol = 'BNB'
        cryptocurrency = true
    }

    if (currency === 'SPARTA') {
        options = {
            style: 'decimal',
            minimumFractionDigits: minFractionDigits,
            maximumFractionDigits: maxFractionDigits
        }
        symbol = 'SPARTA'
        cryptocurrency = true
    }

    if (currency === 'NONE') {
        options = {
            style: 'decimal',
            minimumFractionDigits: minFractionDigits,
            maximumFractionDigits: maxFractionDigits
        }
        symbol = ''
        cryptocurrency = true
    }

    const currencyValue = new Intl.NumberFormat(locales, options)

    return (cryptocurrency ? `${currencyValue.format(amount)}${String.fromCharCode(160)}${symbol}` : currencyValue.format(amount))
}

export function formatWei(amount, minFractionDigits = 0, maxFractionDigits = 2, locales = 'en-US') {
    let options = {
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits
    }

    const currencyValue = new Intl.NumberFormat(locales, options)

    return (`${currencyValue.format(convertFromWei(amount))}`)
}

export function convertToTime(date) {
    return new Date(1000 * date).toLocaleTimeString("en-gb")
}

export function convertToMonth(date_) {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const date = new Date(1000 * date_)
    return (date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear())
}

export function getSecondsToGo(date) {
    const time = (Date.now() / 1000).toFixed()
    return ((date - time))
}

export const getAddressShort = (address) => {
    const addr = address ? address : '0x000000000000000'
    const addrShort = addr.substring(0,5) + '...' + addr?.substring(addr.length-3, addr.length)
    return addrShort
}

export const formatAPY = (input) =>{
    const annual = (input - (10000*365))/100
    return `${annual}%`
}

export const formatUSD = (input, price) => {
    const value = input ? (bn(input).times( price )).toNumber() : 0
    return `$${(value.toLocaleString())}`
}

export const rainbowStop = (h) => {
    const f = (n, k = (n + h * 12) % 12) => 0.5 - 0.5 * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return rgb2hex(Math.floor(f(0) * 255), Math.floor(f(8) * 255), Math.floor(f(4) * 255))
  }
  
  export const rgb2hex = (r, g, b) =>
    `#${((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')}`
  
  export const getIntFromName = (str) => {
    const inputStr = String(str).toUpperCase()
    const div = 22
    const firstInt = (inputStr.charCodeAt(0) - 'A'.charCodeAt(0)) / div
    const secondInt = inputStr.length > 1 ? (inputStr.charCodeAt(1) - 'A'.charCodeAt(0)) / div : 0
    return [Number(firstInt.toFixed(2)), Number(secondInt.toFixed(2))]
  }

