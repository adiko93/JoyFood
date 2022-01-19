import styles from "../../../styles/Recipe/Steps.module.css";

export default function Steps({ recipe }) {
  return (
    <div className={styles.container}>
      {recipe.steps.map((step, index) => {
        return (
          <div className={styles.step} key={index}>
            <div className={styles.number}>{step.sort}</div>
            <div className={styles.description}>{step.description}</div>
          </div>
        );
      })}
    </div>
  );
}
