import AuthorFilter from "./Filters/AuthorFilter";
import CategoriesFilter from "./Filters/CategoriesFilter";
import CookingTimeFilter from "./Filters/CookingTimeFilter";
import RatingFilter from "./Filters/RatingFilter";
import SearchFilter from "./Filters/SearchFilter";

import { Collapse } from "antd";
import styles from "../../../styles/Recipe/List.module.css";
import _ from "lodash";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getFilters } from "../../../state/listSlice";
import { ReactElement } from "react";
import { RecipeCategories } from "../../../types";

const Filters: React.FC<{ categories: RecipeCategories[] }> = ({
  categories,
}) => {
  let state: ReactElement;
  const router = useRouter();
  const filters = useSelector(getFilters);

  const { Panel } = Collapse;

  state = (
    <div className={styles.filters}>
      <div className={styles.filters_title}>Filters</div>
      <Collapse
        expandIconPosition="right"
        defaultActiveKey={[
          "categories",
          "search",
          router.query?.cookingTime! && "cookingtime",
          router.query?.rating! && "rating",
          router.query?.author! && "author",
          router.query?.ingredients! && "ingredients",
        ]}
      >
        <Panel header="Search" key="search">
          <SearchFilter />
        </Panel>
        <Panel header="Categories" key="categories">
          <CategoriesFilter categories={categories} />
        </Panel>
        <Panel header="Rating" key="rating">
          <RatingFilter />
        </Panel>
        <Panel header="Cooking Time" key="cookingtime">
          <CookingTimeFilter />
        </Panel>
        {/*TODO: Deep filtering on backend
        <Panel header="Ingredients" key="ingredients">
          <IngredientsFilter defaultIngredients={filters.ingredients} />
        </Panel> */}
        <Panel header="Author" key="author">
          <AuthorFilter />
        </Panel>
      </Collapse>
    </div>
  );

  return state;
};

export default Filters;
