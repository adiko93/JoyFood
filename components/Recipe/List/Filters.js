import AuthorFilter from "./Filters/AuthorFilter";
import CategoriesFilter from "./Filters/CategoriesFilter";
import CookingTimeFilter from "./Filters/CookingTimeFilter";
import IngredientsFilter from "./Filters/IngredientsFilter";
import RatingFilter from "./Filters/RatingFilter";
import SearchFilter from "./Filters/SearchFilter";

import { Collapse } from "antd";
import styles from "../../../styles/Recipe/List.module.css";
import _ from "lodash";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getFilters, getRerenderFilters } from "../../../state/listSlice";

export default function Filters({ categories }) {
  let state = {};
  const router = useRouter();
  const filters = useSelector(getFilters);
  const rerenderFiltersState = useSelector(getRerenderFilters);

  const { Panel } = Collapse;

  state = !rerenderFiltersState && (
    <div className={styles.filters}>
      <div className={styles.filters_title}>Filters</div>
      <Collapse
        expandIconPosition="right"
        defaultActiveKey={[
          "categories",
          "search",
          router.query?.cookingTime && "cookingtime",
          router.query?.rating && "rating",
          router.query?.author && "author",
          router.query?.ingredients && "ingredients",
        ]}
      >
        <Panel header="Search" key="search">
          <SearchFilter value={filters.search} />
        </Panel>
        <Panel header="Categories" key="categories">
          <CategoriesFilter categories={categories} filters={filters} />
        </Panel>
        <Panel header="Rating" key="rating">
          <RatingFilter value={filters.rating} />
        </Panel>
        <Panel header="Cooking Time" key="cookingtime">
          <CookingTimeFilter value={filters.cookingTime} />
        </Panel>
        <Panel header="Ingredients" key="ingredients">
          <IngredientsFilter defaultIngredients={filters.ingredients} />
        </Panel>
        <Panel header="Author" key="author">
          <AuthorFilter value={filters.author} />
        </Panel>
      </Collapse>
    </div>
  );

  return state;
}
