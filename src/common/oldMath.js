import { bn } from './utils'

export const getStakeUnits = (stake, pool) => {
    // formula: ((V + T) (v T + V t))/(4 V T)
    // part1 * (part2 + part3) / denominator
    const v = bn(stake.baseAmt)
    const t = bn(stake.tokenAmt)
    const V = bn(pool.baseAmt).plus(v) // Must add r first
    const T = bn(pool.tokenAmt).plus(t) // Must add t first
    const part1 = V.plus(T)
    const part2 = v.times(T)
    const part3 = V.times(t)
    const numerator = part1.times(part2.plus(part3))
    const denominator = V.times(T).times(4)
    const result = numerator.div(denominator)
    return result
}

export const getSwapSlip = (inputAmount, pool, toBase) => {
    // formula: (x) / (x + X)
    const x = bn(inputAmount)
    const X = toBase ? bn(pool.tokenAmt) : bn(pool.baseAmt) // input is token if toBase
    const result = x.div(x.plus(X))
    return result
}

export const getSwapOutput = (inputAmount, pool, toBase) => {
    // formula: (x * X * Y) / (x + X) ^ 2
    const x = bn(inputAmount)
    const X = toBase ? bn(pool.tokenAmt) : bn(pool.baseAmt) // input is token if toBase
    const Y = toBase ? bn(pool.baseAmt) : bn(pool.tokenAmt) // output is baseAmt if toBase
    const numerator = x.times(X).times(Y)
    const denominator = x.plus(X).pow(2)
    const result = numerator.div(denominator)
    return result
}

export const getSwapInput = (toBase, pool, outputAmount) => {
    // formula: (((X*Y)/y - 2*X) - sqrt(((X*Y)/y - 2*X)^2 - 4*X^2))/2
    // (part1 - sqrt(part1 - part2))/2
    const X = toBase ? bn(pool.tokenAmt) : bn(pool.baseAmt) // input is token if toBase
    const Y = toBase ? bn(pool.baseAmt) : bn(pool.tokenAmt) // output is base if toBase
    const y = bn(outputAmount)
    const part1 = X.times(Y).div(y).minus(X.times(2))
    const part2 = X.pow(2).times(4)
    const result = part1.minus(part1.pow(2).minus(part2).sqrt()).div(2)
    return result
}