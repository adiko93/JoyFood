/* eslint-disable react-hooks/exhaustive-deps */
import styles from "../../styles/Recipe/List.module.scss";
import _ from "lodash";
import Filters from "../../components/Recipe/List/Filters";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import RecipeCard from "../../components/UI/RecipeCard";
import { Pagination, Result, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MehOutlined, RightOutlined } from "@ant-design/icons";
import {
  getFilters,
  getPagination,
  getPerPage,
  listInitialState,
  updateFilters,
  updatePagination,
} from "../../state/listSlice";
import Layout from "../../components/Layout/Layout";
import { StrapiRecipeFilters } from "../../types";
import { useQuery } from "react-query";
import {
  fetchRecipesWithCount,
  queryFilteredRecipes,
} from "../../query/queries";
import { queryClient } from "../_app";
import { getCategories } from "../../state/utilitySlice";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import ErrorPage from "../../components/Global/ErrorPage";

interface FilterDefaults {
  search: string;
  categories: string[];
  cookingTime: number[];
  ingredients: string[];
  rating: number[];
  author: string;
  page: number;
  perPage: number;
}

const FILTER_DEFAULTS: FilterDefaults = {
  search: "",
  categories: [],
  cookingTime: [1, 2000],
  ingredients: [],
  rating: [0, 5],
  author: "",
  page: 1,
  perPage: 12,
};

