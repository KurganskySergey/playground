import { applyLinearTransformation, rotation } from './../transform-matrix';


describe('linear transformation', () => {
    test('apply transformation', () => {
        expect(
            applyLinearTransformation(
                rotation,
                [2, 0]
            )
        ).toEqual([0, 2])
    })
})