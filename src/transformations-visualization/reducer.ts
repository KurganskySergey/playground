import { areEqualLinearTransformations } from './../LinearAlgebra/transform-matrix'
import { handleActions } from 'redux-actions'
import {
	addTransformation,
	removeTransformation,
	resetTransformations,
} from './actions'
import { TransformMatrix } from '../LinearAlgebra'

export const transformationsXY = handleActions<
	TransformMatrix[],
	TransformMatrix
>(
	{
		[addTransformation.toString()]: (state, action) => {
			return [...state, action.payload]
		},

		[removeTransformation.toString()]: (
			state,
			{ payload: transformation }
		) => {
			const position = state.findIndex(xTramsformation => {
				return areEqualLinearTransformations(
					xTramsformation,
					transformation
				)
			})

			return [...state.slice(0, position), ...state.slice(position + 1)]
		},

		[resetTransformations.toString()]: () => {
			return []
		},
	},
	[
        [
            [2, 1],
            [0, -1]
        ]
    ]
)