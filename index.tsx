import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './src/main'

ReactDOM.render(<App />, document.getElementById('root'))

// Webpack Hot Module Replacement API
// @ts-ignore
if (module.hot) {
	// @ts-ignore
	module.hot.accept('./src/main', () => {
		ReactDOM.render(App)
	})
}
