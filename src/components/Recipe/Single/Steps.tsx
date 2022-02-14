import { makeUniqueId } from "@apollo/client/utilities";
import { Image } from "antd";
import styles from "../../../styles/Recipe/Single/Steps.module.css";
import { RecipeClass } from "../../../types";
import { SITE_BACKEND_URL } from "../../../utility/globals";

const Steps: React.FC<{ recipe: RecipeClass }> = ({ recipe }) => {
  return (
    <div className={styles.container}>
      {recipe.stepsCategories!.map((category, index) => {
        return (
          <div key={makeUniqueId("STEPCATEGORY")}>
            <div className={styles.categoryTitle}>{category.title}</div>
            {category.steps.map((step, index) => {
              return (
                <div className={styles.step} key={makeUniqueId("STEP")}>
                  <div className={styles.number}>{index + 1}</div>
                  <div className={styles.description}>{step.description}</div>
                  {step?.image ? (
                    <div className={styles.picture}>
                      <Image
                        width="15rem"
                        height="15rem"
                        src={`${SITE_BACKEND_URL}/assets/${step.image}`}
                        alt={String(step.image)}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
