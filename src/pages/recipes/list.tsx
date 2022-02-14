import client from "../../apollo/client";
import {
  CATEGORIES,
  FILTER_SEARCH,
  FILTER_SEARCH_COUNT,
} from "../../apollo/queries";
import styles from "../../styles/Recipe/List.module.css";
import _ from "lodash";
import Filters from "../../components/Recipe/List/Filters";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import RecipeCard from "../../components/UI/RecipeCard";
import { Button, Pagination, Result, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MehOutlined } from "@ant-design/icons";
import {
  getFilters,
  getPagination,
  getPerPage,
  updateFilters,
  updatePagination,
} from "../../state/listSlice";
import Layout from "../../components/Layout/Layout";
import { type } from "os";
import { RecipeCategories } from "../../types";
import { Recipe } from "../../utility/RecipeClass";

const FILTER_DEFAULTS: {
  search: string;
  categories: string[];
  cookingTime: number[];
  ingredients: string[];
  rating: number[];
  author: string;
  page: number;
  perPage: number;
} = {
  search: "",
  categories: [],
  cookingTime: [1, 2000],
  ingredients: [],
  rating: [0, 5],
  author: "",
  page: 1,
  perPage: 12,
};

const List: React.FC<{
  categories: RecipeCategories[];
  errors: ApolloError;
}> = ({ categories = null, errors = null }) => {
  const [loadingDefaults, setLoadingDefaults] = useState(true);
  const [isError, setIsError] = useState();
  const [itemsCount, setItemsCount] = useState(0);

  const router = useRouter();
  const dispatch = useDispatch();
  const query = router.query;

  const perPageState = useSelector(getPerPage);
  const paginationState = useSelector(getPagination);
  const filters = useSelector(getFilters);

  const [queryFilteredRecipes, { data, error, loading }] =
    useLazyQuery(FILTER_SEARCH);
  const [
    queryCount,
    { data: countData, error: countError, loading: countLoading },
  ] = useLazyQuery(FILTER_SEARCH_COUNT, {
    onCompleted: (data) => {
      setItemsCount(data?.recipe.length || 0);
    },
  });

  // Title composer
  const getListTitle = useMemo(() => {
    let categoriesList: string[] = [];

    if (query?.categories)
      (query.categories as string).split(",").forEach((category) => {
        return categories?.forEach((match) => {
          if (match.id === category) categoriesList.push(match.title);
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
    async function funct() {
      _.forEach(query, async (value, key) => {
        if (key === "page" || key === "perPage") {
          await dispatch(
            updatePagination({ name: key, value: parseInt(value as string) })
          );
        } else {
          await dispatch(
            updateFilters({ name: key, value: (value as string).split(",") })
          );
        }
      });
      setLoadingDefaults(false);
    }
    funct();
  }, []);

  const sendQuery = useCallback(
    (resetPage, pagination) => {
      let queryParameters = "/recipes/list";
      let notFirst = false;

      _.forEach(filters, (value, key) => {
        if (_.isEqual(value, FILTER_DEFAULTS[key])) return;
        if (!notFirst) {
          queryParameters = queryParameters.concat(`?${key}=${value}`);
          notFirst = true;
          return;
        }
        queryParameters = queryParameters.concat(`&${key}=${value}`);
      });

      _.forEach(paginationState, (value, key) => {
        if (_.isEqual(value, FILTER_DEFAULTS[key])) return;
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
    [filters, paginationState]
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
  }, [debounce, loadingDefaults]);

  useEffect(() => {
    if (!loadingDefaults) {
      sendQuery(false, true);
    }
  }, [loadingDefaults, paginationState, sendQuery]);

  // Update URL with queries

  // Send query
  useEffect(() => {
    let filterQueries = [];
    // if (query?.search)
    //   query.search.split(" ").forEach((keyword) => {
    //     filterQueries.push({
    //       slug: { _contains: keyword.toLowerCase() },
    //     });
    //   });

    if (query?.categories)
      (query.categories as string).split(",").forEach((category) => {
        filterQueries.push({
          categories: {
            category_id: {
              id: { _contains: category },
            },
          },
        });
      });
    if (query?.cookingTime) {
      const cookingTimeQuery = (query.cookingTime as string).split(",");
      filterQueries.push({
        cooking_time: { _lte: parseFloat(cookingTimeQuery[1]) },
      });
      filterQueries.push({
        cooking_time: { _gte: parseFloat(cookingTimeQuery[0]) },
      });
    }
    if (query?.ingredients)
      (query.ingredients as string).split(",").forEach((ingredient) => {
        filterQueries.push({
          ingredients_categories: {
            ingredients: {
              description: { _contains: ingredient },
            },
          },
        });
      });
    if (query?.author)
      filterQueries.push({
        _or: [
          {
            user_created: {
              username: { _contains: (query.author as string).toLowerCase() },
            },
          },
          { publisher: { _contains: query.author } },
        ],
      });
    try {
      queryCount({
        variables: {
          filters: filterQueries,
          search: query?.search || null,
        },
      });
      queryFilteredRecipes({
        variables: {
          filters: filterQueries,
          page: parseInt((query?.page as string) || "1"),
          perPage: parseInt(query?.perPage || perPageState),
          search: query?.search || null,
        },
      });
    } catch (err: any) {
      setIsError(err);
    }
  }, [query]);

  // Error handler
  if (errors || error || countError)
    return (
      <Layout title="Error" activeNav="home">
        <div className={styles.container}>
          <Result
            style={{ width: "100%", gridColumn: "1/3", alignSelf: "center" }}
            status="error"
            title="Something went wrong"
            subTitle={`Please try to reload the page. Error message: ${
              errors?.message || error?.message || countError?.message
            }`}
            extra={[
              <Button key="reload" onClick={router.reload}>
                Refresh
              </Button>,
            ]}
          ></Result>
        </div>
      </Layout>
    );

  return (
    <Layout title="Recipes" activeNav="recipes">
      <div className={styles.container}>
        <Spin
          tip="Loading..."
          spinning={loadingDefaults}
          size="large"
          style={{
            margin: "auto",
            textAlign: "center",
          }}
        >
          {loadingDefaults ? "" : <Filters categories={categories!} />}
        </Spin>
        <Spin
          tip="Loading..."
          spinning={loading || countLoading}
          size="large"
          style={{
            margin: "auto",
            textAlign: "center",
          }}
        >
          <div className={styles.recipes}>
            <div className={styles.recipes_list_title}>
              {getListTitle} (<span>{itemsCount}</span> found)
            </div>
            <div className={styles.recipes_list}>
              {data?.recipe.length > 0 ? (
                data?.recipe.map((recipe: any) => {
                  return (
                    <RecipeCard recipe={new Recipe(recipe)} key={recipe.slug} />
                  );
                })
              ) : (
                <Result
                  icon={<MehOutlined />}
                  title="No recipes found!"
                  subTitle="Try to change your filters"
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    gridColumn: "1/4",
                  }}
                />
              )}
            </div>
            <div className={styles.bottom_pagination}>
              <Pagination
                style={{
                  width: "auto",
                  paddingTop: "1rem",
                  paddingRight: "1rem",
                }}
                pageSize={perPageState}
                total={itemsCount}
                defaultPageSize={12}
                pageSizeOptions={[12, 24, 36, 48]}
                current={parseInt((query?.page as string) || "1")}
                onChange={(page) => {
                  dispatch(updatePagination({ name: "page", value: page }));
                }}
                onShowSizeChange={(current, size) => {
                  dispatch(updatePagination({ name: "perPage", value: size }));
                }}
              ></Pagination>
            </div>
          </div>
        </Spin>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    const { data: categoriesResult, error: categoriesError } =
      await client.query({ query: CATEGORIES });

    return {
      props: {
        categories: categoriesResult.category,
        errors: categoriesError || null,
      },
    };
  } catch (err: any) {
    return {
      props: {
        errors: {
          message: err.message,
        },
      },
    };
  }
}

export default List;
