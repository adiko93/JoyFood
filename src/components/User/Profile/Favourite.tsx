import { message } from "antd";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { queryClient } from "../../../pages/_app";
import { updateFavouriteRecipesMutation } from "../../../query/mutations";
import { fetchRecipes, queryFavouriteRecipes } from "../../../query/queries";
import { getUserDetails, setFavouriteRecipes } from "../../../state/authSlice";
import RecipeTable from "../../UI/RecipeTable";

const Favourite: React.FC = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(getUserDetails);
  const favouriteRecipes = userDetails.favourite_recipes as unknown as number[];

  const { data } = useQuery(["favouriteRecipes", userDetails], async () => {
    return await fetchRecipes(queryFavouriteRecipes(favouriteRecipes!));
  });

  const updateFavourites = useMutation(
    async (recipesArray: number[]) => {
      return await updateFavouriteRecipesMutation({
        recipesArray,
        userId: userDetails.id! as unknown as number,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("favouriteRecipes");
      },
      onError: (error: any) => {
        message.error(
          `There was an error proccessing request. ${error.message}`
        );
      },
    }
  );

  const deleteHandler = (id: number) => {
    const filteredRecipes = favouriteRecipes.filter((recipe) => recipe !== id);
    updateFavourites.mutate(filteredRecipes);
    dispatch(setFavouriteRecipes(filteredRecipes));
  };

  return (
    <div>
      <RecipeTable recipes={data} deleteHandler={(id) => deleteHandler(id)} />
    </div>
  );
};

export default Favourite;
