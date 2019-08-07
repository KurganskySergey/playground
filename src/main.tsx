import * as React from 'react'
import { useEffect, useRef } from 'react'
import { DCanvas } from './2d-coordinate-system'
import { drawVector } from './draw'
import { rotation } from './LinearAlgebra'

export const App = (): React.ReactElement => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	useEffect(() => {
		const isMouseDown = false
		const p = 4
		const w = 600
		const h = 600
		let d: DCanvas
		const transformation = [[-3, -2], [0, 3]]

		const ANIMATION_TIME = 2000

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
			d = new DCanvas(canvasRef.current, p, w, h)

			animate(draw, ANIMATION_TIME)
		}

		return () => {
			// cleanup
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			id="canv"
			width={window.innerWidth}
			height={window.innerHeight}
		/>
	)
}
/*
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
