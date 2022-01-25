import { Button, Input, InputNumber, Pagination } from "antd";
import { Form } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import style from "../../../styles/Recipe/Add/DynamicList.module.css";

function DynamicList({ test }) {
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastKey, setLastKey] = useState(0);

  const addIngredient = (lastKey) => {
    let newIngredientsArray = [...ingredientsArray];

    newIngredientsArray.push({
      quantity: 0,
      unit: "",
      ingredient: "",
      key: lastKey++,
    });
    setLastKey(lastKey++);
    setIngredientsArray(newIngredientsArray);
    setCurrentPage(Math.floor((newIngredientsArray.length - 1) / 10) + 1);
    console.log(newIngredientsArray, mapIngredients);
  };

  const deleteIngredient = (key) => {
    if (ingredientsArray.length === (currentPage - 1) * 10 + 1) {
      const page = currentPage;
      setCurrentPage(page - 1);
    }
    const newArray = ingredientsArray.filter(
      (ingredient) => ingredient.key !== key
    );
    setIngredientsArray(newArray);
  };

  const inputHandler = (value, key, inputName) => {
    const newArray = ingredientsArray.map((ingredient) => {
      if (ingredient.key === key) {
        let newIngredient = ingredient;
        newIngredient[inputName] = value?.target?.value || value;
        return newIngredient;
      }
      return ingredient;
    });
    setIngredientsArray(newArray);
  };

  const inputStyle = { marginBottom: "5px" };

  const mapIngredients = ingredientsArray.map((ingredient, index) => {
    if ((currentPage - 1) * 10 <= index && index <= currentPage * 10 - 1)
      return (
        <div className={style.row} key={index}>
          <Form.Item name={`quantity${ingredient.key}`} style={inputStyle}>
            <InputNumber
              placeholder="Quantity"
              name={`quantity${index}Value`}
              value={ingredient.quantity}
              style={inputStyle}
              onChange={(value) =>
                inputHandler(value, ingredient.key, "quantity")
              }
              key={ingredient.key}
            />
          </Form.Item>
          <Form.Item name={`unit${ingredient.key}`} style={inputStyle}>
            <Input
              style={inputStyle}
              placeholder="Unit"
              name={`unit${ingredient.key}Value`}
              value={ingredient.unit}
              onChange={(value) => inputHandler(value, ingredient.key, "unit")}
              key={ingredient.key}
            />
          </Form.Item>
          <Form.Item
            name={`ingredient${ingredient.key}`}
            className={style.inputIngredient}
            style={inputStyle}
          >
            <Input
              placeholder="Ingredient"
              style={inputStyle}
              name={`ingredient${ingredient.key}Value`}
              value={ingredient.ingredient}
              onChange={(value) =>
                inputHandler(value, ingredient.key, "ingredient")
              }
              key={ingredient.key}
            />
          </Form.Item>
          <MinusCircleOutlined
            className={style.minusIcon}
            onClick={() => deleteIngredient(ingredient.key)}
          />
        </div>
      );
  });

  const shownIngredientsArrayLenght = mapIngredients.filter(
    (ingredient) => ingredient !== undefined
  ).length;

  const addIngredientButton = (
    <Button
      type="dashed"
      icon={<PlusOutlined />}
      onClick={() => addIngredient(lastKey)}
    >
      Add ingredient
    </Button>
  );
  return (
    <>
      <Form name="ingredients" layout="vertical" className={style.container}>
        <div className={style.tabContainer}>
          {mapIngredients}
          {shownIngredientsArrayLenght < 10 && addIngredientButton}
        </div>

        <div className={style.bottomNavigation}>
          {shownIngredientsArrayLenght === 10 ? (
            addIngredientButton
          ) : (
            <div></div>
          )}
          {ingredientsArray.length > 10 ? (
            <Pagination
              className={style.pagination}
              size="small"
              current={currentPage}
              total={ingredientsArray.length}
              onChange={(page) => setCurrentPage(page)}
            />
          ) : (
            <div></div>
          )}
        </div>
      </Form>
    </>
  );
}

export default DynamicList;
