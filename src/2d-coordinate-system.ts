import {
    TransformMatrix,
    IVector,
    applyLinearTransformation,
    areEqualLinearTransformations,
} from './LinearAlgebra';
import { drawLine } from './draw';

export class DCanvas {
    public el: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    private isMouseDown: boolean;
    private startOfCoord: IVector;
    private linearTransformation: TransformMatrix[] = [];

    // number of pixels should take instead of 1 pixel
    private scale: number;
    private width: number;
    private height: number;

    constructor(el: HTMLCanvasElement, scale: number = 1, w?: number, h?: number) {
        this.el = el;
        this.ctx = el.getContext('2d') as CanvasRenderingContext2D;
        // 10 pixels per 1 unit on coordinate sistem * scale factor
        this.scale = 10 * scale;
        this.isMouseDown = false;
        this.width = el.width = w || el.width;
        this.height = el.height = h || el.height;
        this.startOfCoord = [
            this.width / 2,
            this.height / 2,
        ];
    }

    private fillBackground() {
        const w = this.el.width;
        const h = this.el.height;
        // dark background
        this.ctx.fillStyle = '#010001';
        this.ctx.strokeStyle = '#010001';
        this.ctx.lineJoin = 'miter';
        this.ctx.lineWidth = 1;
        this.ctx.rect(0, 0, w, h);
        this.ctx.fill();
    }

    private applyLinearTransformation(vector: IVector): IVector {
        return this.linearTransformation.reduceRight(
            (transformedVector, transformation) => {
                return applyLinearTransformation(transformation, transformedVector);
            },
            vector,
        );
    }

    // returns transformed verctor's coordinates over real canvas
    public pointsToCoordinates(position: IVector): IVector {
        const [x, y] = this.applyLinearTransformation(position);
        return [
            x * this.scale + this.startOfCoord[0],
            // -1 because canvas coordinate goes from top to bottom while 2d in opposite direction
            (-1 * y * this.scale) + this.startOfCoord[1],
        ];
    }

    private drawHorizontalGridLines(maxX: number, maxY: number): void {
        // render each line per 0.5 units on coordinate sistem
        const yStep = this.scale / 2;

        // vertical lines
        for (let y = .5; y < maxY; y += .5) {
            const color = y % 1 === 0 ? '#898889' : '#444345';
            drawLine(
                this.ctx,
                this.pointsToCoordinates([maxX, y]),
                this.pointsToCoordinates([-maxX, y]),
                { color },
            );
            drawLine(
                this.ctx,
                this.pointsToCoordinates([maxX, -y]),
                this.pointsToCoordinates([-maxX, -y]),
                { color },
            );
        }

        drawLine(
            this.ctx,
            this.pointsToCoordinates([-maxX, 0]),
            this.pointsToCoordinates([maxX, 0]),
            { color: '#fff' },
        );
    }

    private drawVerticalGridLines(maxX: number, maxY: number): void {
        // render each line per 0.5 units on coordinate sistem
        const xStep = this.scale / 2;

        // vertical lines
        for (let x = .5; x < maxX; x += .5) {
            const color = x % 1 === 0 ? '#898889' : '#444345';
            drawLine(
                this.ctx,
                this.pointsToCoordinates([x, maxY]),
                this.pointsToCoordinates([x, -maxY]),
                { color },
            );
            drawLine(
                this.ctx,
                this.pointsToCoordinates([-x, maxY]),
                this.pointsToCoordinates([-x, -maxY]),
                { color },
            );
        }

        drawLine(
            this.ctx,
            this.pointsToCoordinates([0, maxY]),
            this.pointsToCoordinates([0, -maxY]),
            { color: '#fff' },
        );
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.el.width, this.el.height);
    }

    public drawGrid() {
        this.fillBackground();

        // render each line per 0.5 units on coordinate sistem
        const xStep = this.scale / 2;
        const yStep = this.scale / 2;

        const maxX = Math.ceil(this.startOfCoord[0] / this.scale);
        const maxY = Math.ceil(this.startOfCoord[1] / this.scale);

        this.drawVerticalGridLines(maxX, maxY);
        this.drawHorizontalGridLines(maxX, maxY);

        drawLine(
            this.ctx,
            this.pointsToCoordinates([0, maxY]),
            this.pointsToCoordinates([0, -maxY]),
            { color: '#fff' },
        );
    }

    public reset() {
        this.clear();
        this.drawGrid();
    }

    public addTransformation(transformation: TransformMatrix) {
        if (this.hasTransformation(transformation) === false) {
            this.linearTransformation.push(transformation);
        }
    }

    public removeTransformation(transformation: TransformMatrix) {
        const position = this.linearTransformation.findIndex((xTramsformation, i, arr) => {
            return areEqualLinearTransformations(xTramsformation, transformation);
        });
        this.linearTransformation.push(transformation);
    }

    public removeAllTransformations() {
        this.linearTransformation = [];
    }

    public hasTransformation(transformation: TransformMatrix): boolean {
        return this.linearTransformation.indexOf(transformation) >= 0;
    }
}
