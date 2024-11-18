import { taskType } from "../../types";
import { Button } from "../Button/Button";
import { CheckButton } from "../CheckButton/CheckButton";
import styles from "./TaskCard.module.css";

interface taskCardProps {
  task: taskType;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onComplete, onDelete }: taskCardProps) => {
  return (
    <article className={styles.card}>
      <CheckButton
        isChecked={task.isCompleted}
        toggleCompleted={() => onComplete(task.id)}
        disabled={task.isCompleted}
        aria-label="Complete current task"
      />
      <p className={task.isCompleted ? styles.contentComplete : styles.content}>
        {task.text}
      </p>
      <Button
        variant="delete"
        onClick={() => onDelete(task.id)}
        disabled={task.isCompleted}
      />
    </article>
  );
};
