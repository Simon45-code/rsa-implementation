import { test, expect } from "bun:test"
import { textToBigInt, bigIntToText } from "@utils/text-converter"

import { sampleTextMessages } from "./data"

test.each(sampleTextMessages)("round-trip: %s", (message) => {
    expect(bigIntToText(textToBigInt(message))).toBe(message)
})

test("textToBigInt produces expected value", () => {
    // "A" is 0x41 = 65
    expect(textToBigInt("A")).toBe(65n)
    // "AB" is 0x4142 = 16706
    expect(textToBigInt("AB")).toBe(16706n)
})