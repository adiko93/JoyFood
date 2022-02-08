import { Button, Checkbox, Divider } from "antd";
import styles from "../../../styles/Recipe/Single/Ingredients.module.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { makeUniqueId } from "@apollo/client/utilities";

export default function Ingredients({ recipe }) {
  return (
    <div className={styles.container}>
      {recipe.ingredients_categories.map((category, index) => {
        return (
          <div key={makeUniqueId()}>
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
}
