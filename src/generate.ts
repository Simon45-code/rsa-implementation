import { generatePrime } from "node:crypto"
import { modInverse } from "@/utils/mod-inverse"
import type { PublicKey } from "@/types/public-key"
import type { PrivateKey } from "@/types/private-key"

async function generatePrimeAsync(bits: number): Promise<bigint> {
    return await new Promise<bigint>((resolve, reject) =>
        generatePrime(bits, { bigint: true }, (e, p) => e ? reject(e) : resolve(p as bigint))
    )
}

export async function generateKeyPairs(): Promise<{ publicKey: PublicKey, privateKey: PrivateKey }> {
    const e = 65537n
    const bits = 1024
    const [p, q] = await Promise.all([
        generatePrimeAsync(bits),
        generatePrimeAsync(bits),
    ])

    const n = p * q

    const etf = (p - 1n) * (q - 1n)

    const d = modInverse(e, etf)

    const publicKey = { n, e}
    const privateKey = { n, d}
    return { publicKey, privateKey }
}

