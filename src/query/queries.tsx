import qs from "qs";
import { RecipeQuery, StrapiPagination, StrapiRecipeFilters } from "../types";
import { RecipeClass } from "../utility/RecipeClass";
import axiosStrapi from "./axiosInstance";

export const fetchRecipes = async (query: string) => {
  let response;
  try {
    response = await axiosStrapi.get(`/recipes?${query}`);
  } catch (error) {
    throw new Error(error as string);
  }
  return response.data.data.map(
    (recipe: RecipeQuery) => new RecipeClass(recipe)
  );
};

export const fetchRecipesWithCount = async (query: string) => {
  let response;
  try {
    response = await axiosStrapi.get(`/recipes?${query}`);
  } catch (error) {
    throw new Error(error as string);
  }
  return {
    recipes: response.data.data.map(
      (recipe: RecipeQuery) => new RecipeClass(recipe)
    ),
    pagination: response.data.meta.pagination,
  };
};

const recipeCardFields = {
  fields: [
    "title",
    "description",
    "rating",
    "servings",
    "cooking_time",
    "slug",
  ],
  populate: {
    ingredients_categories: {
      populate: ["ingredients"],
    },
    author: {
      fields: ["username"],
    },
    images: {
      fields: ["url"],
    },
  },
};

const recipeFullFields = {
  fields: [
    "title",
    "description",
    "rating",
    "servings",
    "cooking_time",
    "slug",
    "createdAt",
    "publishedAt",
  ],
  populate: {
    ingredients_categories: {
      populate: ["ingredients"],
    },
    steps_categories: {
      populate: {
        steps: {
          populate: ["image"],
        },
      },
    },
    categories: {
      fields: ["id", "title"],
    },
    author: {
      fields: ["username"],
      populate: {
        avatar: {
          fields: ["url"],
        },
      },
    },
    images: {
      fields: ["url"],
    },
    reviews: {
      populate: {
        author: {
          populate: {
            avatar: {
              fields: ["url"],
            },
          },
        },
      },
    },
  },
};

export const queryCategoryRecipes = (category: string) =>
  qs.stringify(
    {
      filters: {
        categories: {
          category_id: {
            $eq: category,
          },
        },
      },
      pagination: {
        page: 1,
        pageSize: 15,
      },
      ...recipeCardFields,
    },
    {
      encodeValuesOnly: true,
    }
  );
export const queryFavouriteRecipes = (favourites: number[]) =>
  qs.stringify(
    {
      filters: {
        id: { $in: favourites },
      },
      pagination: {
        page: 1,
        pageSize: 15,
      },
      ...recipeFullFields,
    },
    {
      encodeValuesOnly: true,
    }
  );

export const queryFilteredRecipes = (
  filters: StrapiRecipeFilters,
  pagination: StrapiPagination
) =>
  qs.stringify(
    {
      filters: filters,
      pagination: pagination,
      ...recipeCardFields,
    },
    {
      encodeValuesOnly: true,
    }
  );

export const queryFullRecipe = (slug: string) =>
  qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      pagination: {
        page: 1,
        pageSize: 1,
      },
      ...recipeFullFields,
    },
    {
      encodeValuesOnly: true,
    }
  );
