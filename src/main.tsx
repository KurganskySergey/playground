import * as React from 'react'
import { DCanvas } from './2d-coordinate-system'
import { drawVector } from './draw'
import { rotation } from './LinearAlgebra'

function main() {
	const canvas = document.createElement('canvas')
	canvas.setAttribute('id', 'canv')
	canvas.width = 400
	canvas.height = 400

	document.body.appendChild(canvas)

	const p = 4
	const w = 600
	const h = 600
	const d = new DCanvas(canvas, p, w, h)

	function handleCanvasActions(d: DCanvas) {
		let isMouseDown = false
		d.el.addEventListener('mousedown', (e: any) => {
			isMouseDown = true
			d.ctx.beginPath()
		})

		d.el.addEventListener('mouseup', (e: any) => {
			isMouseDown = false
		})

		d.el.addEventListener('mousemove', (e: any) => {
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
		})

		document.addEventListener('keypress', (e: any) => {
			if (e.key.toLowerCase() === 'c') {
				transformation = rotation
				d.clear()
				animate(draw, ANIMATION_TIME)
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

	handleCanvasActions(d)

	let transformation = [[-3, -2], [0, 3]]

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
			if (timePassed >= duration) timePassed = duration

			// нарисовать состояние анимации в момент timePassed
			draw(timePassed)

			// если время анимации не закончилось - запланировать ещё кадр
			if (timePassed < duration) {
				requestAnimationFrame(animate)
			}
		})
	}

	animate(draw, ANIMATION_TIME)
}

// main();
export default (): React.ReactElement => {
	return <canvas id="canv" width={400} height={400} />
}
