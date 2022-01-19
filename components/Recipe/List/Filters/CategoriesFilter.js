import { Checkbox } from "antd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, updateFilters } from "../../../../state/listSlice";

export default function CategoriesFilter({ categories }) {
  const dispatch = useDispatch();
  const categoriesState = useSelector(getCategories);

  const eventHandler = (event) => {
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
}
