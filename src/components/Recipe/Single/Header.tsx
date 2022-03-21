import { Rate, Avatar, Tag } from "antd";
import RecipeCarousel from "../../UI/RecipeCarousel/RecipeCarousel";
import styles from "../../../styles/Recipe/Single/Header.module.scss";
import {
  UserOutlined,
  TeamOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import SVG from "../../../utility/Svg";
import minutesToHours from "../../../utility/minutesToHours";
import { RecipeClassInterface } from "../../../types";

const Header: React.FC<{ recipe: RecipeClassInterface }> = ({ recipe }) => {
  const images = recipe.images;

  const avatarProps = recipe?.publisherAvatar
    ? {
        src: `${recipe.publisherAvatar}`,
      }
    : {
        icon: <UserOutlined />,
      };

  return (
    <div className={styles.header}>
      <RecipeCarousel slides={images as string[]} />
      <div className={styles.details}>
        <div className={styles.detailsTitle}>
          {recipe.title}
          <span className={styles.detailsCategories}>
            {recipe.categories!.map((category: any, index: any) => {
              return (
                <Tag key={index} color="#FA9400">
                  {category.title}
                </Tag>
              );
            })}
          </span>
        </div>

        <div className={styles.rating}>
          <div className={styles.ratingStars}>
            <Rate
              disabled
              value={recipe.rating}
              allowHalf
              style={{ fontSize: "2.2rem", paddingRight: "5px" }}
            />
            {`${recipe.rating} stars  (${recipe.reviews!.length || 0} votes)`}
          </div>
          <div className={styles.ratingAuthor}>
            <Avatar
              size={35}
              {...avatarProps}
              style={{
                marginRight: "1rem",
              }}
            />
            by <Link href="">{recipe.publisher || "AllRecipes"}</Link>
          </div>
        </div>
        <div className={styles.description}>{recipe.description}</div>
        <div className={styles.stats}>
          <div className={styles.statsClock}>
            <ClockCircleOutlined />
            {minutesToHours(recipe.cookingTime!)}
          </div>
          <div className={styles.statsClockDescription}>Cooking time</div>
          <div className={styles.statsIngredients}>
            <SVG id="#icon-ingredient" />{" "}
            {recipe.ingredientsCategories!.reduce(
              (previousValue: any, currentValue: any) =>
                previousValue + currentValue.ingredients.length,
              0
            )}
          </div>
          <div className={styles.statsIngredientsDescription}>Ingredients</div>
          <div className={styles.statsServings}>
            <TeamOutlined />
            {recipe.servings}
          </div>
          <div className={styles.statsServingsDescription}>Servings</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
