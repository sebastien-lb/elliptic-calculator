export interface EllipticCurve {
    a: bigint;
    b: bigint;
    p: bigint; // Caracteristic
}

export interface Point {
    x: bigint;
    y: bigint;
}

export const getPointsOnEllipticCurve = (curve: EllipticCurve): Point[] => {
    // Naive implementation
    const points: Point[] = [];
    for (let x = 0n; x < curve.p; x++) {
        for (let y = 0n; y < curve.p; y++) {
            if ((y ** 2n) % curve.p === (x ** 3n + curve.a * x + curve.b) % curve.p) {
                points.push({ x, y });
            }
        }
    }
    return points;
}

export const modInverse = (a: bigint, m: bigint): bigint => {
    return (a ** (m - 2n)) % m;
} 


/** Add two points p1 and p2 on an elliptic curve
 * 
 * @param curve 
 * @param p1 
 * @param p2 
 * @returns 
 */
export const pointAddition = (curve: EllipticCurve, p1: Point, p2: Point): Point => {
    // TODO check copilot implementation
    if (p1.x === p2.x && p1.y === p2.y) {
        const m = (3n * p1.x ** 2n + curve.a) * modInverse(2n * p1.y, curve.p) % curve.p;
        let x = (m ** 2n - 2n * p1.x) % curve.p;
        let y = (m * (p1.x - x) - p1.y) % curve.p;
        if (y <0n) y = y + curve.p;
        if (x <0n) x = x + curve.p;
        return { x, y };
    }
    const m = (p2.y - p1.y) * modInverse(p2.x - p1.x, curve.p) % curve.p;
    let x = (m ** 2n - p1.x - p2.x) % curve.p;
    let y = (m * (p1.x - x) - p1.y) % curve.p;
    if (y <0n) y = y + curve.p;
    if (x <0n) x = x + curve.p;
    return { x, y };
}


/** Multiply a point p by n
 * 
 * @param curve 
 * @param p 
 * @param n 
 * @returns 
 */
export const pointMultiplication = (curve: EllipticCurve, p: Point, n: bigint): Point => {
    if (n <= 1n) return p;
    if (n % 2n === 0n) {
        n = n / 2n;
        const p2 = pointMultiplication(curve, p, n);
        p = pointAddition(curve, p2, p2);
        return p
    } else {
        n = n - 1n;
        const p2 = pointMultiplication(curve, p, n);
        p = pointAddition(curve, p2, p);
        return p
    }
}