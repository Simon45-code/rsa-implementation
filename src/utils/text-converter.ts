
export function textToBigInt(text: string): bigint {
    const bytes = new TextEncoder().encode(text)
    let result = 0n
    for (const byte of bytes) {
        result = (result << 8n) | BigInt(byte)
    }
    return result
}

export function bigIntToText(bigint: bigint): string {
  const bytes: number[] = []
  while (bigint > 0n) {
    bytes.unshift(Number(bigint & 0xffn))
    bigint >>= 8n
  }
  return new TextDecoder().decode(new Uint8Array(bytes))
}


