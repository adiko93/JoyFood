import RecipesSection from "../components/Home/RecipesSection";
import Hero from "../components/Home/Hero";
import { CAROUSEL_RECIPES } from "../apollo/queries";
import Layout from "../components/Layout/Layout";
import { client } from "./_app";

export default function Home({ dinnerProps, breakfastProps, dessertProps }) {
  return (
    <Layout title="Home page" activeNav="home">
      <Hero />
      <RecipesSection
        recipes={dinnerProps}
        title="Dinner"
        svg="#icon-dinner"
        iconWidth="8rem"
      />
      <RecipesSection
        recipes={breakfastProps}
        title="Breakfast"
        svg="#icon-breakfast"
        iconWidth="9.5rem"
      />
      <RecipesSection
        recipes={dessertProps}
        title="Dessert"
        svg="#icon-dessert"
        iconWidth="4.5rem"
      />
    </Layout>
  );
}

export async function getServerSideProps() {
  const { data: dinnerRecipes } = await client.query({
    query: CAROUSEL_RECIPES,
    variables: {
      category: "dinner",
    },
  });
  const { data: breakfastRecipes } = await client.query({
    query: CAROUSEL_RECIPES,
    variables: {
      category: "breakfast",
    },
  });
  const { data: dessertRecipes } = await client.query({
    query: CAROUSEL_RECIPES,
    variables: {
      category: "dessert",
    },
  });

  return {
    props: {
      dinnerProps: dinnerRecipes.recipes,
      breakfastProps: breakfastRecipes.recipes,
      dessertProps: dessertRecipes.recipes,
    },
  };
}
