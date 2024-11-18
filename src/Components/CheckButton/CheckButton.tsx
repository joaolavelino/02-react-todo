import { ButtonHTMLAttributes } from "react";
import styles from "./CheckButton.module.css";
import { Check } from "phosphor-react";

interface CheckButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked: boolean;
  toggleCompleted: () => void;
}

export const CheckButton = ({
  isChecked,
  toggleCompleted,
  ...props
}: CheckButtonProps) => {
  return (
    <button
      className={isChecked ? styles.checked : styles.unchecked}
      onClick={toggleCompleted}
      {...props}
    >
      {isChecked && <Check size={12} weight="bold" />}
    </button>
  );
};
