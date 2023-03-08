import { Trash } from 'phosphor-react'
import styles from './Checkbox.module.css'

interface Task {
	id: number
	description: string
}

interface CheckboxProps {
  tasks: Task[]
  setCheck: (id: number) => void
	handleDeleteItem: (id: number) => void
}

export function Checkbox ({tasks, setCheck, handleDeleteItem} : CheckboxProps) {

	return (
		<>
			{tasks.map((item) => (
				<div key={item.id} className={styles.itemContainer}>
					<div className={styles.checkboxContainer}>
						<input type='checkbox' id={String(item.id)} onChange={() => setCheck(item.id)}/>
						<p>{item.description}</p>
					</div>
					<button onClick={() => handleDeleteItem(item.id)}>
						<Trash size={16}/>
					</button>
				</div>
			))}
		</>
	)
}