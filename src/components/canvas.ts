export interface ICanvasProps {
	el: HTMLCanvasElement
}

export class Canvas {
	public static context = '2d'

	public el: HTMLCanvasElement
	public ctx: CanvasRenderingContext2D

	public width: number
	public height: number

	constructor(props: ICanvasProps) {
		this.el = props.el
		this.ctx = this.el.getContext(
			Canvas.context
		) as CanvasRenderingContext2D
		this.ctx.translate(0, 0)
		this.width = this.el.width
		this.height = this.el.height
	}

	public clear() {
		this.ctx.clearRect(0, 0, this.width, this.height)
	}
}
