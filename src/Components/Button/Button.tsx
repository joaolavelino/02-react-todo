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

  const buttonContent = () => {
    switch (variant) {
      case "create":
        return <>{children}</>;
        break;

      case "delete":
        return <Trash weight="bold" size={20} />;
        break;

      case "primary":
        return <>{children}</>;
        break;

      default:
        return <>{children}</>;
        break;
    }
  };

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
