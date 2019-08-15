import { IRootReducer } from './../root-reducer'

export const getAppliedTransformations = (state: IRootReducer) =>
	state.transformationsXY

export const getVectors = (state: IRootReducer) => state.vectors