const List: React.FC = () => {
  const [loadingDefaults, setLoadingDefaults] = useState(true);
  const [filters, setFilters] = useState<StrapiRecipeFilters>({});
  const isFloatingFilters = useMediaQuery({ query: "(max-width: 1280px)" });
  const [filtersVisible, setFiltersVisible] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { query, isReady } = router;

  const perPageState = useSelector(getPerPage);
  const paginationState = useSelector(getPagination);
  const filtersState = useSelector(getFilters);
  const categories: any = useSelector(getCategories);

  const { data, status, error, isError } = useQuery(
    ["filteredRecipes", filters, paginationState],
    async () => {
      return await fetchRecipesWithCount(
        queryFilteredRecipes(filters!, {
          page: paginationState.page,
          pageSize: paginationState.perPage,
          withCount: true,
        })
      );
    }
  );

  // Title composer
  const getListTitle = useMemo(() => {
    let categoriesList: string[] = [];

    if (query?.categories)
      (query.categories as string).split(",").forEach((category) => {
        return categories?.forEach((match: any) => {
          if (Object.keys(match)[0] === category) {
            categoriesList.push(match[category].title);
          }
        });
      });

    if (query?.categories && query?.search)
      return (
        <>
          Search results for &quot;<span>{query.search}</span>&quot; in{" "}
          <span>{categoriesList.join(", ")}</span>{" "}
          {categoriesList.length > 1 ? "categories" : "category"}
        </>
      );

    if (query?.search)
      return (
        <>
          {" "}
          Search results for &quot;<span>{query.search}</span>&quot;
        </>
      );

    if (query?.categories)
      return (
        <>
          <span>{categoriesList.join(", ")}</span>{" "}
          {categoriesList.length > 1 ? "categories" : "category"}
        </>
      );

    return `Recipes`;
  }, [query, categories]);

  // Update state with URL queries on load
  useEffect(() => {
    if (loadingDefaults === true && isReady) {
      // console.log(query);
      _.forEach(query, (value, key) => {
        if (key === "page" || key === "perPage") {
          dispatch(
            updatePagination({ name: key, value: parseInt(value as string) })
          );
        } else {
          dispatch(
            updateFilters({ name: key, value: (value as string).split(",") })
          );
        }
      });
      setLoadingDefaults(false);
    }
  }, [query]);

  const sendQuery = useCallback(
    (resetPage, pagination) => {
      let queryParameters = "/recipes/list";
      let notFirst = false;

      _.forEach(filtersState, (value, key) => {
        if (_.isEqual(value, FILTER_DEFAULTS[key as keyof FilterDefaults]))
          return;
        if (!notFirst) {
          queryParameters = queryParameters.concat(`?${key}=${value}`);
          notFirst = true;
          return;
        }
        queryParameters = queryParameters.concat(`&${key}=${value}`);
      });

      _.forEach(paginationState, (value, key) => {
        if (_.isEqual(value, FILTER_DEFAULTS[key as keyof FilterDefaults]))
          return;
        if (resetPage && key === "page") {
          value = 1;
          dispatch(updatePagination({ name: "page", value: 1 }));
        }
        if (!notFirst) {
          queryParameters = queryParameters.concat(`?${key}=${value}`);
          notFirst = true;
          return;
        }
        queryParameters = queryParameters.concat(`&${key}=${value}`);
      });
      if (pagination) {
        router.push(queryParameters, queryParameters, { scroll: pagination });
        return;
      }
      router.replace(queryParameters, queryParameters, { scroll: pagination });
    },
    [filtersState, paginationState]
  );

  // Debounce search query
  const debounce = _.debounce(() => sendQuery(true, false), 1000, {
    maxWait: 1000,
  });

  useEffect(() => {
    if (!loadingDefaults) {
      debounce();
      return debounce.cancel;
    }
  }, [filtersState]);

  useEffect(() => {
    if (!loadingDefaults) {
      sendQuery(false, true);
    }
  }, [paginationState]);

  // Send query
  useEffect(() => {
    let filterQueries: StrapiRecipeFilters = {
      $and: [],
    };

    if (query?.categories)
      (query.categories as string).split(",").forEach((category) => {
        filterQueries.$and?.push({
          categories: {
            category_id: {
              $eq: category,
            },
          },
        });
      });
    if (query?.cookingTime) {
      const cookingTimeQuery = (query.cookingTime as string).split(",");
      filterQueries.$and?.push({
        cooking_time: { $lte: parseFloat(cookingTimeQuery[1]) },
      });
      filterQueries.$and?.push({
        cooking_time: { $gte: parseFloat(cookingTimeQuery[0]) },
      });
    }
    if (query?.rating) {
      const ratingQuery = (query.rating as string).split(",");
      filterQueries.$and?.push({
        rating: { $lte: parseFloat(ratingQuery[1].replace(".", ",")) },
      });
      filterQueries.$and?.push({
        rating: { $gte: parseFloat(ratingQuery[0].replace(".", ",")) },
      });
    }

    if (query?.ingredients)
      (query.ingredients as string).split(",").forEach((ingredient) => {
        filterQueries.$and?.push({
          ingredients_categories: {
            ingredients: {
              description: { $containsi: ingredient },
            },
          },
        });
      });
    if (query?.author)
      filterQueries.$and?.push({
        author: {
          username: {
            $containsi: (query.author as string).toLowerCase(),
          },
        },
      });

    if (query?.search) {
      (query?.search as string).split(" ").forEach((word) => {
        filterQueries.$and!.push({
          title: {
            $containsi: word,
          },
        });
      });
    }

    setFilters(filterQueries);
    queryClient.invalidateQueries("filteredRecipes");
  }, [query]);

  // Error handler
  if (isError) return <ErrorPage errorMessage={(error as any).message} />;

  let filtersProp;

  const animateVariants = {
    hidden: { x: "-34rem" },
    visible: { x: 0 },
  };

  if (!loadingDefaults) {
    if (isFloatingFilters) {
      filtersProp = (
        <>
          <motion.div
            className={styles.filtersButton}
            onClick={() => {
              setFiltersVisible((current) => !current);
            }}
            animate={{
              x: filtersVisible ? "34rem" : 0,
            }}
            transition={{
              type: "tween",
            }}
          >
            Filters{" "}
            <motion.div
              animate={{
                rotate: filtersVisible ? 180 : 0,
                x: filtersVisible ? -4 : 0,
                y: filtersVisible ? 3 : 0,
              }}
              style={{
                paddingTop: ".3rem",
                display: "inline-block",
                color: "black",
                fontSize: "1.2rem",
              }}
            >
              <RightOutlined />
            </motion.div>
          </motion.div>
          <motion.div
            variants={animateVariants}
            className={styles.filters}
            animate={filtersVisible ? "visible" : "hidden"}
            transition={{
              type: "tween",
            }}
          >
            <Filters />
          </motion.div>
          <motion.div
            animate={{
              display: "block",
              opacity: filtersVisible ? 1 : 0,
              transitionEnd: {
                display: filtersVisible ? "block" : "none",
              },
            }}
            className={styles.filtersBackdrop}
            onClick={() => setFiltersVisible((current) => !current)}
          ></motion.div>
        </>
      );
    } else {
      filtersProp = (
        <div className={styles.filters}>
          <Filters />
        </div>
      );
    }
  }

  return (
    <Layout title="Recipes" activeNav="recipes">
      <div className={styles.container}>
        <Spin
          tip="Loading..."
          spinning={loadingDefaults}
          size="large"
          className={styles.spinner}
        >
          {filtersProp}
        </Spin>
        <Spin
          tip="Loading..."
          spinning={status === "loading"}
          size="large"
          className={styles.spinner}
        >
          <div className={styles.recipes}>
            <div className={styles.recipesTitle}>
              {getListTitle} (<span>{data?.pagination?.total}</span> found)
            </div>
            <div className={styles.recipesList}>
              {(data?.recipes?.length < 1 && status !== "loading") ||
              isError ? (
                <Result
                  icon={<MehOutlined />}
                  title="No recipes found!"
                  subTitle="Try to change your filters"
                  className={styles.recipesNotFound}
                />
              ) : (
                data?.recipes?.map((recipe: any) => {
                  return <RecipeCard recipe={recipe} key={recipe.slug} />;
                })
              )}
            </div>

            <Pagination
              className={styles.recipesPagination}
              pageSize={perPageState}
              total={data?.pagination?.total}
              defaultPageSize={12}
              pageSizeOptions={[12, 24, 36, 48]}
              current={parseInt((query?.page as string) || "1")}
              onChange={(page) => {
                dispatch(updatePagination({ name: "page", value: page }));
                queryClient.invalidateQueries("filteredRecipes");
              }}
              onShowSizeChange={(current, size) => {
                dispatch(updatePagination({ name: "perPage", value: size }));
                queryClient.invalidateQueries("filteredRecipes");
              }}
            ></Pagination>
          </div>
        </Spin>
      </div>
    </Layout>
  );
};

export default List;
