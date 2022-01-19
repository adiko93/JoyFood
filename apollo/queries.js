import { gql } from "@apollo/client";

export const CAROUSEL_RECIPES = gql`
  query recipesCarousel($category: String) {
    recipes(
      limit: 15
      filter: { categories: { categories_id: { id: { _eq: $category } } } }
    ) {
      title
      description
      cooking_time
      slug
      ingredients {
        id
      }
      servings
      images {
        directus_files_id {
          id
        }
      }
      author {
        title
      }
      publisher
    }
  }
`;

export const RECIPE = gql`
  query recipe($slugString: String) {
    recipes(filter: { slug: { _eq: $slugString } }) {
      title
      servings
      author {
        title
      }
      publisher
      cooking_time
      description
      categories {
        categories_id {
          title
        }
      }
      ingredients {
        quantity
        description
        unit
      }
      steps {
        description
        sort
      }
      images {
        directus_files_id {
          id
        }
      }
      reviews {
        title
        description
        author {
          title
          avatar {
            filename_disk
          }
        }
      }
    }
  }
`;

export const CATEGORIES = gql`
  query Categories {
    categories {
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
  query FilterSearch($filters: [recipes_filter], $page: Int, $perPage: Int) {
    recipes(filter: { _and: $filters }, limit: $perPage, page: $page) {
      title
      slug
      description
      cooking_time
      ingredients {
        id
      }
      servings
      images(limit: 1) {
        directus_files_id {
          id
        }
      }
      author {
        first_name
        last_name
      }
      publisher
    }
  }
`;

export const FILTER_SEARCH_COUNT = gql`
  query FilterSearch($filters: [recipes_filter]) {
    recipes(filter: { _and: $filters }, limit: 1000000) {
      id
    }
  }
`;

export const USER_DETAILS = gql`
  query {
    users_me {
      avatar {
        id
        filename_disk
      }
      nickname
    }
  }
`;
