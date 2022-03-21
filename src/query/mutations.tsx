import axiosStrapi from "./axiosInstance";

export const sendReviewMutation = async (query: string) => {
  let response;
  try {
    response = await axiosStrapi.post(`/reviews`, { data: query });
  } catch (error) {
    throw new Error(error as string);
  }
  return response.data;
};

export const deleteReviewMutation = async (id: number) => {
  let response;
  try {
    response = await axiosStrapi.delete(`/reviews/${id}`);
  } catch (error) {
    throw new Error(error as string);
  }
  return response.data;
};
export const updateFavouriteRecipesMutation = async (variables: {
  recipesArray: number[];
  userId: number;
}) => {
  axiosStrapi.put(`/users/${variables.userId}`, {
    favourite_recipes: variables.recipesArray,
  });
};
