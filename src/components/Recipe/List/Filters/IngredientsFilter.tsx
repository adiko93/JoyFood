import { Button, Form, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients, updateFilters } from "../../../../state/listSlice";

const IngredientsFilter: React.FC = () => {
  const dispatch = useDispatch();
  const ingredientsState = useSelector(getIngredients);

  const eventHandler = (event: {
    target: {
      name: string;
      value: number;
      slot: string;
    };
  }) => {
    let filtersTemp: string[] = [...ingredientsState];
    if (event.target.name === "removeIngredient") {
      filtersTemp = filtersTemp.filter(
        (value: string) => filtersTemp.indexOf(value) != event.target.value
      );
    } else {
      filtersTemp[parseInt(event.target.slot)] = event.target
        .value as unknown as string;
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
};

export default React.memo(IngredientsFilter);
