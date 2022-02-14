export interface RecipeCategories {
  id: string;
  title: string;
}

export interface RecipeIngredients {
  quantity: number;
  unit: string;
  description: string;
}

export interface RecipeIngredientsCategories {
  title: string;
  ingredients: RecipeIngredients[];
}

export interface RecipeSteps {
  description: string;
  image: string | FormData;
}

export interface RecipeStepsCategories {
  title: string;
  steps: RecipeSteps[];
}

export interface RecipeReviews {
  id: string;
  title: string;
  rating: number;
  description: string;
  author: User;
  dateCreated: Date;
}

export interface RecipeClass {
  id: string;
  title?: string;
  description?: string;
  servings?: number;
  cookingTime?: number;
  publisher?: string;
  status?: string;
  rating?: number;
  categories?: RecipeCategories[];
  ingredientsCategories?: RecipeIngredientsCategories[];
  stepsCategories?: RecipeStepsCategories[];
  images?: string[] | FormData[];
  reviews?: RecipeReviews[];
}

interface User {
  id: string;
  username: string;
  avatar: string;
}
