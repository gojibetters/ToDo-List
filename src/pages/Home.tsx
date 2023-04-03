import { ChangeEvent, FormEvent, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import { Task } from '../components/Task'
import styles from './Home.module.css'
import logo from '../assets/logo.svg'
import clipboard from '../assets/clipboard.svg'

interface Task {
	id: number
	description: string
	status: boolean
}

function Home() {

	const [tasks, setTasks] = useState<Task[]>([])
	const [typedNewTask, setTypedNewTask] = useState('')

	function handleTypedNewTask (event: ChangeEvent<HTMLInputElement>) {
		setTypedNewTask(event.target.value.trimStart())
	}

	function handleCreateTask (event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if(typedNewTask !== ''){
			setTasks([...tasks, {id: tasks.length++, description: typedNewTask, status: false}])
			setTypedNewTask('')	
		}
	}

	function handleCheckTask(id: number){

		const changeState = tasks.map(
			task => {
				if (task.id === id) {
					return {...task, status: !task.status}
				}
				return task
			})

		const filterUndoneTasks = changeState.filter(
			(item) => item.status === false
		)

		const filterDoneTasks = changeState.filter(
			(item) => item.status === true
		)

		const sortedTasks = filterUndoneTasks.concat(filterDoneTasks)

		setTasks(sortedTasks)
	}

	function handleDeleteTask(id: number) {
		const filteredTasks = tasks.filter(
			(item) => item.id !== id
		)

		setTasks(filteredTasks.length ? filteredTasks : [])
	}

	const checkedTaskSize = tasks.length > 0 ? tasks.filter((task) => task.status === true).length : 0
	const typedTaskIsEmpty = typedNewTask === ''

	return (
		<div className={styles.container}>
			<header className={styles.logo}>
				<a href='#'><img src={logo} /></a>
			</header>

			<div className={styles.containerTasks}>
				<form onSubmit={handleCreateTask} className={styles.newTask}>
					<input
						type='text'
						placeholder='Adicione uma nova tarefa'
						onChange={handleTypedNewTask} value={typedNewTask}
					/>

					<button
						type='submit'
						disabled={typedTaskIsEmpty}
					>
						<strong>Criar</strong>
						<PlusCircle size={16} />
					</button>
				</form>
				
				<div className={styles.tasks}>
					<div className={styles.info}>

						<div className={styles.created}>
							<strong>Tarefas criadas 
								<button>{tasks.length}</button>
							</strong>
						</div>

						<div className={styles.done}>
							<strong>Concluídas 
								<button>{tasks.length ?  `${checkedTaskSize} de ${tasks.length}` : checkedTaskSize}</button>
							</strong>
						</div>

					</div>

					{tasks.length ?
						(
							<div className={styles.listWithoutTopLine}>
								<Task
									tasks={tasks}
									handleCheckTask={handleCheckTask}
									handleDeleteTask={handleDeleteTask}
								/>
							</div>
						) : (
							<div className={styles.listWithTopLine}>
								<img src={clipboard}/>

								<div className={styles.emptyTasks}>
									<span>
										<strong>Você ainda não tem tarefas cadastradas</strong>
									</span>
									<span>Crie tarefas e organize seus itens a fazer</span>
								</div>

							</div>
						)}

				</div>
			</div>
		</div>
	)
}

export default Home
