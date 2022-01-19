import style from "../../styles/Home/Hero.module.css";
import SVG from "../../utility/Svg";
import LoginBox from "./LoginBox";

export default function Hero(props) {
  return (
    <div className={style.hero}>
      <div className={style.heroText}>
        <span className={style.title}>
          Enjoy cooking! <SVG id="#icon-chef" classes={style.chefSvg} />
        </span>
        <br />
        <span className={style.description}>
          With best recipes from chefs all over the world! <br />
          Share your ideas with others!
        </span>
      </div>
      <LoginBox />
    </div>
  );
}
