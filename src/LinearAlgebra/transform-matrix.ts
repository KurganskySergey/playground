import { IVector } from './vector';

export type TransformMatrix = Array<IVector>;

export const shear = [
    [1, 0],
    [1, 1],
];

export const rotation = [
    [0, 1],
    [-1, 0],
];

/**
 * @param matrix - [ [a c], [ b, d ]] || [ [a, d, g], [ b, e, h], [ c, f, i]]
 * @param vector - x, y, z?
 * @returns [ ax + by, cx + dy ] || [ ax + by + cz, dx + ey + fz, gx + hy + iz]
 */
export const applyLinearTransformation = (
    [
        [a, c],
        [b, d],
    ]: TransformMatrix,
    [x, y]: IVector,
): IVector => {
    return [
        a * x + b * y,
        c * x + d * y,
    ];
};

/**
 * @param matrix - [ [a c], [ b, d ]] || [ [a, d, g], [ b, e, h], [ c, f, i]]
 * @returns boolean
 */
export const areEqualLinearTransformations = (
    a: TransformMatrix,
    b: TransformMatrix
): boolean => {
    if (a.length !== b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[i].length; j++) {
            if (a[i][j] !== b[i][j]) {
                return false;
            }
        }
    }

    return true;
};
