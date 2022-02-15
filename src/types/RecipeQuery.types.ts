export interface RecipeIngredientQuery {
  quantity: number;
  unit: string;
  description: string;
}

export interface RecipeStepQuery {
  description: string;
  image: string | FormData;
}

export interface RecipeStepsCategoriesQuery {
  title: string;
  steps: RecipeStepQuery[];
}

export interface RecipeIngredientsCategoriesQuery {
  title: string;
  ingredients: RecipeIngredientQuery[];
}

export interface RecipeUserQuery {
  id: string;
  username: string;
  avatar: { id: string };
}

export interface RecipeReviewQuery {
  id: string;
  title: string;
  rating: number;
  description: string;
  user_created: RecipeUserQuery;
  date_created: Date;
}

export interface RecipeCategoriesQuery {
  category_id: { id: string; title: string };
}

export interface RecipeQuery {
  id: string;
  title: string;
  servings: number;
  publisher: string;
  cooking_time: number;
  status: string;
  rating: number;
  date_created: Date;
  description: string;
  reviews: RecipeReviewQuery[];
  categories: RecipeCategoriesQuery[];
  ingredients_categories: RecipeIngredientsCategoriesQuery[];
  steps_categories: RecipeStepsCategoriesQuery[];
  images: {
    directus_files_id: {
      id: string;
    };
  }[];
}
