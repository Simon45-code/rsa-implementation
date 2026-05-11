import { modPow } from "@utils/mod-pow";
import type { PublicKey } from "@/types/public-key";
import { bigIntToText } from "@utils/text-converter";

export function verify(message: bigint, signature: bigint, publicKey: PublicKey): boolean {
    const decryptedMessage = modPow(signature, publicKey.e, publicKey.n)
    if (decryptedMessage === message) return true
    return false
}

export function verifyText(message: string, signature: bigint, publicKey: PublicKey): string | undefined {
    const decryptedMessage = bigIntToText(modPow(signature, publicKey.e, publicKey.n))
    if (decryptedMessage === message) return decryptedMessage 
     return undefined
}

