import { client } from "../_app";
import {
  CATEGORIES,
  FILTER_SEARCH,
  FILTER_SEARCH_COUNT,
  MAX_COOKING_TIME,
} from "../../apollo/queries";
import styles from "../../styles/Recipe/List.module.css";
import _ from "lodash";
import Filters from "../../components/Recipe/List/Filters";
import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import RecipeCard from "../../components/UI/RecipeCard";
import { Button, Pagination, Result, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MehOutlined } from "@ant-design/icons";
import {
  getFilters,
  getPage,
  getPagination,
  getPerPage,
  updateFilters,
  updatePagination,
} from "../../state/listSlice";
import { updateMaxCookingTime } from "../../state/utilitySlice";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";

export default function List({
  categories = null,
  maxCookingTime = null,
  errors = null,
}) {
  const router = useRouter();

  const dispatch = useDispatch();
  const pageState = useSelector(getPage);
  const perPageState = useSelector(getPerPage);
  const paginationState = useSelector(getPagination);
  const filters = useSelector(getFilters);
  const [loadingDefaults, setLoadingDefaults] = useState(true);
  const [isError, setIsError] = useState();

  const FILTER_DEFAULTS = {
    search: "",
    categories: [],
    cookingTime: [1, maxCookingTime],
    ingredients: [],
    rating: [0, 5],
    author: "",
    page: 1,
    perPage: 12,
  };
  const [itemsCount, setItemsCount] = useState(0);
  const [queryRecipe, { data, error, loading }] = useLazyQuery(FILTER_SEARCH);
  const [
    queryCount,
    { data: countData, error: countError, loading: countLoading },
  ] = useLazyQuery(FILTER_SEARCH_COUNT, {
    onCompleted: (data) => {
      setItemsCount(data.recipes.length);
    },
  });

  const getTitle = useMemo(() => {
    let categoriesList = [];
    if (router.query?.categories)
      router.query.categories.split(",").forEach((category) => {
        return categories?.forEach((match) => {
          if (match.id === category) categoriesList.push(match.title);
        });
      });
    if (router.query?.categories && router.query?.search)
      return (
        <>
          Search results for "<span>{router.query.search}</span>" in{" "}
          <span>{categoriesList.join(", ")}</span>{" "}
          {categoriesList.length > 1 ? "categories" : "category"}
        </>
      );
    if (router.query?.search)
      return (
        <>
          {" "}
          Search results for "<span>{router.query.search}</span>"
        </>
      );
    if (router.query?.categories)
      return (
        <>
          <span>{categoriesList.join(", ")}</span>{" "}
          {categoriesList.length > 1 ? "categories" : "category"}
        </>
      );
    return `Recipes`;
  }, [router.query]);

  useEffect(() => {
    async function funct() {
      // await dispatch(resetToDefault());
      await dispatch(updateMaxCookingTime(maxCookingTime));
      await dispatch(
        updateFilters({ name: "cookingTime", value: [1, maxCookingTime] })
      );
      await _.forEach(router.query, async (value, key) => {
        if (key === "page" || key === "perPage") {
          await dispatch(
            updatePagination({ name: key, value: parseInt(value) })
          );
        } else {
          await dispatch(updateFilters({ name: key, value: value.split(",") }));
        }
      });

      setLoadingDefaults(false);
    }
    funct();
  }, []);

  const debounce = _.debounce(() => sendQuery(true, false), 1000, {
    maxWait: 1000,
  });

  useEffect(() => {
    if (!loadingDefaults) {
      debounce();
      return debounce.cancel;
    }
  }, [filters]);

  useEffect(() => {
    if (!loadingDefaults) {
      sendQuery(false, true);
    }
  }, [paginationState]);

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

  useEffect(() => {
    let filterQueries = [];
    if (router.query?.search)
      router.query.search.split(" ").forEach((keyword) => {
        filterQueries.push({
          slug: { _contains: keyword.toLowerCase() },
        });
      });

    if (router.query?.categories)
      router.query.categories.split(",").forEach((category) => {
        filterQueries.push({
          categories: {
            categories_id: {
              id: { _contains: category },
            },
          },
        });
      });
    if (router.query?.cookingTime) {
      const cookingTimeQuery = router.query.cookingTime.split(",");
      filterQueries.push({
        cooking_time: { _lte: parseFloat(cookingTimeQuery[1]) },
      });
      filterQueries.push({
        cooking_time: { _gte: parseFloat(cookingTimeQuery[0]) },
      });
    }
    if (router.query?.ingredients)
      router.query.ingredients.split(",").forEach((ingredient) => {
        filterQueries.push({
          ingredients: {
            description: { _contains: ingredient },
          },
        });
      });
    if (router.query?.author)
      filterQueries.push({
        _or: [
          {
            author: {
              nickname: { _contains: router.query.author.toLowerCase() },
            },
          },
          { publisher: { _contains: router.query.author } },
        ],
      });

    // RATING FILTER QUERY
    // if (router.query?.categories)
    //   router.query.categories.split(",").forEach((category) => {
    //     filterQueries.push({
    //       categories: {
    //         categories_id: {
    //           id: { _contains: category },
    //         },
    //       },
    //     });
    //   });
    try {
      queryCount({
        variables: {
          filters: filterQueries,
        },
      });
      queryRecipe({
        variables: {
          filters: filterQueries,
          page: parseInt(router.query?.page || 1),
          perPage: parseInt(router.query?.perPage || perPageState),
        },
      });
    } catch (err) {
      setIsError(err);
    }
  }, [router.query]);

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
          {loadingDefaults ? (
            ""
          ) : (
            <Filters
              categories={categories}
              maxCookingTime={maxCookingTime}
              sendQuery={sendQuery}
              defaults={FILTER_DEFAULTS}
            />
          )}
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
              {getTitle} (<span>{itemsCount}</span> found)
            </div>
            <div className={styles.recipes_list}>
              {data?.recipes.length > 0 ? (
                data?.recipes.map((recipe) => {
                  return <RecipeCard recipe={recipe} key={recipe.slug} />;
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
                current={parseInt(router.query?.page || 1)}
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
}

export async function getServerSideProps(props) {
  try {
    const { data: categoriesResult, error: categoriesError } =
      await client.query({ query: CATEGORIES });
    const { data: maxCookingTimeResult, error: maxCookingError } =
      await client.query({
        query: MAX_COOKING_TIME,
      });

    return {
      props: {
        categories: categoriesResult.categories,
        maxCookingTime: maxCookingTimeResult.recipes[0].cooking_time,
        errors: categoriesError || maxCookingError || null,
      },
    };
  } catch (err) {
    return {
      props: {
        errors: {
          message: err.message,
        },
      },
    };
  }
}
