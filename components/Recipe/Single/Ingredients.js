import { Button, Checkbox } from "antd";
import styles from "../../../styles/Recipe/Ingredients.module.css";
import { ShoppingCartOutlined } from "@ant-design/icons";

export default function Ingredients({ recipe }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Ingredients:</div>
      <div className={styles.list}>
        {recipe.ingredients.map((ingredient, index) => {
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
