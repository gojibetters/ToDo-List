import styles from './RadioButton.module.css'

interface RadioButtonProps {
	value: number
	onChange: (id:number) => void
}

export const RadioButton = ({value, onChange}: RadioButtonProps) =>  
{
	return(
		<label className={styles.labelContainer}>
			<input
				type="checkbox"
				onChange={() => onChange(value)}
				value={value}
				readOnly
			/>
			<span className={styles.checkmark}></span>
		</label>)
}