

/** Check if a number is prime - not optimized
 * 
 * @param x 
 * @returns 
 */
export const isPrime = (x: bigint): boolean => {
    if (x <= 1n) return false;
    if (x <= 3n) return true;
    if (x % 2n === 0n || x % 3n === 0n) return false;
    let i = 5n;
    while (i * i <= x) {
        if (x % i === 0n || x % (i + 2n) === 0n) return false;
        i += 6n;
    }
    return true;

}

/** Get the prime factors of a number
 * 
 * @param x 
 * @returns 
 */
export const getPrimeFactors = (x: bigint): bigint[] => {
    const factors: bigint[] = [];
    if (x <= 1n) return factors;
    while (x % 2n === 0n) {
        factors.push(2n);
        x /= 2n;
    }
    let factor = 3n;
    while (factor * factor <= x) {
        while (x % factor === 0n) {
            factors.push(factor);
            x /= factor;
        }
        factor += 2n;
    }
    if (x > 2n) {
        factors.push(x);
    }
    return factors;
}


/** Return Primitive roots of the field of Characteristic p and order n with n prime 
 * 
 * @param p 
 * @param n 
 */
export const getPrimitiveRoots = (p: bigint, n: bigint): bigint[] => {
    const roots : bigint[] = [];
    for (let i = 1n; i < p; i++) {
            if (i ** n % p === 1n) {
                roots.push(i);
            }
        }
    return roots;
}

/** Take a prime number p and return the primitive roots whose orders are prime factors of p-1
 * 
 * @param p 
 */
export const getPrimitiveRootsOfPrimeFactors = (p: bigint): {[a in number]: bigint[]} => {
    const roots: {[a in number]: bigint[]} = {};
    const primeFactors = getPrimeFactors(p - 1n);
    for (const factor of primeFactors) {
        roots[Number(factor)] = getPrimitiveRoots(p, factor);
    }
    return roots;
}