import AuthorFilter from "./Filters/AuthorFilter";
import CategoriesFilter from "./Filters/CategoriesFilter";
import CookingTimeFilter from "./Filters/CookingTimeFilter";
import RatingFilter from "./Filters/RatingFilter";
import SearchFilter from "./Filters/SearchFilter";

import { Collapse } from "antd";
import styles from "../../../styles/Recipe/List.module.scss";
import _ from "lodash";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getFilters } from "../../../state/listSlice";
import { ReactElement } from "react";
import { RecipeCategories } from "../../../types";
import IngredientsFilter from "./Filters/IngredientsFilter";

const Filters: React.FC = () => {
  let state: ReactElement;
  const router = useRouter();
  const filters = useSelector(getFilters);

  const { Panel } = Collapse;

  state = (
    <div className={styles.filters}>
      <div className={styles.filtersTitle}>Filters</div>
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
          <CategoriesFilter />
        </Panel>
        <Panel header="Rating" key="rating">
          <RatingFilter />
        </Panel>
        <Panel header="Cooking Time" key="cookingtime">
          <CookingTimeFilter />
        </Panel>
        <Panel header="Ingredients" key="ingredients">
          <IngredientsFilter />
        </Panel>
        <Panel header="Author" key="author">
          <AuthorFilter />
        </Panel>
      </Collapse>
    </div>
  );

  return state;
};

export default Filters;
