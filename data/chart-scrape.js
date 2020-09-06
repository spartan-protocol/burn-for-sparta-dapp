require('dotenv').config()
const ethers = require('ethers');
const Spartan = require('./Spartan.js')
const BigNumber = require('bignumber.js')
const fs = require('fs')
const axios = require('axios')

function BN2Int(BN){return(((new BigNumber(BN)).toFixed()/10**18).toFixed(2))}

const newArray1 = async () => {

    const provider = ethers.getDefaultProvider();
    const contract = new ethers.Contract(Spartan.addr(), Spartan.abi(), provider)
    const currentEra = 1
    const emission = 2048
    const currentDay = await contract.currentDay()
    var dayArray = []
    var burntArray = []
    var unclaimedArray = []
    var emissionArray = []
    var totals = 0
    var totalsArray = []
    var SpartanEmitted = 0
    var SpartanArray = []
    var SpartanClaimed = 0
    var claimedArray = []
    for (var i = 1; i <= currentEra; i++) {
        for (var j = 1; j < currentDay; j++) {
            const burntForDay = BN2Int(await contract.mapEraDay_Units(i, j))
            // const unclaimedUnits = BN2Int(await contract.mapEraDay_UnitsRemaining(i, j))
            //const emissionForDay = BN2Int(await contract.mapEraDay_Emission(i, j))
            const unclaimedEmission = BN2Int(await contract.mapEraDay_EmissionRemaining(i, j))
            // const claimRate = (((burntForDay - unclaimedUnits) / burntForDay)*100).toFixed(2)
            totals += +burntForDay
            SpartanEmitted += emission
            SpartanClaimed += emission - +unclaimedEmission
            dayArray.push(j)
            burntArray.push(burntForDay)
            unclaimedArray.push(unclaimedEmission)
            emissionArray.push(emission)
            totalsArray.push(totals)
            SpartanArray.push(SpartanEmitted)
            claimedArray.push(SpartanClaimed)
            // console.log(claimedArray)
        }
    }
    const claimObject = {
        days: dayArray,
        burns: burntArray,
        unclaims: unclaimedArray,
        emission: emissionArray,
        totals: totalsArray,
        claims: claimedArray,
        Spartan: SpartanArray
    }
    await fs.writeFileSync('./src/data/claimArray.json', JSON.stringify(claimObject, null,4), 'utf8')
    console.log(claimObject)
}

const newArray2 = async () => {

    const provider = ethers.getDefaultProvider();
    const contract = new ethers.Contract(Spartan.addr2(), Spartan.abi(), provider)
    const currentEra = 1
    const emission = 2048
    const currentDay = await contract.currentDay()
    var dayArray = []
    var burntArray = []
    var unclaimedArray = []
    var emissionArray = []
    var totals = 0
    var totalsArray = []
    var SpartanEmitted = 0
    var SpartanArray = []
    var SpartanClaimed = 0
    var claimedArray = []
    for (var i = 1; i <= currentEra; i++) {
        for (var j = 0; j < currentDay; j++) {
            const burntForDay = BN2Int(await contract.mapEraDay_Units(i, j))
            // const unclaimedUnits = BN2Int(await contract.mapEraDay_UnitsRemaining(i, j))
            //const emissionForDay = BN2Int(await contract.mapEraDay_Emission(i, j))
            const unclaimedEmission = BN2Int(await contract.mapEraDay_EmissionRemaining(i, j))
            // const claimRate = (((burntForDay - unclaimedUnits) / burntForDay)*100).toFixed(2)
            totals += +burntForDay
            SpartanEmitted += emission
            SpartanClaimed += emission - +unclaimedEmission
            dayArray.push(j)
            burntArray.push(burntForDay)
            unclaimedArray.push(unclaimedEmission)
            emissionArray.push(emission)
            totalsArray.push(totals)
            SpartanArray.push(SpartanEmitted)
            claimedArray.push(SpartanClaimed)
            console.log(j, burntForDay)
        }
    }
    const claimObject = {
        days: dayArray,
        burns: burntArray,
        unclaims: unclaimedArray,
        emission: emissionArray,
        totals: totalsArray,
        claims: claimedArray,
        Spartan: SpartanArray
    }
    await fs.writeFileSync('./src/data/claimArray.json', JSON.stringify(claimObject, null,4), 'utf8')
    console.log(claimObject)
}

const refreshArray = async () => {

    const existingArray = JSON.parse(fs.readFileSync('./src/data/claimArray.json', 'utf8'))
    console.log(existingArray)

    const provider = ethers.getDefaultProvider();
    const contract = new ethers.Contract(Spartan.addr(), Spartan.abi(), provider)
    const currentEra = 1
    const emission = 2048
    const currentDay = await contract.currentDay()
    var dayArray = existingArray.days
    var burntArray = existingArray.burns
    var unclaimedArray = []
    var emissionArray = existingArray.emission
    var totals = 0
    var totalsArray = existingArray.totals
    var SpartanEmitted = 0
    var SpartanArray = existingArray.Spartan
    var SpartanClaimed = 0
    var claimedArray = []
    for (var i = 1; i <= currentEra; i++) {
        for (var j = 1; j < currentDay; j++) {
            // const unclaimedUnits = BN2Int(await contract.mapEraDay_UnitsRemaining(i, j))
            //const emissionForDay = BN2Int(await contract.mapEraDay_Emission(i, j))
            const unclaimedEmission = BN2Int(await contract.mapEraDay_EmissionRemaining(i, j))
            unclaimedArray.push(unclaimedEmission)
            SpartanClaimed += emission - +unclaimedEmission
            claimedArray.push(SpartanClaimed)  
            console.log(j, existingArray.days.length)
            if(j>existingArray.days.length){
                dayArray.push(j)
                const burntForDay = BN2Int(await contract.mapEraDay_Units(i, j))
                burntArray.push(burntForDay)
                emissionArray.push(emission)
                totals = +totalsArray[j-2] + +burntForDay
                totalsArray.push(totals)
                SpartanEmitted = +SpartanArray[j-2] + emission
                SpartanArray.push(SpartanEmitted)
            }
            // console.log(claimedArray)
        }
    }
    const claimObject = {
        days: dayArray,
        burns: burntArray,
        unclaims: unclaimedArray,
        emission: emissionArray,
        totals: totalsArray,
        claims: claimedArray,
        Spartan: SpartanArray
    }
    await fs.writeFileSync('./src/data/claimArray.json', JSON.stringify(claimObject, null,4), 'utf8')
    // console.log(claimObject)
}

const main = async () => {
    newArray2()
    // refreshArray()
}

main()
