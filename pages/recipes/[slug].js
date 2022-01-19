import { useQuery } from "@apollo/client";
import _ from "lodash";
import { RECIPE } from "../../apollo/queries";
import { Spin } from "antd";
import Header from "../../components/Recipe/Single/Header";
import Ingredients from "../../components/Recipe/Single/Ingredients";
import Steps from "../../components/Recipe/Single/Steps";
import Layout from "../../components/Layout/Layout";

export default function Recipe({ slug }) {
  const { data, error, loading } = useQuery(RECIPE, {
    variables: {
      slugString: slug,
    },
  });
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
  if (data.recipes.length === 0) {
    return <>No recipes found</>;
  }
  const recipe = data.recipes[0];

  console.log(recipe);
  return (
    <Layout title={recipe.title} activeNav="recipes">
      <Header recipe={recipe} />
      <Ingredients recipe={recipe} />
      <Steps recipe={recipe} />
    </Layout>
  );
}

export async function getServerSideProps(props) {
  return {
    props: {
      slug: _.get(props, "query.slug", null),
    },
  };
}
