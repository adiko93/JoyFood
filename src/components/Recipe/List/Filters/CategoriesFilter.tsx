import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, updateFilters } from "../../../../state/listSlice";
import { RecipeCategories } from "../../../../types";

const CategoriesFilter: React.FC<{ categories: RecipeCategories[] }> = ({
  categories,
}) => {
  const dispatch = useDispatch();
  const categoriesState = useSelector(getCategories);

  const eventHandler = (event: CheckboxChangeEvent) => {
    let categoriesTemp = [...categoriesState];
    if (event.target.checked) categoriesTemp.push(event.target.value);
    if (!event.target.checked)
      categoriesTemp = categoriesTemp.filter(
        (key) => key !== event.target.value
      );
    dispatch(updateFilters({ name: "categories", value: categoriesTemp }));
  };
  return (
    <>
      {categories.map((category) => {
        return (
          <div key={category.id}>
            <Checkbox
              value={category.id}
              name="categories"
              defaultChecked={categoriesState.includes(category.id)}
              style={{ marginBottom: ".7rem" }}
              onChange={eventHandler}
            >
              {category.title}
            </Checkbox>
          </div>
        );
      })}
    </>
  );
};

export default CategoriesFilter;
