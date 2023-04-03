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
  handleCheckTask: (id: number) => void
	handleDeleteTask: (id: number) => void
}

export function Task ({tasks, handleCheckTask, handleDeleteTask} : CheckboxProps) {

	return (
		<>
			{tasks.map((item) => (
				<div key={item.id} className={item.status ? styles.checkedTask : styles.uncheckedTask}>

					<div className={styles.checkbox}>
						<RadioButton
							onChange={handleCheckTask}
							value={item.id}
						/>
						
						<p
							className={item.status ? styles.checked : ''}
						>
							{item.description}
						</p>
					</div>

					<button onClick={() => handleDeleteTask(item.id)}>
						<Trash size={16}/>
					</button>

				</div>
			))}
		</>
	)
}