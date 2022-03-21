import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesFilters,
  updateFilters,
} from "../../../../state/listSlice";
import { getCategories } from "../../../../state/utilitySlice";

const CategoriesFilter: React.FC = () => {
  const dispatch = useDispatch();
  const categoriesFliter = useSelector(getCategoriesFilters);
  const categories: any = useSelector(getCategories);

  const eventHandler = (event: CheckboxChangeEvent) => {
    let categoriesTemp = [...categoriesFliter];
    if (event.target.checked) categoriesTemp.push(event.target.value);
    if (!event.target.checked)
      categoriesTemp = categoriesTemp.filter(
        (key) => key !== event.target.value
      );
    dispatch(updateFilters({ name: "categories", value: categoriesTemp }));
  };
  if (categories.length === 0) {
    return <div></div>;
  }
  return (
    <>
      {categories.map((category: any, index: any) => {
        const categoryId = Object.keys(category)[0];
        return (
          <div key={categoryId}>
            <Checkbox
              value={categoryId}
              name="categories"
              defaultChecked={categoriesFliter.includes(categoryId)}
              style={{ marginBottom: ".7rem" }}
              onChange={eventHandler}
            >
              {categories[index][categoryId].title}
            </Checkbox>
          </div>
        );
      })}
    </>
  );
};

export default CategoriesFilter;
