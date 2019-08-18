import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { useSelector } from 'react-redux'

import { Canvas } from './view'
import { Form } from './form'
import { rotation } from '../LinearAlgebra'
import { getAppliedTransformations, getVectors } from './selectors'

export const TransformationVisualizationScreen: React.FC = () => {
	const transformations = useSelector(getAppliedTransformations)
	const vectors = useSelector(getVectors)
	debugger

	return (
		<Grid container spacing={2}>
			<Grid item xs={10}>
				<Canvas transformations={transformations} vectors={vectors} />
			</Grid>
			<Grid item xs={2}>
				<Form transformations={transformations} vectors={vectors} />
			</Grid>
		</Grid>
	)
}
