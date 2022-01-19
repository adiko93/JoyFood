import style from "../../styles/Home/RecipeSection.module.css";
import SVG from "../../utility/Svg";
import Carousel from "../UI/Carousel/Carousel";
import RecipeCard from "../UI/RecipeCard";

export default function RecipesSection({ recipes, title, svg, iconWidth }) {
  return (
    <section className={style.section}>
      <span className={style.title}>
        <span className={style.titleColor}>
          <SVG id={svg} classes={style.svg} style={{ width: iconWidth }} />
          {title}
        </span>{" "}
        recipes
      </span>
      <div className={style.topDiv}>
        <div className={style.background}></div>
        <Carousel>
          {recipes.map((recipe, index) => {
            return <RecipeCard key={index} recipe={recipe} />;
          })}
        </Carousel>
      </div>
    </section>
  );
}
