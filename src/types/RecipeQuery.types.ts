export interface StrapiPagination {
  /** Page number	(default 1) */
  page?: number;
  /** Page size	(default 25) */
  pageSize?: number;
  /** Adds the total numbers of entries and the number of pages to the response (default	True) */
  withCount?: boolean;
}

export type StrapiSort = string[];

export interface StrapiCategoryFilters {
  id?: StrapiNumberFilters;
  title?: StrapiStringFilters;
  category_id?: StrapiStringFilters;
  createdAt?: StrapiDateFilters;
  updatedAt?: StrapiDateFilters;
  and?: StrapiCategoryFilters[];
  or?: StrapiCategoryFilters[];
  not?: StrapiCategoryFilters;
}

export interface StrapiRecipeFilters {
  id?: StrapiNumberFilters;
  title?: StrapiStringFilters;
  slug?: StrapiStringFilters;
  description?: StrapiStringFilters;
  servings?: StrapiNumberFilters;
  cooking_time?: StrapiNumberFilters;
  author?: StrapiUserFilters;
  rating?: StrapiNumberFilters;
  categories?: StrapiCategoryFilters;
  ingredients_categories?: StrapiIngredientsCategoriesFilters;
  step_categories?: StrapiCategoryFilters;
  createdAt?: StrapiDateFilters;
  updatedAt?: StrapiDateFilters;
  publishedAt?: StrapiDateFilters;
  $and?: StrapiRecipeFilters[];
  $or?: StrapiRecipeFilters[];
  $not?: StrapiRecipeFilters;
}

export interface StrapiIngredientsCategoriesFilters {
  id?: StrapiNumberFilters;
  title?: StrapiStringFilters;
  ingredients?: StrapiIngredientsFilters;
  and?: StrapiIngredientsCategoriesFilters[];
  or?: StrapiIngredientsCategoriesFilters[];
  not?: StrapiIngredientsCategoriesFilters;
}

export interface StrapiIngredientsFilters {
  id?: StrapiNumberFilters;
  quantity?: StrapiNumberFilters;
  unit?: StrapiStringFilters;
  description?: StrapiStringFilters;
  and?: StrapiIngredientsFilters[];
  or?: StrapiIngredientsFilters[];
  not?: StrapiIngredientsFilters;
}

export interface StrapiUserFilters {
  id?: StrapiNumberFilters;
  username?: StrapiStringFilters;
  email?: StrapiStringFilters;
  provider?: StrapiStringFilters;
  password?: StrapiStringFilters;
  resetPasswordToken?: StrapiStringFilters;
  confirmationToken?: StrapiStringFilters;
  confirmed?: StrapiBooleanFilters;
  blocked?: StrapiBooleanFilters;
  created_recipes?: StrapiRecipeFilters;
  createdAt?: StrapiDateFilters;
  updatedAt?: StrapiDateFilters;
  and?: StrapiUserFilters[];
  or?: StrapiUserFilters[];
  not?: StrapiUserFilters;
}

export interface StrapiDateFilters {
  /**	Joins the filters in an "and" expression */
  $and?: Date[];
  /**	Joins the filters in an "or" expression */
  $or?: Date[];
  $not?: StrapiDateFilters;
  /** Equal */
  $eq?: Date;
  /** Not equal */
  $ne?: Date;
  /** Starts with */
  $startsWith?: Date;
  /**	Ends with */
  $endsWith?: Date;
  /** Contains (case-sensitive)*/
  $contains?: Date;
  /** Does not contain (case-sensitive)*/
  $notContains?: Date;
  /** Contains (case-insensitive)*/
  $containsi?: Date;
  /** Does not contain (case-insensitive)*/
  $notContainsi?: Date;
  /** Greater than */
  $gt?: Date;
  /** Greater than or equal to */
  $gte?: Date;
  /** Less than */
  $lt?: Date;
  /** Less than or equal to */
  $lte?: Date;
  /** Is null*/
  $null?: boolean;
  /** Is not null*/
  $notNull?: boolean;
  /** Included in an array*/
  $in?: Date[];
  /** Not included in an array*/
  $notIn?: Date[];
  /** Is between*/
  $between?: Date[];
}

export interface StrapiNumberFilters {
  /**	Joins the filters in an "and" expression */
  $and?: number[];
  /**	Joins the filters in an "or" expression */
  $or?: number[];
  $not?: StrapiNumberFilters;
  /** Equal */
  $eq?: number;
  /** Not equal */
  $ne?: number;
  /** Starts with */
  $startsWith?: number;
  /**	Ends with */
  $endsWith?: number;
  /** Contains (case-sensitive)*/
  $contains?: number;
  /** Does not contain (case-sensitive)*/
  $notContains?: number;
  /** Contains (case-insensitive)*/
  $containsi?: number;
  /** Does not contain (case-insensitive)*/
  $notContainsi?: number;
  /** Greater than */
  $gt?: number;
  /** Greater than or equal to */
  $gte?: number;
  /** Less than */
  $lt?: number;
  /** Less than or equal to */
  $lte?: number;
  /** Is null*/
  $null?: boolean;
  /** Is not null*/
  $notNull?: boolean;
  /** Included in an array*/
  $in?: number[];
  /** Not included in an array*/
  $notIn?: number[];
  /** Is between*/
  $between?: number[];
}

