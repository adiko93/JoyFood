import { gql } from "@apollo/client";

export const CAROUSEL_RECIPES = gql`
  query recipesCarousel($category: String) {
    recipe(
      limit: 15
      filter: { categories: { category_id: { id: { _eq: $category } } } }
    ) {
      id
      title
      description
      cooking_time
      rating
      ingredients_categories {
        title
        ingredients {
          id
        }
      }
      servings
      images {
        directus_files_id {
          id
        }
      }
      publisher
    }
  }
`;

export const RECIPE = gql`
  query recipe($slugString: String) {
    recipe(filter: { id: { _eq: $slugString } }) {
      id
      title
      servings
      publisher
      cooking_time
      status
      rating
      description
      reviews(sort: ["-date_created"]) {
        id
        title
        rating
        description
        user_created {
          id
          username
          avatar {
            id
          }
        }
        date_created
      }
      categories {
        category_id {
          id
          title
        }
      }
      ingredients_categories {
        title
        ingredients {
          quantity
          description
          unit
        }
      }
      steps_categories {
        title
        steps {
          description
          image {
            id
          }
        }
      }
      images {
        directus_files_id {
          id
        }
      }
    }
  }
`;

export const CATEGORIES = gql`
  query Categories {
    category {
      id
      title
    }
  }
`;

// export const MAX_COOKING_TIME = gql`
//   query MaxCookingTime {
//     recipes(
//       filter: { cooking_time: { _gt: 1 } }
//       sort: "-cooking_time"
//       limit: 1
//     ) {
//       cooking_time
//     }
//   }
// `;

export const FILTER_SEARCH = gql`
  query FilterSearch(
    $filters: [recipe_filter]
    $page: Int
    $perPage: Int
    $search: String
  ) {
    recipe(
      filter: { _and: $filters }
      limit: $perPage
      page: $page
      search: $search
    ) {
      id
      title
      description
      cooking_time
      rating
      ingredients_categories {
        ingredients {
          id
        }
      }
      servings
      images(limit: 1) {
        directus_files_id {
          id
        }
      }
      publisher
    }
  }
`;

export const FILTER_SEARCH_COUNT = gql`
  query FilterSearch($filters: [recipe_filter], $search: String) {
    recipe(filter: { _and: $filters }, limit: 1000000, search: $search) {
      id
    }
  }
`;

export const USER_DETAILS = gql`
  query {
    users_me {
      id
      avatar {
        id
      }
      username
      favourtie_recipes {
        recipe_id {
          id
        }
      }
    }
  }
`;

export const GET_USER_FAVOURITES = gql`
  query GET_FAVOURITES {
    users_me {
      favourtie_recipes {
        recipe_id {
          id
          title
          status
          rating
          user_created {
            username
          }
          date_created
          date_updated
          images(limit: 1) {
            directus_files_id {
              id
            }
          }
          categories {
            category_id {
              title
            }
          }
        }
      }
    }
  }
`;
