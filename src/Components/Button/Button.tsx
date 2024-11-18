import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { PlusCircle, Trash } from "phosphor-react";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "create" | "delete" | "primary";
  children?: ReactNode;
}

export const Button = ({
  variant = "primary",
  children,
  ...props
}: ButtonProps) => {
  const buttonStyle = variant === "create" ? styles.create : styles.delete;

  return (
    <button className={buttonStyle} {...props}>
      {variant != "delete" ? children : <></>}
      {variant == "create" ? (
        <PlusCircle weight="bold" size={20} />
      ) : variant == "delete" ? (
        <Trash weight="bold" size={20} />
      ) : (
        <></>
      )}
    </button>
  );
};