export interface StrapiBooleanFilters {
  /**	Joins the filters in an "and" expression */
  $and?: boolean[];
  /**	Joins the filters in an "or" expression */
  $or?: boolean[];
  $not?: StrapiBooleanFilters;
  /** Equal */
  $eq?: boolean;
  /** Not equal */
  $ne?: boolean;
  /** Starts with */
  $startsWith?: boolean;
  /**	Ends with */
  $endsWith?: boolean;
  /** Contains (case-sensitive)*/
  $contains?: boolean;
  /** Does not contain (case-sensitive)*/
  $notContains?: boolean;
  /** Contains (case-insensitive)*/
  $containsi?: boolean;
  /** Does not contain (case-insensitive)*/
  $notContainsi?: boolean;
  /** Greater than */
  $gt?: boolean;
  /** Greater than or equal to */
  $gte?: boolean;
  /** Less than */
  $lt?: boolean;
  /** Less than or equal to */
  $lte?: boolean;
  /** Is null*/
  $null?: boolean;
  /** Is not null*/
  $notNull?: boolean;
  /** Included in an array*/
  $in?: boolean[];
  /** Not included in an array*/
  $notIn?: boolean[];
  /** Is between*/
  $between?: boolean[];
}

export interface StrapiStringFilters {
  /** Joins the filters in an "and" expression */
  $and?: string[];
  /** Joins the filters in an "or" expression */
  $or?: string[];
  $not?: StrapiStringFilters;
  /** Equal */
  $eq?: String;
  /** Not equal */
  $ne?: String;
  /** Starts with */
  $startsWith?: String;
  /**	Ends with */
  $endsWith?: String;
  /** Contains (case-sensitive)*/
  $contains?: String;
  /** Does not contain (case-sensitive)*/
  $notContains?: String;
  /** Contains (case-insensitive)*/
  $containsi?: String;
  /** Does not contain (case-insensitive)*/
  $notContainsi?: String;
  /** Greater than */
  $gt?: String;
  /** Greater than or equal to */
  $gte?: String;
  /** Less than */
  $lt?: String;
  /** Less than or equal to */
  $lte?: String;
  /** Is null*/
  $null?: Boolean;
  /** Is not null*/
  $notNull?: Boolean;
  /** Included in an array*/
  $in?: string[];
  /** Not included in an array*/
  $notIn?: string[];
  /** Is between*/
  $between?: string[];
}

export interface imageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
}

export interface imageFormats {
  small?: imageFormat;
  medium?: imageFormat;
  thumbnail?: imageFormat;
}

export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: imageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: JSON;
    related: any;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface RecipeIngredientsCategoriesQuery {
  id: number;
  title: string;
  ingredients: RecipeIngredientQuery[];
}

export interface RecipeIngredientQuery {
  id: number;
  quantity: number;
  unit: string;
  description: string;
}

export interface RecipeStepsCategoriesQuery {
  id: number;
  title: string;
  steps: RecipeStepQuery[];
}

export interface RecipeStepQuery {
  id: number;
  description: string;
  sort: number;
  image: { data: StrapiImage };
}

export interface RecipeUserQuery {
  id: string;
  username: string;
  avatar: { id: string };
}

export interface RecipeReviewQuery {
  id: number;
  attributes: {
    title: string;
    description: string;
    rating: number;
    author: StrapiUser;
    recipe: { data: RecipeQuery };
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface RecipeCategoriesQuery {
  id: number;
  attributes: {
    title: string;
    category_id: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface StrapiUser {
  data: {
    id: number;
    attributes: {
      username: string;
      email: string;
      provider: string;
      confirmed: boolean;
      blocked: boolean;
      role: any;
      created_recipes: {
        data: {
          id: number;
          attributes: RecipeQuery;
        };
      }[];
      createdAt: Date;
      updatedAt: Date;
      avatar: { data: StrapiImage };
    };
  };
}

export interface RecipeQuery {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    servings: number;
    cooking_time: number;
    rating: number;
    ingredients_categories: RecipeIngredientsCategoriesQuery[];
    steps_categories: RecipeStepsCategoriesQuery[];
    images: { data: StrapiImage[] };
    reviews: { data: RecipeReviewQuery[] };
    categories: { data: RecipeCategoriesQuery[] };
    author: StrapiUser;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
}
