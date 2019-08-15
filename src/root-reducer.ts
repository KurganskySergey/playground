import { combineReducers } from 'redux'
import { transformationsXY } from './transformations-visualization/reducer'

interface IRootReducer {
    transformationsXY: ReturnType<typeof transformationsXY>
}
export const rootReducer = combineReducers<IRootReducer>({
	transformationsXY,
})
