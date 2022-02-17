import {
  RecipeCategories,
  RecipeCategoriesQuery,
  RecipeClass,
  RecipeIngredientQuery,
  RecipeIngredients,
  RecipeIngredientsCategories,
  RecipeIngredientsCategoriesQuery,
  RecipeQuery,
  RecipeReviewQuery,
  RecipeReviews,
  RecipeStepQuery,
  RecipeSteps,
  RecipeStepsCategories,
  RecipeStepsCategoriesQuery,
} from "../types";

export class Recipe implements RecipeClass {
  id;
  title;
  description?;
  servings?;
  cookingTime?;
  publisher?;
  status?;
  rating?;
  categories?;
  ingredientsCategories?;
  stepsCategories?;
  images?;
  reviews?;
  dateCreated?;

  constructor(recipeInput: RecipeQuery) {
    this.id = recipeInput?.id;
    this.title = recipeInput?.title;
    this.description = recipeInput?.description;
    this.servings = recipeInput?.servings;
    this.cookingTime = recipeInput?.cooking_time;
    this.status = recipeInput?.status;
    this.publisher = recipeInput?.publisher;
    this.rating = recipeInput?.rating;
    this.dateCreated = recipeInput?.date_created;
    this.categories = recipeInput?.categories?.map(
      (category: RecipeCategoriesQuery): RecipeCategories => {
        return {
          id: category.category_id.id,
          title: category.category_id.title,
        };
      }
    );
    this.ingredientsCategories = recipeInput?.ingredients_categories?.map(
      (
        category: RecipeIngredientsCategoriesQuery
      ): RecipeIngredientsCategories => {
        return {
          title: category.title,
          ingredients: category?.ingredients.map(
            (ingredient: RecipeIngredientQuery): RecipeIngredients => {
              return {
                quantity: ingredient.quantity,
                unit: ingredient.unit,
                description: ingredient.description,
              };
            }
          ),
        };
      }
    );
    this.stepsCategories = recipeInput?.steps_categories?.map(
      (category: RecipeStepsCategoriesQuery): RecipeStepsCategories => {
        return {
          title: category.title,
          steps: category.steps.map((step: RecipeStepQuery): RecipeSteps => {
            return { description: step.description, image: step.image?.id };
          }),
        };
      }
    );
    this.images = recipeInput?.images?.map(
      (image: any): string => image.directus_files_id.id
    );
    this.reviews = recipeInput?.reviews?.map(
      (review: RecipeReviewQuery): RecipeReviews => {
        return {
          id: review.id,
          title: review.title,
          rating: review.rating,
          description: review.description,
          dateCreated: review.date_created,
          author: {
            id: review.user_created.id,
            username: review.user_created.username,
            avatar: review.user_created?.avatar?.id,
          },
        };
      }
    );
  }
}
