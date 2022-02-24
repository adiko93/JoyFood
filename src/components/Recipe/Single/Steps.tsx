import { makeUniqueId } from "@apollo/client/utilities";
import { Image } from "antd";
import styles from "../../../styles/Recipe/Single/Steps.module.scss";
import { RecipeClass } from "../../../types";
import { SITE_BACKEND_URL } from "../../../utility/globals";

const Steps: React.FC<{ recipe: RecipeClass }> = ({ recipe }) => {
  return (
    <div className={styles.container}>
      {recipe.stepsCategories!.map((category) => {
        return (
          <div key={makeUniqueId("STEPCATEGORY")}>
            <div className={styles.categoryTitle}>{category.title}</div>
            {category.steps.map((step, index) => {
              return (
                <div className={styles.step} key={makeUniqueId("STEP")}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <div className={styles.stepDescription}>
                    {step.description}
                  </div>
                  {step?.image ? (
                    <div className={styles.stepPicture}>
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
