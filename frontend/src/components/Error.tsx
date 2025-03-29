import { FC } from "react";
import { NavLink } from "react-router";
import { ErrorProps } from "../types/manga-types";
import ErrorIcon from "../assets/ErrorIcon.png";
import styles from "../styles/Error.module.css";

const Error: FC<ErrorProps> = ({ title, status, message }) => {
  return (
    <div className={styles["error-container"]}>
      <img
        src={ErrorIcon}
        alt="Error Illustration"
        className={styles["error-image"]}
      />
      <h1 className={styles["error-title"]}>{title}</h1>
      <p className={styles["error-message"]}>{message}</p>
      <div className={styles["error-code"]}>
        Error Code: <span id="error-code-display">{status}</span>
      </div>
      <NavLink to="/" className={styles["home-button"]}>
        Return to Home
      </NavLink>
    </div>
  );
};

export default Error;
