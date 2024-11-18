import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { taskType } from "../../types";
import { Button } from "../Button/Button";
import { TaskCard } from "../TaskCard/TaskCard";
import styles from "./Main.module.css";

export const Main = () => {
  const [taskList, setTaskList] = useState<taskType[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  // -- FORM FUNCTIONS --

  function handleNewTaskText(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newTask: taskType = {
      id: uuidv4(),
      isCompleted: false,
      text: newTaskText,
    };
    setTaskList((state) => [...state, newTask]);
    setNewTaskText("");
  }

  // -- TASK HANDLING --

  function completeTask(id: string) {
    const taskToUpdate = taskList.filter((task) => task.id === id)[0];
    const completedTask: taskType = { ...taskToUpdate, isCompleted: true };
    const filteredTaskList = taskList.filter((task) => task.id !== id);
    setTaskList([...filteredTaskList, completedTask]);
  }

  function deleteTask(id: string) {
    setTaskList(taskList.filter((task) => task.id !== id));
  }

  const isSuccess =
    taskList.length == taskList.filter((task) => task.isCompleted).length;

  return (
    <main className={styles.wrapper}>
      <form className={styles.createForm} onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={(e) => handleNewTaskText(e)}
          required
        />
        <Button variant="create" type="submit">
          Criar
        </Button>
      </form>
      <section className={styles.taskList}>
        <header>
          <div className={styles.listData}>
            <p className={styles.titleText}> Tarefas Criadas</p>
            <span>{taskList.length}</span>
          </div>
          <div className={styles.listData}>
            {isSuccess ? (
              <p className={styles.successText}>
                Todas as {taskList.length} tarefas concluídas!
              </p>
            ) : (
              <>
                <p className={styles.completedText}>Concluídas</p>
                <span className={isSuccess ? styles.successText : ""}>
                  {taskList.filter((task) => task.isCompleted == true).length}{" "}
                  de {taskList.length}
                </span>
              </>
            )}
          </div>
        </header>
        <div className={styles.cardList}>
          {taskList
            .filter((task) => task.isCompleted == false)
            .map((task) => (
              <TaskCard
                task={task}
                onComplete={completeTask}
                onDelete={deleteTask}
                key={task.id}
              />
            ))}
          {taskList
            .filter((task) => task.isCompleted == true)
            .map((task) => (
              <TaskCard
                task={task}
                onComplete={completeTask}
                onDelete={deleteTask}
                key={task.id}
              />
            ))}
        </div>
      </section>
    </main>
  );
};
