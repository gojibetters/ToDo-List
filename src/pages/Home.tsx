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
	const [newTask, setNewTask] = useState('')
	const [doneTasks, setDoneTasks] = useState<Task[]>([])


	const handleCreateTask = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if(newTask === ''){
			return
		}

		setTasks([...tasks, {id: tasks.length++, description: newTask, status: false}])
		setNewTask('')
	}

	function handleNewTask(event: ChangeEvent<HTMLInputElement>){
		setNewTask(event.target.value.trimStart())
	}

	function handleCheckMark(id: number){
		const changeState = tasks.map(
			task => {
				if (task.id === id) {
					return {...task, status: !task.status}
				}
				return task
			})
		const sortedTasks = changeState.concat(changeState.splice(0, 1))

		setTasks(sortedTasks)
	}


	function handleDeleteItem(id: number) {
		const filteredTasks = tasks.filter(
			(item) => item.id !== id
		)

		const filteredDoneTasks = doneTasks.filter(
			(item) => item.id !== id
		)
		setTasks(filteredTasks.length ? filteredTasks : [])
		setDoneTasks(filteredDoneTasks.length ? filteredDoneTasks : [])
	}

	const taskCheckedLength = tasks.length > 0 ? tasks.filter((task) => task.status === true).length : 0

	console.log(tasks)

	return (
		<div className={styles.container}>
			<header className={styles.logoContainer}>
				<a href='#'><img src={logo} /></a>
			</header>

			<div className={styles.containerTasks}>
				<form onSubmit={handleCreateTask} className={styles.newTask}>
					<input type='text' placeholder='Adicione uma nova tarefa' onChange={handleNewTask} value={newTask}/>
					<button type='submit' disabled={newTask === ''}>
						<strong>Criar</strong>
						<PlusCircle size={16} />
					</button>
				</form>
				
				<div className={styles.tasks}>
					<div className={styles.info}>
						<div className={styles.created}>
							<strong>
							Tarefas criadas <button>{tasks.length}</button>
							</strong>
						</div>
						<div className={styles.done}>
							<strong>
							Concluídas <button>{tasks.length ?  `${taskCheckedLength} de ${tasks.length}` : taskCheckedLength}</button>
							</strong>
						</div>
					</div>

					{tasks.length ? (
						<div className={styles.listWithoutTopLine}>
							<Task tasks={tasks} setCheck={handleCheckMark} handleDeleteItem={handleDeleteItem}/>
						</div>
					) : (
						<div className={styles.list}>
							<img src={clipboard}/>

							<div className={styles.containerText}>
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
