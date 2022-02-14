import { Button, Rate, Spin, Tooltip } from "antd";
import style from "../../styles/UI/RecipeCard.module.css";
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
} from "../../state/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { UPDATE_FAVOURITE_RECIPE } from "../../apollo/mutations";
import { RecipeClass } from "../../types";

const RecipeCard: React.FC<{ recipe: RecipeClass }> = ({ recipe }) => {
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(true);

  const isAuthorized = useSelector(getIsAuthorized);
  const userDetails = useSelector(getUserDetails);

  const [updateFavouriteRecipes] = useMutation(UPDATE_FAVOURITE_RECIPE, {
    context: {
      clientName: "system",
    },
  });

  const favouirteHandler = async (number: number) => {
    let newFavouriteRecipes = [...userDetails.favouriteRecipes];
    number
      ? newFavouriteRecipes.push(recipe.id)
      : (newFavouriteRecipes = newFavouriteRecipes.filter(
          (recipeId) => recipeId !== recipe.id
        ));

    await updateFavouriteRecipes({
      variables: {
        recipes: newFavouriteRecipes.map((recipeId) => {
          return { recipe_id: { id: recipeId } };
        }),
      },
    });

    dispatch(fetchUserDetails());
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
            src={`${SITE_BACKEND_URL}/assets/${recipe.images![0]}`}
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
              value={userDetails?.favouriteRecipes?.includes(recipe.id) ? 1 : 0}
              tooltips={["Add to favourites"]}
              onChange={(number) => favouirteHandler(number)}
            />
          </div>
        ) : null}

        <div className={style.descriptionBox}>
          <div className={style.title}>
            <Clamp lines={2} withToggle={false}>
              {recipe.title}
            </Clamp>
          </div>

          <div className={style.stats}>
            <div>
              <Rate
                disabled
                allowHalf
                value={recipe.rating || 0}
                style={{ fontSize: "14px", paddingRight: "5px" }}
              />
              {recipe.rating || 0}
            </div>
            <div className={style.author}>
              by{" "}
              <span className={style.color}>
                {_.get(recipe, "publisher", recipe.publisher)}
              </span>
            </div>
          </div>
          <div className={style.details}>
            <div className={style.clock}>
              <SVG id="#icon-clock" /> {recipe.cookingTime} min
            </div>
            <div className={style.clockDesc}>Cooking time</div>
            <div className={style.ingr}>
              <SVG id="#icon-ingredient" />{" "}
              {recipe.ingredientsCategories!.reduce(
                (previousValue, currentValue) =>
                  previousValue + currentValue.ingredients.length,
                0
              )}
            </div>
            <div className={style.ingrDesc}>Ingredients</div>
            <div className={style.serv}>
              <SVG id="#icon-servings" /> {recipe.servings}
            </div>
            <div className={style.servDesc}>Servings</div>
          </div>
          <div className={style.description}>{recipe.description}</div>
          <Link href={`/recipes/${recipe.id}`}>
            <a>
              <Button type="primary" className={style.button}>
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
