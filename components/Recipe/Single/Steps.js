import { Image } from "antd";
import styles from "../../../styles/Recipe/Steps.module.css";
import { SITE_BACKEND_URL } from "../../../utility/globals";

export default function Steps({ recipe }) {
  return (
    <div className={styles.container}>
      {recipe.steps_categories.map((category, index) => {
        return (
          <>
            <div className={styles.categoryTitle}>{category.title}</div>
            {category.steps.map((step, index) => {
              return (
                <div className={styles.step} key={index}>
                  <div className={styles.number}>{index + 1}</div>
                  <div className={styles.description}>{step.description}</div>
                  {step.image?.id ? (
                    <div className={styles.picture}>
                      <Image
                        width="15rem"
                        height="15rem"
                        src={`${SITE_BACKEND_URL}/assets/${step.image.id}`}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </>
        );
      })}
    </div>
  );
}
