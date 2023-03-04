import styles from './Home.module.css'
import logo from '../assets/logo.svg'
import clipboard from '../assets/clipboard.svg'
import { PlusCircle } from 'phosphor-react'


function Home() {

	function handleCreateTask(){
		alert('ok')
	}

	return(
		<div className={styles.container}>
			<header className={styles.logoContainer}>
				<a href='#'><img src={logo} /></a>
			</header>

			<div className={styles.containerTasks}>
				<div className={styles.newTask}>
					<input type='text' placeholder='Adicione uma nova tarefa'/>
					<button onClick={handleCreateTask}>
						<strong>Criar</strong>
						<PlusCircle size={16} />
					</button>
				</div>

				<div className={styles.tasks}>
					<div className={styles.info}>
						<div className={styles.created}>
							<strong>
							Tarefas criadas <button>0</button>
							</strong>
						</div>
						<div className={styles.done}>
							<strong>
							Concluídas <button>0</button>
							</strong>
						</div>
					</div>

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
				</div>
			</div>
		</div>
	)
}

export default Home
