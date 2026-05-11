import type { PublicKey } from "@/types/public-key"
import { modPow } from "@utils/mod-pow"
import { textToBigInt } from "@utils/text-converter"

export function encrypt(message: bigint, publicKey: PublicKey): bigint {
    const cipher = modPow(message, publicKey.e, publicKey.n) 
    return cipher
}

export function encryptText(message: string, publicKey: PublicKey): bigint {
    const cipher = encrypt(textToBigInt(message), publicKey)
    return cipher
}