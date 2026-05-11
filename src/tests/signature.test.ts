import { test, expect } from "bun:test"
import { signText } from "@/sign"
import { verifyText } from "@/verify"
import { generateKeyPairs } from "@/generate"

test("verifyText returns undefined when signature was made with a different private key", async () => {
  const { publicKey } = await generateKeyPairs()
  const { privateKey: otherPrivateKey } = await generateKeyPairs()

  const message = "Send $100"
  const signature = signText(message, otherPrivateKey)

  const result = verifyText(message, signature, publicKey)

  expect(result).toBeUndefined()
})

test("verifyText returns undefined when the message has been tampered with", async () => {
  const { publicKey, privateKey } = await generateKeyPairs()

  const signature = signText("Send $100", privateKey)
  const tamperedMessage = "Send $100,000"

  const result = verifyText(tamperedMessage, signature, publicKey)

  expect(result).toBeUndefined()
})

test("verifyText returns undefined when verifying with the wrong public key", async () => {
  const { privateKey } = await generateKeyPairs()
  const { publicKey: unrelatedPublicKey } = await generateKeyPairs()

  const message = "Send $100"
  const signature = signText(message, privateKey)

  const result = verifyText(message, signature, unrelatedPublicKey)

  expect(result).toBeUndefined()
})

test("verifyText returns undefined when the signature is for a different message", async () => {
  const { publicKey, privateKey } = await generateKeyPairs()

  const signatureForOtherMessage = signText("Send $100,000", privateKey)

  const result = verifyText("Send $100", signatureForOtherMessage, publicKey)

  expect(result).toBeUndefined()
})

test("verifyText returns the original message on a valid signature (sanity check)", async () => {
  const { publicKey, privateKey } = await generateKeyPairs()

  const message = "Send $100"
  const signature = signText(message, privateKey)

  const result = verifyText(message, signature, publicKey)

  expect(result).toBe(message)
})