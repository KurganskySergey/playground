export type IVector = number[];

export const addVectors = (
    [x1, y1, z1]: IVector,
    [x2, y2, z2]: IVector,
): IVector => {
    if (typeof z1 !== typeof z2) {
        throw Error('different dimentionally vectors passed!');
    }

    return z1 !== undefined && z2 !== undefined
        ? [
            x1 + x2,
            y1 + y1,
            z1 + z2,
        ]
        : [
            x1 + x2,
            y1 + y1,
        ];
};
