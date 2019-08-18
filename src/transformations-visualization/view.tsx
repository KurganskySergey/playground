import * as React from 'react'
import { useCanvas, useWindow } from './hooks'

import { CoordinatesSystemXY } from '../components/2d-coordinate-system'
import { drawVector } from '../draw'
import {
	IVector,
	TransformMatrix,
	applyLinearTransformation,
} from '../LinearAlgebra'

interface ICanvasProps {
	vectors: IVector[]
	transformations: TransformMatrix[]
}

export const Canvas = ({ vectors, transformations }: ICanvasProps) => {
	const wSize = useWindow()
	const transformedVectors = vectors.map(vector => {
		transformations.reduceRight((transformedVector, transformation) => {
			return applyLinearTransformation(transformation, transformedVector)
		}, vector)
	})

	const canvasRef = useCanvas(
		() => {
			const d = new CoordinatesSystemXY({
				el: canvasRef.current,
				scale: 40,
			})
			d.reset()
			drawVector(d, [1, 1], 'red')
			// drawVector(d, [2, -1], 'blue')
		},
		'2d',
		wSize
	)

	return <canvas ref={canvasRef} width={wSize.width} height={wSize.height} />
}
