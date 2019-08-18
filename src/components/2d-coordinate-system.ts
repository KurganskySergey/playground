import { drawLine } from '../draw'
import { Canvas, ICanvasProps } from './canvas'
import {
	areEqualLinearTransformations,
	IVector,
	TransformMatrix,
} from '../LinearAlgebra'

interface ICoordinatesSystemXYProps extends ICanvasProps {
	scale: number
}

export class CoordinatesSystemXY extends Canvas {
	private originOfCoord: IVector

	// number of pixels should take instead of 1 pixel
	private pixelsPerUnit: number

	constructor(props: ICoordinatesSystemXYProps) {
		super(props)
		// 10 pixels per 1 unit on coordinate sistem * scale factor
		this.pixelsPerUnit = props.scale
		this.originOfCoord = [this.width / 2, this.height / 2]
	}

	// returns transformed verctor's coordinates over real canvas
	public pointsToCoordinates([x, y]: IVector): IVector {
		// const [x, y] = this.applyLinearTransformation(position)
		return [
			x * this.pixelsPerUnit + this.originOfCoord[0],
			// -1 because canvas coordinate goes from top to bottom while 2d in opposite direction
			-1 * y * this.pixelsPerUnit + this.originOfCoord[1],
		]
	}

	public drawGrid() {
		this.fillBackground()

		const maxX = Math.ceil(this.width / this.pixelsPerUnit)
		const maxY = Math.ceil(this.height / this.pixelsPerUnit)

		this.drawVerticalGridLines(maxX, maxY)
		this.drawHorizontalGridLines(maxX, maxY)

		drawLine(
			this.ctx,
			this.pointsToCoordinates([0, maxY]),
			this.pointsToCoordinates([0, -maxY]),
			{ color: '#fff' }
		)
	}

	public reset() {
		this.clear()
		this.drawGrid()
	}

	private fillBackground() {
		const w = this.el.width
		const h = this.el.height
		// dark background
		this.ctx.fillStyle = '#010001'
		this.ctx.strokeStyle = '#010001'
		this.ctx.lineJoin = 'miter'
		this.ctx.lineWidth = 1
		this.ctx.rect(0, 0, w, h)
		this.ctx.fill()
	}

	private drawHorizontalGridLines(maxX: number, maxY: number): void {
		// render each line per 0.5 units on coordinate sistem
		const yStep = this.pixelsPerUnit / 2

		// vertical lines
		for (let y = 0.5; y < maxY; y += 0.5) {
			const color = y % 1 === 0 ? '#898889' : '#444345'
			drawLine(
				this.ctx,
				this.pointsToCoordinates([maxX, y]),
				this.pointsToCoordinates([-maxX, y]),
				{ color }
			)
			drawLine(
				this.ctx,
				this.pointsToCoordinates([maxX, -y]),
				this.pointsToCoordinates([-maxX, -y]),
				{ color }
			)
		}

		drawLine(
			this.ctx,
			this.pointsToCoordinates([-maxX, 0]),
			this.pointsToCoordinates([maxX, 0]),
			{ color: '#fff' }
		)
	}

	private drawVerticalGridLines(maxX: number, maxY: number): void {
		// render each line per 0.5 units on coordinate sistem
		const xStep = this.pixelsPerUnit / 2

		// vertical lines
		for (let x = 0.5; x < maxX; x += 0.5) {
			const color = x % 1 === 0 ? '#898889' : '#444345'
			drawLine(
				this.ctx,
				this.pointsToCoordinates([x, maxY]),
				this.pointsToCoordinates([x, -maxY]),
				{ color }
			)
			drawLine(
				this.ctx,
				this.pointsToCoordinates([-x, maxY]),
				this.pointsToCoordinates([-x, -maxY]),
				{ color }
			)
		}

		drawLine(
			this.ctx,
			this.pointsToCoordinates([0, maxY]),
			this.pointsToCoordinates([0, -maxY]),
			{ color: '#fff' }
		)
	}
}
