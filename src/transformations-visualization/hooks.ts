import { useEffect, useState, useRef } from 'react'

export function useCanvas(draw, context = '2d', wSize) {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const ctx = canvasRef.current.getContext(context)
		let animationFrameId = requestAnimationFrame(renderFrame)

		function renderFrame() {
			animationFrameId = requestAnimationFrame(renderFrame)
			draw(ctx)
		}

		return () => cancelAnimationFrame(animationFrameId)
	}, [wSize])

	return canvasRef
}

export function useWindow() {
	const [state, setState] = useState<{ width: number; height: number }>({
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
	})
	const onWindowResize = () => {
		setState({
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
		})
	}
	useEffect(() => {
		window.addEventListener('resize', onWindowResize, false)
		return () => window.removeEventListener('resize', onWindowResize, false)
	}, [])

	return state
}
