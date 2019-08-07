import { DCanvas } from '../2d-coordinate-system';
import { IVector } from '../LinearAlgebra';

export const drawLine = (
    ctx: CanvasRenderingContext2D,
    [x1, y1]: IVector,
    [x2, y2]: IVector,
    {
        color = 'gray',
        lineWidth = 1,
        lineJoin = 'miter' as CanvasLineJoin,
    },
) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineJoin = lineJoin;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};

export const drawVector = (canvas: DCanvas, vector: IVector, color = 'red') => {
    drawLine(
        canvas.ctx,
        canvas.pointsToCoordinates([0, 0]),
        canvas.pointsToCoordinates(vector),
        { color },
    );
};

export const drawCell = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
) => {
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 1;
    ctx.rect(x, y, w, h);
    ctx.fill();
};
