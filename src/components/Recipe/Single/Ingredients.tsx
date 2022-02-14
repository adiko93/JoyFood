import { Button, Checkbox, Divider } from "antd";
import styles from "../../../styles/Recipe/Single/Ingredients.module.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { makeUniqueId } from "@apollo/client/utilities";
import { RecipeClass } from "../../../types";

const Ingredients: React.FC<{ recipe: RecipeClass }> = ({ recipe }) => {
  return (
    <div className={styles.container}>
      {recipe.ingredientsCategories!.map((category) => {
        return (
          <div key={makeUniqueId("INGREDIENT")}>
            <div className={styles.title}>{category.title}:</div>
            <div className={styles.list}>
              {category.ingredients.map((ingredient, index) => {
                return (
                  <Checkbox
                    key={index}
                    style={{ marginLeft: "0", fontSize: "1.6rem" }}
                  >{`${ingredient.quantity ? `${ingredient.quantity} ` : ""}${
                    ingredient.unit ? `${ingredient.unit} ` : ""
                  }${ingredient.description}`}</Checkbox>
                );
              })}
            </div>
            <Divider type="horizontal" />
          </div>
        );
      })}

      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        style={{
          fontSize: "1.6rem",
          width: "25rem",
          alignSelf: "center",
          marginBlock: "2rem",
        }}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default Ingredients;
