import { useLazyQuery, useQuery } from "@apollo/client";
import _ from "lodash";
import { RECIPE } from "../../apollo/queries";
import { Spin } from "antd";
import Header from "../../components/Recipe/Single/Header";
import Ingredients from "../../components/Recipe/Single/Ingredients";
import Steps from "../../components/Recipe/Single/Steps";
import Layout from "../../components/Layout/Layout";
import Reviews from "../../components/Recipe/Single/Reviews";
import { useEffect, useState } from "react";
import { Recipe as RecipeClass } from "../../utility/RecipeClass";

const Recipe: React.FC<{ slug: string }> = ({ slug }) => {
  const [fetchRecipes, { data, error, loading }] = useLazyQuery(RECIPE, {
    variables: {
      slugString: slug,
    },
  });

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  if (loading)
    return (
      <Spin
        tip="Loading..."
        spinning={loading}
        size="large"
        style={{
          margin: "auto",
          display: "block",
          paddingTop: "10rem",
        }}
      />
    );
  if (data?.recipe.length === 0 || error || !data?.recipe) {
    return <>No recipes found</>;
  }
  const recipe = new RecipeClass(data.recipe[0]);

  return (
    <Layout title={recipe.title} activeNav="recipes">
      <>
        <Header recipe={recipe} />
        <Ingredients recipe={recipe} />
        <Steps recipe={recipe} />
        <Reviews recipe={recipe} forceRefresh={fetchRecipes} />
      </>
    </Layout>
  );
};

export default Recipe;

export async function getServerSideProps(props: any) {
  return {
    props: {
      slug: _.get(props, "query.slug", null),
    },
  };
}
