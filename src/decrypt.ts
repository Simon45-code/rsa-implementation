import type { PrivateKey } from "@/types/private-key";
import { modPow } from "@utils/mod-pow";

export function decrypt(cipher: bigint, privateKey: PrivateKey): bigint {
    return modPow(cipher, privateKey.d, privateKey.n);
}