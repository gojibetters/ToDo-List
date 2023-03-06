import styles from './Home.module.css'
import logo from '../assets/logo.svg'
import clipboard from '../assets/clipboard.svg'
import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import { Checkbox } from '../components/Checkbox'

interface Task {
	id: number
	description: string
}


function Home() {

	const [tasks, setTasks] = useState<Task[]>([])
	const [newTask, setNewTask] = useState('')
	const [doneTasks, setDoneTasks] = useState<Task[]>([])


	function handleCreateTask(){
		setTasks([...tasks, {id: tasks.length++, description: newTask}])
		setNewTask('')
	}

	function handleNewTask(event: ChangeEvent<HTMLInputElement>){
		setNewTask(event.target.value)
	}

	function handleCheck(id: number){
		const sameTask = doneTasks.some(
			(task) => task.id === id
		)
		
		if(sameTask){
			const filteredTasks = doneTasks.filter(
				(task) => task.id !== id
			)
			console.log(filteredTasks)
			setDoneTasks(filteredTasks)
		}

		if(!sameTask) {
			const findedTask = tasks.find(
				(task) => {
					return task.id === id
				}
			)
			setDoneTasks(findedTask ?  [...doneTasks, findedTask] : doneTasks)
		}
	}


	return(
		<div className={styles.container}>
			<header className={styles.logoContainer}>
				<a href='#'><img src={logo} /></a>
			</header>

			<div className={styles.containerTasks}>
				<div className={styles.newTask}>
					<input type='text' placeholder='Adicione uma nova tarefa' onChange={handleNewTask} value={newTask}/>
					<button onClick={handleCreateTask}>
						<strong>Criar</strong>
						<PlusCircle size={16} />
					</button>
				</div>

				<div className={styles.tasks}>
					<div className={styles.info}>
						<div className={styles.created}>
							<strong>
							Tarefas criadas <button>{tasks.length}</button>
							</strong>
						</div>
						<div className={styles.done}>
							<strong>
							Concluídas <button> {tasks.length ?  `${doneTasks.length} de ${tasks.length}` : doneTasks.length} </button>
							</strong>
						</div>
					</div>

					{tasks.length ? (
						<div className={styles.listWithoutTopLine}>
							<Checkbox tasks={tasks} setCheck={handleCheck} />
						</div>
					) :
						(
							<div className={styles.list}>
								<img src={clipboard}/>

								<div className={styles.containerText}>
									<span>
										<strong>
						Você ainda não tem tarefas cadastradas
										</strong>
									</span>
									<span>
					Crie tarefas e organize seus itens a fazer
									</span>
								</div>
							</div>
						)
					}

				</div>
			</div>
		</div>
	)
}

export default Home
