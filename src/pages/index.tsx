import RecipesSection from "../components/Home/RecipesSection";
import Hero from "../components/Home/Hero";
import Layout from "../components/Layout/Layout";
import { RecipeQuery } from "../types";
import { fetchRecipes, queryCategoryRecipes } from "../query/queries";
import { useQuery } from "react-query";
import { Spin } from "antd";

const Home: React.FC = () => {
  const { data: dataBreakfast, status: statusBreakfast } = useQuery(
    "recipeCategoriesBreakfast",
    async () => {
      return await fetchRecipes(queryCategoryRecipes("breakfast"));
    }
  );
  const { data: dataDinner, status: statusDinner } = useQuery(
    "recipeCategoriesDinner",
    async () => {
      return await fetchRecipes(queryCategoryRecipes("dinner"));
    }
  );
  const { data: dataDessert, status: statusDessert } = useQuery(
    "recipeCategoriesDessert",
    async () => {
      return await fetchRecipes(queryCategoryRecipes("dessert"));
    }
  );

  return (
    <Layout title="Home page" activeNav="home">
      <>
        <Hero />
        <Spin tip="Loading..." spinning={statusDinner === "loading"}>
          {statusDinner === "loading" ? (
            ""
          ) : (
            <RecipesSection
              recipes={dataDinner}
              title="Dinner"
              svg="#icon-dinner"
              iconWidth="80px"
            />
          )}
        </Spin>
        <Spin tip="Loading..." spinning={statusBreakfast === "loading"}>
          {statusBreakfast === "loading" ? (
            ""
          ) : (
            <RecipesSection
              recipes={dataBreakfast}
              title="Breakfast"
              svg="#icon-breakfast"
              iconWidth="95px"
            />
          )}
        </Spin>
        <Spin tip="Loading..." spinning={statusDessert === "loading"}>
          {statusDessert === "loading" ? (
            ""
          ) : (
            <RecipesSection
              recipes={dataDessert}
              title="Dessert"
              svg="#icon-dessert"
              iconWidth="45px"
            />
          )}
        </Spin>
      </>
    </Layout>
  );
};

export default Home;
