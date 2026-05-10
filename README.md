# rsa-implementation

> [!WARNING]
> Don't use this in production. For real-world use, prefer well-tested libraries like OpenSSL or Node's built-in `crypto` module.

A from-scratch RSA implementation in TypeScript, using [`generatePrime` from `node:crypto`](https://nodejs.org/api/crypto.html#cryptogenerateprimesize-options-callback) for prime generation.

## Features

- Key generation
- Encryption / decryption

## Running Tests

\`\`\`bash
bun test
\`\`\`

## Why?

I built this to understand how RSA works under the hood.