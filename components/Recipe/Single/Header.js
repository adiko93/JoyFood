import { Rate, Avatar, Tag } from "antd";
import RecipeCarousel from "../../UI/RecipeCarousel/RecipeCarousel";
import styles from "../../../styles/Recipe/Header.module.css";
import {
  UserOutlined,
  TeamOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import SVG from "../../../utility/Svg";
import minutesToHours from "../../../utility/minutesToHours";
import { SITE_BACKEND_URL } from "../../../utility/globals";

export default function Header({ recipe }) {
  const images = recipe.images.map((image) => {
    return `${SITE_BACKEND_URL}/assets/${image.directus_files_id.id}`;
  });
  return (
    <div className={styles.header}>
      <RecipeCarousel slides={images} />
      <div className={styles.details}>
        <div className={styles.title}>
          {recipe.title}{" "}
          <span className={styles.categories}>
            {recipe.categories.map((category, index) => {
              return (
                <Tag key={index} color="#FA9400">
                  {category.categories_id.title}
                </Tag>
              );
            })}
          </span>
        </div>

        <div className={styles.ratingAuthor}>
          <div className={styles.rating}>
            <Rate
              disabled
              defaultValue={2}
              style={{ fontSize: "18px", paddingRight: "5px" }}
            />{" "}
            3.5 (100 votes)
          </div>
          <div className={styles.author}>
            <Avatar
              size={35}
              icon={<UserOutlined />}
              style={{
                marginRight: "1rem",
              }}
            />
            by <Link href="">Martha</Link>
          </div>
        </div>
        <div className={styles.description}>{recipe.description}</div>
        <div className={styles.stats}>
          <div className={styles.clock}>
            <ClockCircleOutlined />
            {minutesToHours(recipe.cooking_time)}
          </div>
          <div className={styles.clockDesc}>Cooking time</div>
          <div className={styles.ingr}>
            <SVG id="#icon-ingredient" /> {recipe.ingredients.length}
          </div>
          <div className={styles.ingrDesc}>Ingredients</div>
          <div className={styles.serv}>
            <TeamOutlined />
            {recipe.servings}
          </div>
          <div className={styles.servDesc}>Servings</div>
        </div>
      </div>
    </div>
  );
}
