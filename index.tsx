import reactDom from 'react-dom'
import main from './src/main'

reactDom.render(main, document.body)

// Webpack Hot Module Replacement API
// @ts-ignore
if (module.hot) {
	// @ts-ignore
	module.hot.accept('./src/main', () => {
		reactDom.render(main)
	})
}
