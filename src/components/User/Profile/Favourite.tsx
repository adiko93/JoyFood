import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_FAVOURITE_RECIPE } from "../../../apollo/mutations";
import { GET_USER_FAVOURITES } from "../../../apollo/queries";
import { setFavouriteRecipes } from "../../../state/authSlice";
import RecipeTable from "../../UI/RecipeTable";

function Favourite() {
  const [recipeData, setRecipeData] = useState();
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_USER_FAVOURITES, {
    context: {
      clientName: "system",
    },
    onCompleted: (data) => {
      setRecipeData(
        data?.users_me?.favourtie_recipes
          .map((recipe) => {
            return recipe.recipe_id;
          })
          .reverse()
      );
    },
  });

  const [updateFavouriteRecipes] = useMutation(UPDATE_FAVOURITE_RECIPE, {
    context: {
      clientName: "system",
    },
  });

  const deleteHandler = (id) => {
    const filteredRecipes = recipeData.filter((recipe) => recipe.id !== id);
    const filteredRecipesID = filteredRecipes.map((recipe) => recipe.id);
    updateFavouriteRecipes({
      variables: {
        recipes: filteredRecipesID.map((recipeId) => {
          return {
            recipe_id: { id: recipeId },
          };
        }),
      },
    });
    setRecipeData(filteredRecipes);
    dispatch(setFavouriteRecipes(filteredRecipesID));
  };

  return (
    <div>
      <RecipeTable
        recipes={recipeData}
        deleteHandler={(id) => deleteHandler(id)}
      />
    </div>
  );
}

export default Favourite;
