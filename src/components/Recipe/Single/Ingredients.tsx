import { Button, Checkbox, Divider } from "antd";
import styles from "../../../styles/Recipe/Single/Ingredients.module.scss";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { makeUniqueId } from "@apollo/client/utilities";
import { RecipeClassInterface } from "../../../types";

const Ingredients: React.FC<{ recipe: RecipeClassInterface }> = ({
  recipe,
}) => {
  return (
    <div className={styles.container}>
      {recipe.ingredientsCategories!.map((category) => {
        return (
          <div key={makeUniqueId("INGREDIENT")}>
            <div className={styles.title}>{category.title}:</div>
            <div className={styles.list}>
              {category.ingredients.map((ingredient, index) => {
                return (
                  <Checkbox key={index} className={styles.listIngredient}>{`${
                    ingredient?.quantity || ""
                  } ${ingredient?.unit || ""} ${
                    ingredient?.description
                  }`}</Checkbox>
                );
              })}
            </div>
          </div>
        );
      })}

      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        className={styles.button}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default Ingredients;
