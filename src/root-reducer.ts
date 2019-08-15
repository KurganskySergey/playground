import { combineReducers } from 'redux'
import {
	transformationsXY,
	vectors,
} from './transformations-visualization/reducer'

export interface IRootReducer {
	transformationsXY: ReturnType<typeof transformationsXY>
	vectors: ReturnType<typeof vectors>
}
export const rootReducer = combineReducers<IRootReducer>({
	transformationsXY,
	vectors,
})
