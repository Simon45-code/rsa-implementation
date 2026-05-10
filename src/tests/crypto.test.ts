import { expect, test } from "bun:test"
import { generateKeyPairs } from "@/generate"
import { decrypt } from "@/decrypt"
import { encrypt } from "@/encrypt"

const { publicKey, privateKey } = await generateKeyPairs()
const { privateKey: otherPrivateKey } = await generateKeyPairs();

const sampleMessages = [1n, 2n, 5n, 22n, 9500n, privateKey.n - 1n, privateKey.d - 1n]

test("Encryption/Decryption with Correct Key", async () => {
    for (const message of sampleMessages) {
        const cipher = encrypt(message, publicKey)
        const decryptedMessage = decrypt(cipher, privateKey)
        expect(decryptedMessage).toBe(message)
    }
})

test("Encryption/Decryption with Wrong Key", async () => {
    const messagesExludingOne = sampleMessages.filter((m) => {m !== 1n})
    for (const message of messagesExludingOne) {
        const cipher = encrypt(message, publicKey)
        const decryptedMessage = decrypt(cipher, otherPrivateKey)
        expect(decryptedMessage).not.toBe(message)
    }
})

