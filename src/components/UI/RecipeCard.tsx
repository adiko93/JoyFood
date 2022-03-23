import { Button, Rate, Spin, Tooltip } from "antd";
import style from "../../styles/UI/RecipeCard.module.scss";
import SVG from "../../utility/Svg";
import Image from "next/image";
import _ from "lodash";
import Clamp from "react-multiline-clamp";
import { useState } from "react";
import Link from "next/link";
import { SITE_BACKEND_URL } from "../../utility/globals";
import {
  fetchUserDetails,
  getIsAuthorized,
  getUserDetails,
  setFavouriteRecipes,
} from "../../state/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RecipeClassInterface } from "../../types";
import { useMutation } from "react-query";
import axiosStrapi from "../../query/axiosInstance";
import { updateFavouriteRecipesMutation } from "../../query/mutations";

const RecipeCard: React.FC<{ recipe: RecipeClassInterface }> = ({ recipe }) => {
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(true);

  const isAuthorized = useSelector(getIsAuthorized);
  const userDetails = useSelector(getUserDetails);

  const updateFavouriteRecipes: any = useMutation(
    (recipesArray: number[]) =>
      updateFavouriteRecipesMutation({
        recipesArray,
        userId: userDetails.id! as number,
      }),
    {
      onError: () => {
        dispatch(fetchUserDetails());
      },
    }
  );
  const favouirteHandler = async (current: number) => {
    let newFavouriteRecipes: number[] = _.cloneDeep(
      userDetails.favourite_recipes
    )!;
    current
      ? newFavouriteRecipes.push(recipe.id)
      : (newFavouriteRecipes = newFavouriteRecipes.filter(
          (recipeId) => recipeId !== recipe.id
        ));

    await updateFavouriteRecipes.mutateAsync(newFavouriteRecipes);

    dispatch(setFavouriteRecipes(newFavouriteRecipes));

    return;
  };

  return (
    <>
      <div className={style.container}>
        <Spin
          tip="Loading..."
          spinning={imageLoading}
          size="large"
          style={{
            margin: "auto",
            textAlign: "center",
          }}
        >
          <Image
            onLoad={() => setImageLoading(false)}
            src={
              recipe.images![0].small
                ? (recipe.images![0].small as string)
                : (recipe.images![0].full as string)
            }
            width={315}
            height={415}
            className={style.image}
            alt={recipe.title}
          />
        </Spin>

        {isAuthorized && !imageLoading ? (
          <div className={style.favouriteContainer}>
            <Rate
              count={1}
              value={
                (userDetails?.favourite_recipes! as number[])?.includes(
                  recipe.id
                )
                  ? 1
                  : 0
              }
              tooltips={["Add to favourites"]}
              onChange={(number) => favouirteHandler(number)}
            />
          </div>
        ) : null}

        <div className={style.description}>
          <div className={style.descriptionTitle}>
            <Clamp lines={2} withToggle={false}>
              {recipe.title}
            </Clamp>
          </div>

          <div className={style.descriptionStats}>
            <div>
              <Rate
                disabled
                allowHalf
                value={recipe.rating || 0}
                style={{ fontSize: "14px", paddingRight: "5px" }}
              />
              {`${recipe.rating || 0} stars`}
            </div>
            <div className={style.descriptionStatsAuthor}>
              by{" "}
              <span className={style.descriptionStatsAuthorColor}>
                {_.get(recipe, "publisher", recipe.publisher)}
              </span>
            </div>
          </div>
          <div className={style.descriptionDetails}>
            <div className={style.descriptionDetailsClock}>
              <SVG id="#icon-clock" /> {recipe.cookingTime} min
            </div>
            <div className={style.descriptionDetailsClockDesc}>
              Cooking time
            </div>
            <div className={style.descriptionDetailsIngr}>
              <SVG id="#icon-ingredient" />{" "}
              {recipe.ingredientsCategories!.reduce(
                (previousValue, currentValue) =>
                  previousValue + currentValue.ingredients.length,
                0
              )}
            </div>
            <div className={style.descriptionDetailsIngrDesc}>Ingredients</div>
            <div className={style.descriptionDetailsServ}>
              <SVG id="#icon-servings" /> {recipe.servings}
            </div>
            <div className={style.descriptionDetailsServDesc}>Servings</div>
          </div>
          <div className={style.descriptionText}>{recipe.description}</div>
          <Link href={`/recipes/${recipe.slug}`}>
            <a>
              <Button type="primary" className={style.descriptionButton}>
                View recipe
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
