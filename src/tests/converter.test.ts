import { test, expect } from "bun:test"
import { textToBigInt, bigIntToText } from "@utils/text-converter"

test("round-trip: ASCII", () => {
  const message = "Hello, World"
  expect(bigIntToText(textToBigInt(message))).toBe(message)
})

test("round-trip: UTF-8 multi-byte characters", () => {
  const message = "café 北京 🚀"
  expect(bigIntToText(textToBigInt(message))).toBe(message)
})

test("round-trip: single character", () => {
  expect(bigIntToText(textToBigInt("a"))).toBe("a")
})

test("textToBigInt produces expected value", () => {
  // "A" is 0x41 = 65
  expect(textToBigInt("A")).toBe(65n)
  // "AB" is 0x4142 = 16706
  expect(textToBigInt("AB")).toBe(16706n)
})