import styles from "../../styles/User/AuthLayout.module.css";

const AuthLayout: React.FC = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.bar}>{props.children}</div>
    </div>
  );
};

export default AuthLayout;
