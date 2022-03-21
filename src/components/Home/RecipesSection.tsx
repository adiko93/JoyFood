import styles from "../../styles/Home/RecipeSection.module.scss";
import { RecipeClassInterface } from "../../types";
import SVG from "../../utility/Svg";
import Carousel from "../UI/Carousel/Carousel";
import RecipeCard from "../UI/RecipeCard";

const RecipesSection: React.FC<{
  recipes: RecipeClassInterface[];
  title: string;
  svg: string;
  iconWidth: string;
}> = ({ recipes, title, svg, iconWidth }) => {
  return (
    <section className={styles.section}>
      <span className={styles.sectionTitle}>
        <span className={styles.sectionTitleColor}>
          <SVG id={svg} style={{ width: iconWidth }} />
          {title}
        </span>{" "}
        recipes
      </span>
      <div className={styles.container}>
        <div className={styles.containerBackground}></div>
        <Carousel>
          {recipes.map((recipe, index) => {
            return <RecipeCard key={index} recipe={recipe} />;
          })}
        </Carousel>
      </div>
    </section>
  );
};

export default RecipesSection;
