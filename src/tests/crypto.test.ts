import { expect, test, beforeAll } from "bun:test"
import type { PrivateKey } from "@/types/private-key"
import type { PublicKey } from "@/types/public-key"

import { generateKeyPairs } from "@/generate"
import { decrypt } from "@/decrypt"
import { encrypt } from "@/encrypt"

let publicKey: PublicKey
let privateKey: PrivateKey
let otherPrivateKey: PrivateKey
let sampleMessages: bigint[]

beforeAll(async () => {
    const keys = await generateKeyPairs()
    publicKey = keys.publicKey
    privateKey = keys.privateKey
    const otherKeys = await generateKeyPairs()
    otherPrivateKey = otherKeys.privateKey
    sampleMessages = [1n, 2n, 5n, 22n, 9500n, privateKey.n - 1n, privateKey.d - 1n]
})

test("round-trips: with correct key", () => {
    for (const message of sampleMessages) {
        const cipher = encrypt(message, publicKey)
        const decryptedMessage = decrypt(cipher, privateKey)
        expect(decryptedMessage).toBe(message)
    }
})

test("round-trips: with wrong key", () => {
    const messagesExludingOne = sampleMessages.filter((m) => { return m !== 1n })
    for (const message of messagesExludingOne) {
        const cipher = encrypt(message, publicKey)
        const decryptedMessage = decrypt(cipher, otherPrivateKey)
        expect(decryptedMessage).not.toBe(message)
    }
})



