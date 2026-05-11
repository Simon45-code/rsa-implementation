import type { PrivateKey } from "@/types/private-key";
import { modPow } from "@utils/mod-pow";
import { textToBigInt } from "@utils/text-converter";

export function sign(message: bigint, privateKey: PrivateKey): bigint {
    return modPow(message, privateKey.d, privateKey.n)
}

export function signText(message: string, privateKey: PrivateKey): bigint {
    return modPow(textToBigInt(message), privateKey.d, privateKey.n)
}