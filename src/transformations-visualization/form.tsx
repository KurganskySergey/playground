import * as React from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { IVector } from '../LinearAlgebra'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 200,
		},
	})
)

interface IFormProps {
	vectors: IVector[]
	transformations: TransformMatrix[]
}

export const Form = (props: IFormProps): React.FC => {
	const classes = useStyles()
	const [values, setValues] = React.useState<State>({
		name: 'Cat in the Hat',
		age: '',
		multiline: 'Controlled',
		currency: 'EUR',
	})

	const handleChange = (name: keyof State) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setValues({ ...values, [name]: event.target.value })
	}

	return (
		<div>
			<TextField
				id="standard-number"
				label="Number"
				value={values.age}
				onChange={handleChange('age')}
				type="number"
				className={classes.textField}
				InputLabelProps={{
					shrink: true,
				}}
				margin="normal"
			/>
			<TextField
				id="standard-number"
				label="Number"
				value={values.age}
				onChange={handleChange('age')}
				type="number"
				className={classes.textField}
				InputLabelProps={{
					shrink: true,
				}}
				margin="normal"
			/>
		</div>
	)
}
