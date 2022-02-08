import gql from "graphql-tag";

export const CREATE_ACCOUNT = gql`
  mutation CreateAccoutn(
    $password: String!
    $email: String!
    $nickname: String
  ) {
    create_users_item(
      data: {
        role: "1c8cd8fb-eab9-432c-8edb-c44e8fc9ebe3"
        email: $email
        password: $password
        username: $nick
        provider: "default"
        status: "active"
      }
    ) {
      id
    }
  }
`;

export const LOGIN = gql`
  mutation AuthQuery($email: String!, $password: String!) {
    auth_login(email: $email, password: $password) {
      access_token
      expires
      refresh_token
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($token: String) {
    auth_refresh(refresh_token: $token) {
      access_token
      expires
      refresh_token
    }
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFile($id: ID!) {
    delete_files_item(id: $id) {
      id
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation AddRecipe(
    $status: String!
    $title: String!
    $servings: Int!
    $publisher: String
    $cookingTime: Int!
    $description: String
    $categories: [create_recipe_category_input]
    $ingredients: [create_ingredient_categories_input]
    $steps: [create_steps_categories_input]
    $images: [create_recipe_files_input]
  ) {
    create_recipe_item(
      data: {
        status: $status
        title: $title
        servings: $servings
        publisher: $publisher
        cooking_time: $cookingTime
        description: $description
        categories: $categories
        ingredients_categories: $ingredients
        steps_categories: $steps
        images: $images
      }
    ) {
      id
      status
      title
      servings
      publisher
      cooking_time
      description
      categories {
        id
      }
      ingredients_categories {
        ingredients {
          description
        }
      }
      steps_categories {
        steps {
          description
        }
      }
    }
  }
`;

export const UPDATE_FAVOURITE_RECIPE = gql`
  mutation UPDATE_FAVOURITE_RECIPE(
    $recipes: [update_junction_directus_users_recipe_input]
  ) {
    update_users_me(data: { favourtie_recipes: $recipes }) {
      id
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation CREATE_REVIEW(
    $title: String
    $description: String
    $rating: Float
    $recipe: create_recipe_input
  ) {
    create_reviews_item(
      data: {
        title: $title
        description: $description
        rating: $rating
        recipe: $recipe
      }
    ) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DELETE_REVIEW($id: ID!) {
    delete_reviews_item(id: $id) {
      id
    }
  }
`;
