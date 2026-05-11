import { expect, test, beforeAll } from "bun:test"
import type { PrivateKey } from "@/types/private-key"
import type { PublicKey } from "@/types/public-key"

import { generateKeyPairs } from "@/generate"
import { decrypt, decryptText } from "@/decrypt"
import { encrypt, encryptText } from "@/encrypt"

import { sampleTextMessages } from "./data"

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
    sampleMessages = [1n, 2n, 5n, 22n, 9500n, privateKey.n - 1n, publicKey.n / 2n, publicKey.n / 3n]
})

test("round-trips: numbers with correct key", () => {
    for (const message of sampleMessages) {
        const cipher = encrypt(message, publicKey)
        const decryptedMessage = decrypt(cipher, privateKey)
        expect(decryptedMessage).toBe(message)
    }
})

test("round-trips: numbers with wrong key", () => {
    const messagesExcludingOne = sampleMessages.filter((m) => { return m !== 1n })
    for (const message of messagesExcludingOne) {
        const cipher = encrypt(message, publicKey)
        const decryptedMessage = decrypt(cipher, otherPrivateKey)
        expect(decryptedMessage).not.toBe(message)
    }
})

test("round-trips: text with correct key", () => {
    for (const message of sampleTextMessages) {
        const cipher = encryptText(message, publicKey)
        const decryptedMessage = decryptText(cipher, privateKey)
        expect(decryptedMessage).toBe(message)
    }
})

test("round-trips: text with wrong key", () => {
    for (const message of sampleTextMessages) {
        const cipher = encryptText(message, publicKey)
        const decryptedMessage = decryptText(cipher, otherPrivateKey)
        expect(decryptedMessage).not.toBe(message)
    }
})