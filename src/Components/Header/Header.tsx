import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/rocket.png";

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="tilted rocket icon" className={styles.logo} />
      <h1>
        <p className={styles.titleBlue}>to</p>
        <p className={styles.titlePurple}>do</p>
      </h1>
    </header>
  );
};
