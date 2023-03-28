import { Trash } from 'phosphor-react' 
import styles from './Task.module.css'
import { RadioButton } from './RadioButton'

interface Task {
	id: number
	description: string
	status: boolean
}

interface CheckboxProps {
  tasks: Task[]
  setCheck: (id: number) => void
	handleDeleteItem: (id: number) => void
}

export function Task ({tasks, setCheck, handleDeleteItem} : CheckboxProps) {

	return (
		<>
			{tasks.map((item) => (
				<div key={item.id} className={item.status ? styles.selectedItemContainer : styles.itemContainer}>
					<div className={styles.checkboxContainer}>
						<RadioButton onChange={setCheck} value={item.id}/>
						<p className={item.status ? styles.withRisk : ''}>{item.description}</p>
					</div>
					<button onClick={() => handleDeleteItem(item.id)}>
						<Trash size={16}/>
					</button>
				</div>
			))}
		</>
	)
}