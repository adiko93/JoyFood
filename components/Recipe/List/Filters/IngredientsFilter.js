import { Button, Form, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients, updateFilters } from "../../../../state/listSlice";

function IngredientsFilter() {
  const dispatch = useDispatch();
  const ingredientsState = useSelector(getIngredients);

  const eventHandler = (event) => {
    let filtersTemp = [...ingredientsState];
    if (event.target.name === "removeIngredient") {
      filtersTemp = filtersTemp.filter(
        (value) => filtersTemp.indexOf(value) != event.target.value
      );
    } else {
      filtersTemp[parseInt(event.target.slot)] = event.target.value;
    }
    dispatch(updateFilters({ name: "ingredients", value: filtersTemp }));
  };
  return (
    <Form
      name="ingredients"
      autoComplete="off"
      initialValues={{
        ingredientsList: ingredientsState?.map((ingredientValue) => {
          return { ingredient: ingredientValue };
        }),
      }}
    >
      <Form.List name="ingredientsList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
              <Space
                key={key}
                align="baseline"
                style={{
                  width: "100%",
                }}
              >
                <Form.Item
                  {...restField}
                  name={[name, "ingredient"]}
                  fieldKey={[fieldKey, "ingredient"]}
                  style={{
                    width: "100%",
                    marginBottom: "1rem",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Dont leave empty fields",
                    },
                  ]}
                >
                  <Input
                    placeholder="Ingredient"
                    slot={index}
                    style={{
                      width: "100%",
                    }}
                    name={`ingredient`}
                    onChange={eventHandler}
                  />
                </Form.Item>
                <MinusCircleOutlined
                  onClick={() => {
                    remove(name);
                    eventHandler({
                      target: {
                        name: "removeIngredient",
                        value: index,
                      },
                    });
                  }}
                />
              </Space>
            ))}
            <Form.Item style={{ marginBottom: "1rem" }}>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
}

export default React.memo(IngredientsFilter);
