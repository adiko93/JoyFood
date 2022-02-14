import RecipesSection from "../components/Home/RecipesSection";
import Hero from "../components/Home/Hero";
import { CAROUSEL_RECIPES } from "../apollo/queries";
import Layout from "../components/Layout/Layout";
import client from "../apollo/client";
import { RecipeQuery } from "../types";
import createRecipesArray from "../utility/createRecipesArray";

const Home: React.FC<{
  dinnerProps: RecipeQuery[];
  breakfastProps: RecipeQuery[];
  dessertProps: RecipeQuery[];
}> = ({ dinnerProps, breakfastProps, dessertProps }) => {
  return (
    <Layout title="Home page" activeNav="home">
      <Hero />
      <RecipesSection
        recipes={createRecipesArray(dinnerProps)}
        title="Dinner"
        svg="#icon-dinner"
        iconWidth="8rem"
      />
      <RecipesSection
        recipes={createRecipesArray(breakfastProps)}
        title="Breakfast"
        svg="#icon-breakfast"
        iconWidth="9.5rem"
      />
      <RecipesSection
        recipes={createRecipesArray(dessertProps)}
        title="Dessert"
        svg="#icon-dessert"
        iconWidth="4.5rem"
      />
    </Layout>
  );
};

export default Home;

export async function getServerSideProps() {
  const { data: dinnerRecipes, error } = await client.query({
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
      dinnerProps: dinnerRecipes.recipe,
      breakfastProps: breakfastRecipes.recipe,
      dessertProps: dessertRecipes.recipe,
    },
  };
}
