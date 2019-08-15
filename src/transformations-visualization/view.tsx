import * as React from 'react'
import { useSelector } from 'react-redux'
import { useCanvas, useWindow } from './hooks'

import { CoordinatesSystemXY } from '../components/2d-coordinate-system'
import { drawVector } from '../draw'
import { rotation } from '../LinearAlgebra'
import { getAppliedTransformations, getVectors } from './selectors'

export const TransformationVisualization = () => {
	const transformation = useSelector(getAppliedTransformations)
	const vectors = useSelector(getVectors)
	const wSize = useWindow()
	const canvasRef = useCanvas(
		() => {
			const canvas = new Canvas({ el: canvasRef.current })
			const d = new CoordinatesSystemXY()
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
