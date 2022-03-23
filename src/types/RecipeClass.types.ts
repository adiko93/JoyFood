export interface RecipeCategories {
  id: number;
  stringId: string;
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
  sort: number;
  description: string;
  image: string | FormData;
}

export interface RecipeStepsCategories {
  title: string;
  steps: RecipeSteps[];
}

export interface RecipeReviews {
  id: number;
  title: string;
  rating: number;
  description: string;
  author: User;
  dateCreated: Date;
}

export interface RecipeImages {
  full?: string;
  small?: string;
  medium?: string;
  thumbnail?: string;
}

export interface RecipeClassInterface {
  id: number;
  title?: string;
  description?: string;
  servings?: number;
  cookingTime?: number;
  publisher?: string;
  publisherAvatar?: string;
  status?: string;
  rating?: number;
  slug?: string;
  dateCreated?: Date;
  publishedAt?: Date;
  categories?: RecipeCategories[];
  ingredientsCategories?: RecipeIngredientsCategories[];
  stepsCategories?: RecipeStepsCategories[];
  images?: RecipeImages[];
  reviews?: RecipeReviews[];
}

interface User {
  id: number;
  username: string;
  avatar: string;
}
