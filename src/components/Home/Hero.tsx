import style from "../../styles/Home/Hero.module.scss";
import SVG from "../../utility/Svg";
import LoginBox from "./LoginBox";
import React from "react";

const Hero: React.FC = () => {
  return (
    <div className={style.hero}>
      <div className={style.heroText}>
        <span className={style.heroTextTitle}>
          Enjoy cooking!
          <SVG id="#icon-chef" classes={style.heroTextTitleSVG} />
        </span>
        <br />
        <span className={style.heroTextDescription}>
          With best recipes from chefs all over the world! <br />
          Share your ideas with others!
        </span>
      </div>
      <LoginBox />
    </div>
  );
};

export default Hero;
