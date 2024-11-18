import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react";
import { Button } from "../Button/Button";
import { TaskCard } from "../TaskCard/TaskCard";
import styles from "./Main.module.css";
import { v4 as uuidv4 } from "uuid";
import { taskType } from "../../types";

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

  function handleCommentValidation(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("O nome da tarefa não pode ser vazio");
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

  return (
    <main className={styles.wrapper}>
      <form className={styles.createForm} onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={(e) => handleNewTaskText(e)}
          required
          onInvalid={handleCommentValidation}
        />
        <Button variant="create" type="submit">
          Criar
        </Button>
      </form>
      <section className={styles.taskList}>
        <header>infos das tasks</header>
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
