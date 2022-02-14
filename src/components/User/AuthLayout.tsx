import styles from "../../styles/User/AuthLayout.module.css";

export default function AuthLayout(props) {
  return (
    <div className={styles.container}>
      <div className={styles.bar}>{props.children}</div>
    </div>
  );
}
