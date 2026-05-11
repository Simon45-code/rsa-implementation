import type { PrivateKey } from "@/types/private-key";
import { modPow } from "@utils/mod-pow";
import { bigIntToText } from "@utils/text-converter";

export function decrypt(cipher: bigint, privateKey: PrivateKey): bigint {
    return modPow(cipher, privateKey.d, privateKey.n);
}
export function decryptText(cipher: bigint, privateKey: PrivateKey): string {
    const message =  decrypt(cipher, privateKey)
    return bigIntToText(message)
}