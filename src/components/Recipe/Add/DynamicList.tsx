import { Button, Input, InputNumber, Pagination } from "antd";
import { Form } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { SetStateAction, useState } from "react";
import style from "../../../styles/Recipe/Add/DynamicList.module.css";
import _ from "lodash";
import { RecipeIngredientsCategories } from "../../../types";
import { Dispatch } from "redux";

// TODO: REWORK SCSS + TSX

const DynamicList: React.FC<{
  categoryKey: number;
  ingredients: any;
  setIngredients: Function;
}> = ({ categoryKey, ingredients, setIngredients }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastKey, setLastKey] = useState(1);

  const categoryIndex = ingredients.findIndex(
    (category: any) => category.key === categoryKey
  );

  const addIngredient = (lastKey: any) => {
    let newIngredients = _.cloneDeep(ingredients);

    newIngredients[categoryIndex].ingredients.push({
      quantity: null,
      unit: "",
      description: "",
      key: lastKey++,
    });

    setLastKey((prevState) => prevState + 1);
    setIngredients(newIngredients);
    setCurrentPage(
      Math.floor((newIngredients[categoryIndex].ingredients.length - 1) / 10) +
        1
    );
  };

  const deleteIngredient = (key: number) => {
    let newIngredients = _.cloneDeep(ingredients);
    newIngredients[categoryIndex].ingredients = newIngredients[
      categoryIndex
    ].ingredients.filter((ingredient: any) => ingredient.key !== key);
    ingredients[categoryIndex].ingredients.length ===
      (currentPage - 1) * 10 + 1 && setCurrentPage((page) => page--);

    setIngredients(newIngredients);
  };

  const inputHandler = (value: any, key: any, inputName: any) => {
    let newIngredients = _.cloneDeep(ingredients);
    newIngredients[categoryIndex].ingredients = newIngredients[
      categoryIndex
    ].ingredients.map((ingredient: any) => {
      if (ingredient.key === key)
        ingredient[inputName] = value?.target?.value || value;

      return ingredient;
    });

    setIngredients(newIngredients);
  };

  const inputStyle = { marginBottom: "5px" };

  const mapIngredients = ingredients[categoryIndex].ingredients.map(
    (ingredient: any, index: any) => {
      if ((currentPage - 1) * 10 <= index && index <= currentPage * 10 - 1)
        return (
          <div className={style.row} key={index}>
            <Form.Item style={inputStyle}>
              <InputNumber
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(value) =>
                  inputHandler(value, ingredient.key, "quantity")
                }
                key={ingredient.key}
              />
            </Form.Item>
            <Form.Item style={inputStyle}>
              <Input
                placeholder="Unit"
                value={ingredient.unit}
                onChange={(value) =>
                  inputHandler(value, ingredient.key, "unit")
                }
                key={ingredient.key}
              />
            </Form.Item>
            <Form.Item className={style.inputIngredient} style={inputStyle}>
              <Input
                placeholder="Ingredient"
                value={ingredient.description}
                onChange={(value) =>
                  inputHandler(value, ingredient.key, "description")
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
    }
  );

  const shownIngredientsArrayLenght = mapIngredients.filter(
    (ingredient: any) => ingredient !== undefined
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
          <div></div>

          {ingredients[categoryIndex].ingredients.length > 9 ? (
            <Pagination
              className={style.pagination}
              size="small"
              current={currentPage}
              pageSize={10}
              total={ingredients[categoryIndex].ingredients.length + 1}
              onChange={(page) => setCurrentPage(page)}
            />
          ) : (
            <div></div>
          )}
        </div>
      </Form>
    </>
  );
};

export default DynamicList;
