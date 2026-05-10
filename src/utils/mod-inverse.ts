// e · d ≡ 1 (mod m)    ⟺    e * d − 1 = k · m   for some integer k

/**
 * extended euclidean algorithm
 * @param a first bigint
 * @param b second bigint
 * @returns 
 */
function extendedEuclidean(a: bigint, b: bigint): { gcd: bigint; x: bigint; y: bigint } {
    let [oldR, r] = [a, b]
    let [oldX, x] = [1n, 0n]
    let [oldY, y] = [0n, 1n]

    while (r !== 0n) {
        const q = oldR / r
            ;[oldR, r] = [r, oldR - q * r]
            ;[oldX, x] = [x, oldX - q * x]
            ;[oldY, y] = [y, oldY - q * y]
    }

    return { gcd: oldR, x: oldX, y: oldY }
}

/**
 * mod inverse to solve ax ≡ 1 mod n, where a and n are known
 * @param a factor multiplying x 
 * @param n modulus
 * @returns 
 */
export function modInverse(a: bigint, n: bigint): bigint {
    const { gcd, x } = extendedEuclidean(a, n)
    if (gcd !== 1n) throw new Error('no inverse — a and n not coprime')
    return ((x % n) + n) % n
}