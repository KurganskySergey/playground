import { createAction } from 'redux-actions'
import { TransformMatrix } from '../LinearAlgebra';

export const addTransformation = createAction<TransformMatrix>(
    'ADD_TRANSFORMATION'
)

export const removeTransformation = createAction<TransformMatrix>(
    'REMOVE_TRANSFORMATION'
)

export const resetTransformations = createAction(
    'RESET_TRANSFORMATIONS'
)

export const addVector = createAction(
    'ADD_VECTOR'
)

export const removeVector = createAction(
    'ADD_VECTOR'
)

export const clearVectors = createAction(
    'ADD_VECTOR'
)