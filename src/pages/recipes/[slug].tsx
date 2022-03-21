import _ from "lodash";
import { Button, Result, Spin } from "antd";
import Header from "../../components/Recipe/Single/Header";
import Ingredients from "../../components/Recipe/Single/Ingredients";
import Steps from "../../components/Recipe/Single/Steps";
import Layout from "../../components/Layout/Layout";
import Reviews from "../../components/Recipe/Single/Reviews";
import { useQuery } from "react-query";
import { fetchRecipes, queryFullRecipe } from "../../query/queries";
import { useRouter } from "next/router";

const Recipe: React.FC<{ slug: string }> = ({ slug }) => {
  const { data, status } = useQuery("recipeSlug", async () => {
    return await fetchRecipes(queryFullRecipe(slug));
  });
  const router = useRouter();

  if (status === "loading")
    return (
      <Spin
        tip="Loading..."
        spinning={status === "loading"}
        size="large"
        style={{
          margin: "auto",
          display: "block",
          paddingTop: "10rem",
        }}
      />
    );

  if (data?.length < 1 || status === "error") {
    return (
      <Layout title="Error" activeNav="home">
        <Result
          style={{
            width: "100%",
            textAlign: "center",
          }}
          status="error"
          title="Something went wrong"
          subTitle={`Recipe not found :(`}
          extra={[
            <Button key="home" onClick={() => router.push("/")}>
              Go to home page
            </Button>,
          ]}
        ></Result>
      </Layout>
    );
  }
  console.log(data[0]);
  return (
    <Layout title={data[0].title} activeNav="recipes">
      <>
        <Header recipe={data[0]} />
        <Ingredients recipe={data[0]} />
        <Steps recipe={data[0]} />
        <Reviews recipe={data[0]} />
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
