// ed ≡ 1 (mod m) ⟺ ed − 1 = km   for some integer k

/**
 * Extended Euclidean Algorithm.
 *
 * Computes gcd(a, n) for two bigints along with Bézout coefficients x and y
 * such that ax + ny = gcd(a, n).
 *
 * @param a first bigint
 * @param n second bigint
 * @returns an object containing:
 *   - `gcd`: the greatest common divisor of `a` and `n`
 *   - `x`: Bézout coefficient for `a`
 *   - `y`: Bézout coefficient for `n`
 */
function extendedEuclidean(a: bigint, n: bigint): { gcd: bigint; x: bigint; y: bigint } {
    let [oldR, r] = [a, n]
    let [oldX, x] = [1n, 0n]
    let [oldY, y] = [0n, 1n]

    while (r !== 0n) {
        const q = oldR / r;
            [oldR, r] = [r, oldR - q * r];
            [oldX, x] = [x, oldX - q * x];
            [oldY, y] = [y, oldY - q * y];
    }

    return { gcd: oldR, x: oldX, y: oldY }
}

/**
 * Computes the modular inverse of a modulo n.
 * That is, finds x such that ax ≡ 1 (mod n).
 * @param a factor multiplying x 
 * @param n modulus
 * @returns the modular inverse x in the range [0, n), such that (ax) % n === 1n
 * @throws if a and n are not coprime
 */
export function modInverse(a: bigint, n: bigint): bigint {
    const { gcd, x } = extendedEuclidean(a, n)
    if (gcd !== 1n) throw new Error('no inverse — a and n not coprime')
    return ((x % n) + n) % n
}