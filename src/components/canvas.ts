interface iCanvasProps {
    el: HTMLCanvasElement
}

class Canvas {
    public static context = '2d'

	public el: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D

	private width: number
    private height: number

    constructor(props: iCanvasProps) {
        this.el = props.el
		this.ctx = this.el.getContext(Canvas.context) as CanvasRenderingContext2D
    
		this.width = this.el.width
		this.height = this.el.height
    }

	public clear() {
		this.ctx.clearRect(0, 0, this.width, this.height)
	}
}