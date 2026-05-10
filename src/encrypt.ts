import type { PublicKey } from "@/types/public-key"
import { modPow } from "./utils/mod-pow"

export function encrypt(message: bigint, publicKey: PublicKey): bigint {
    const cipher = modPow(message, publicKey.e, publicKey.n) 
    return cipher
}