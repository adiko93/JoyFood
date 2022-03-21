import { makeUniqueId } from "@apollo/client/utilities";
import { Image } from "antd";
import styles from "../../../styles/Recipe/Single/Steps.module.scss";
import { RecipeClassInterface } from "../../../types";

const Steps: React.FC<{ recipe: RecipeClassInterface }> = ({ recipe }) => {
  return (
    <div className={styles.container}>
      {recipe.stepsCategories!.map((category) => {
        return (
          <div key={makeUniqueId("STEPCATEGORY")}>
            <div className={styles.categoryTitle}>{category.title}</div>
            {category.steps
              .sort((first, second) => first.sort - second.sort)
              .map((step, index) => {
                return (
                  <div className={styles.step} key={makeUniqueId("STEP")}>
                    <div className={styles.stepNumber}>{step.sort}</div>
                    <div className={styles.stepDescription}>
                      {step.description}
                    </div>
                    {step?.image ? (
                      <div className={styles.stepPicture}>
                        <Image
                          width="15rem"
                          height="15rem"
                          src={step.image as string}
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
