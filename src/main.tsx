import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { DCanvas } from './components/2d-coordinate-system'
import { drawVector } from './draw'
import { rotation } from './LinearAlgebra'

function useCanvas(draw, context = '2d', wSize) {
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

function useWindow() {
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

const transformation = [[2, 1], [0, -1]]
export const App = (): React.ReactElement => {
	const wSize = useWindow()
	const canvasRef = useCanvas(
		gl => {
			const d = new DCanvas(canvasRef.current, 4)
			d.removeAllTransformations()
			d.addTransformation(transformation)
			d.drawGrid()
			drawVector(d, [1, 1], 'red')
			drawVector(d, [2, -1], 'blue')
		},
		'2d',
		wSize
	)

	return <canvas ref={canvasRef} width={wSize.width} height={wSize.height} />
}
/*

	const isMouseDown = false
	const scale = 4
	const w = 600
	const h = 600const ANIMATION_TIME = 2000

	function draw(timePased: any) {
		const step = timePased / ANIMATION_TIME
		d.clear()
		render(calculateAnimationStep(transformation, step))
	}

	function calculateAnimationStep([i, j]: any, step: number) {
		return [
			[(i[0] - 1) * step + 1, (i[1] - 0) * step + 0],
			[(j[0] - 0) * step + 0, (j[1] - 1) * step + 1],
		]
	}

	function animate(draw: any, duration: number) {
		const start = performance.now()
		requestAnimationFrame(function animate(time) {
			// определить, сколько прошло времени с начала анимации
			let timePassed = time - start

			// возможно небольшое превышение времени, в этом случае зафиксировать конец
			if (timePassed >= duration) {
				timePassed = duration
			}

			// нарисовать состояние анимации в момент timePassed
			draw(timePassed)

			// если время анимации не закончилось - запланировать ещё кадр
			if (timePassed < duration) {
				requestAnimationFrame(animate)
			}
		})
	}

	function render(tr: any) {
		d.removeAllTransformations()
		d.addTransformation(tr)
		d.drawGrid()
		drawVector(d, [1, 1], 'red')
		drawVector(d, [2, -1], 'blue')
	}

	if (canvasRef && canvasRef.current) {
		animate(draw, ANIMATION_TIME)
	}

	const onMousedown = (e: any) => {
		isMouseDown = true
		d.ctx.beginPath()
	};

	const onMouseup = (e: any) => {
		isMouseDown = false
	};
	const onMousemove = (e: any) => {
		if (isMouseDown) {
			d.ctx.fillStyle = 'red'
			d.ctx.strokeStyle = 'red'
			d.ctx.lineWidth = 2

			d.ctx.lineTo(e.offsetX, e.offsetY)
			d.ctx.stroke()

			d.ctx.beginPath()
			d.ctx.arc(e.offsetX, e.offsetY, 1, 0, Math.PI * 2)
			d.ctx.fill()

			d.ctx.beginPath()
			d.ctx.moveTo(e.offsetX, e.offsetY)
		}
	};

	const onKeypress = (e: any) => {
		if (e.key.toLowerCase() === 'c') {
			transformation = rotation
			d.clear()
			animate(draw, ANIMATION_TIME)
		}
	};
*/
