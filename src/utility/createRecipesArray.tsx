import { RecipeClass, RecipeQuery } from "../types";
import { Recipe } from "../utility/RecipeClass";

const createRecipesArray = (recipe: RecipeQuery[]): RecipeClass[] =>
  recipe.map((recipe) => new Recipe(recipe));

export default createRecipesArray;
