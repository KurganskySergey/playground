import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

import { transformationsXY } from './transformations-visualization/reducer'

export const store = createStore(
	combineReducers<{ transformationsXY: any[] }>({
		transformationsXY,
	}),
	{},
	devToolsEnhancer({})
)
