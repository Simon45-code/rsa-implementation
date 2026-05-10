# RSA Algorithm

> Abstract: This document explains the RSA Algorithm — a public-key cryptosystem based on the difficulty of factoring large composite numbers.

RSA Algorithm is based on factorization of large numbers and modular arithmetic. It breaks down into three main phases:

1. [Key Generation](#key-generation): creating Public and Private Keys
2. [Encryption](#encryption): sender encrypts message using the Public Key
3. [Decryption](#decryption): receiver decrypts using the Private Key

## Key Generation

The keys are generated as follows:

1. Choose 2 large secret prime numbers, $p$ and $q$.
2. Calculate the product of the primes: $n = p \times q$.
3. Calculate Euler's Totient Function: $\phi(n) = (p - 1) \times (q - 1)$, since $p$ and $q$ are prime.
4. Choose an encryption exponent $e$, such that:
   - $1 < e < \phi(n)$
   - $\gcd(e, \phi(n)) = 1$, meaning $e$ is coprime with $\phi(n)$

   In practice, $e = 65537$ is almost always used: it is prime, has only two 1-bits in binary (making encryption fast), and is coprime to $\phi(n)$ for essentially all randomly chosen primes.
5. Calculate the decryption exponent $d$, such that:
   - $d \times e \equiv 1 \pmod{\phi(n)}$, meaning $d$ is the modular multiplicative inverse of $e$ modulo $\phi(n)$. This is computed using the Extended Euclidean Algorithm.

Finally:
**Public Key:** = $(n, e)$ 
**Private Key:** = $(n, d)$

## Encryption

To encrypt a message $m$ (where $0 \leq m < n$), the sender computes:

$$c = m^e \pmod{n}$$

The ciphertext $c$ is sent to the receiver.

The message $m$ must be smaller than $n$. Longer messages are split into blocks, or - in practice - RSA is used to encrypt a random symmetric key which then encrypts the actual message (hybrid encryption).

## Decryption

To recover the message, the receiver computes:

$$m = c^d \pmod{n}$$

Only the holder of $d$ — the private key — can perform this efficiently. An attacker would need to factor $n$ to recover $d$, which is computationally infeasible for sufficiently large $n$.

## Worked Example

Using small primes for illustration (real RSA uses 2048-bit or larger):

- $p = 11$, $q = 3$
- $n = p \times q = 33$
- $\phi(n) = (11 - 1) \times (3 - 1) = 20$
- Choose $e = 3$ (coprime to 20)
- Solve $3d \equiv 1 \pmod{20}$ → $d = 7$

**Public Key** = $(33, 3)$
**Private Key** = $(33, 7)$

**Encrypt** $m = 4$:
$$c = 4^3 \bmod 33 = 64 \bmod 33 = 31$$

**Decrypt** $c = 31$:
$$m = 31^7 \bmod 33 = 4 \;✓$$

## Conclusion

RSA was the first widely deployed public-key cryptosystem and remains in widespread use, particularly for TLS certificates and digital signatures. Its security rests on the difficulty of factoring large composite numbers — a problem assumed hard for classical computers but vulnerable to quantum attack. While modern systems increasingly favor elliptic-curve cryptography (Ed25519, X25519) for new deployments and post-quantum schemes (ML-KEM, ML-DSA) for long-term security, understanding RSA remains foundational to the field.

### Advantages

- **Asymmetric:** no shared secret needed — the public key can be distributed openly without compromising security.
- **Enables digital signatures:** the same algorithm works in reverse. A signature is created with the private key and verified with the public key, proving authenticity and integrity.
- **Mature and well-studied:** nearly 50 years of cryptanalysis; failure modes are well understood.
- **Widely supported:** every major TLS library, email encryption tool, and certificate authority supports RSA.

### Disadvantages

- **Slow:** RSA operations are orders of magnitude slower than symmetric encryption (AES) or modern elliptic-curve schemes. In practice, RSA is only used to exchange a symmetric key, never for bulk data.
- **Large keys:** approximately 2048 bits for 112-bit security, 3072 bits for 128-bit security. Elliptic-curve schemes achieve the same security level with 256-bit keys.
- **Padding-sensitive:** textbook RSA (encrypting $m$ directly) is insecure. Real implementations require carefully designed padding schemes — OAEP for encryption, PSS for signatures. Implementing RSA without proper padding has caused real-world security breaks.
- **Vulnerable to quantum computers:** Shor's algorithm breaks RSA on a sufficiently large quantum computer in polynomial time. Post-quantum schemes are being deployed to replace it.
- **Implementation pitfalls:** small-exponent attacks, timing attacks, and weak random number generators have all broken real RSA deployments.

## References

- Rivest, R., Shamir, A., & Adleman, L. (1978). *A Method for Obtaining Digital Signatures and Public-Key Cryptosystems*. Communications of the ACM.
- RFC 8017: *PKCS #1: RSA Cryptography Specifications Version 2.2*
- Katz, J., & Lindell, Y. *Introduction to Modern Cryptography* (3rd ed.)