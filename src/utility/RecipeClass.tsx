import {
  RecipeCategories,
  RecipeCategoriesQuery,
  RecipeClassInterface,
  RecipeImages,
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
  StrapiImage,
} from "../types";
import { SITE_BACKEND_URL } from "./globals";

export class RecipeClass implements RecipeClassInterface {
  id;
  title;
  description?;
  servings?;
  cookingTime?;
  publisher?;
  publisherAvatar?;
  rating?;
  categories?;
  ingredientsCategories?;
  stepsCategories?;
  images?;
  reviews?;
  dateCreated?;
  dateUpdated?;
  slug?;
  publishedAt?;

  constructor(recipeInput: RecipeQuery) {
    this.id = recipeInput?.id;
    this.title = recipeInput?.attributes.title;
    this.slug = recipeInput?.attributes?.slug;
    this.description = recipeInput?.attributes?.description;
    this.servings = recipeInput?.attributes?.servings;
    this.cookingTime = recipeInput?.attributes?.cooking_time;
    this.rating = recipeInput?.attributes?.rating;
    this.dateCreated = recipeInput?.attributes?.createdAt;
    this.dateUpdated = recipeInput?.attributes?.updatedAt;
    this.publishedAt = recipeInput?.attributes?.publishedAt;
    this.publisher =
      recipeInput?.attributes?.author?.data?.attributes?.username ||
      "AllRecipes";
    this.publisherAvatar =
      recipeInput?.attributes?.author?.data?.attributes?.avatar?.data
        ?.attributes?.url &&
      `${SITE_BACKEND_URL}${recipeInput?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.url}`;

    this.categories = recipeInput?.attributes?.categories?.data.map(
      (category: RecipeCategoriesQuery): RecipeCategories => {
        return {
          id: category.id,
          stringId: category?.attributes?.category_id,
          title: category?.attributes?.title,
        };
      }
    );
    this.ingredientsCategories =
      recipeInput?.attributes?.ingredients_categories?.map(
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
    this.stepsCategories = recipeInput?.attributes.steps_categories?.map(
      (category: RecipeStepsCategoriesQuery): RecipeStepsCategories => {
        return {
          title: category.title,
          steps: category.steps.map((step: RecipeStepQuery): RecipeSteps => {
            return {
              description: step?.description,
              image:
                step?.image?.data?.attributes?.url &&
                `${SITE_BACKEND_URL}${step?.image?.data?.attributes?.url}`,
              sort: step.sort,
            };
          }),
        };
      }
    );
    this.images = recipeInput?.attributes.images?.data.map(
      (image: StrapiImage): RecipeImages => ({
        full: `${SITE_BACKEND_URL}${image.attributes.url}`,
        small: image?.attributes?.formats?.small?.url
          ? `${SITE_BACKEND_URL}${image?.attributes?.formats?.small?.url}`
          : undefined,
        medium: image.attributes.formats?.medium?.url
          ? `${SITE_BACKEND_URL}${image.attributes.formats?.medium?.url}`
          : undefined,
        thumbnail: image.attributes.formats?.thumbnail?.url
          ? `${SITE_BACKEND_URL}${image.attributes.formats?.thumbnail?.url}`
          : undefined,
      })
    );
    this.reviews = recipeInput?.attributes?.reviews?.data.map(
      (review: RecipeReviewQuery): RecipeReviews => {
        return {
          id: review?.id,
          title: review?.attributes?.title,
          rating: review?.attributes?.rating,
          description: review?.attributes?.description,
          dateCreated: review?.attributes?.createdAt,
          author: {
            id: review?.attributes?.author?.data?.id,
            username: review?.attributes?.author?.data?.attributes?.username,
            avatar: `${SITE_BACKEND_URL}${review?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.url}`,
          },
        };
      }
    );
  }
}
