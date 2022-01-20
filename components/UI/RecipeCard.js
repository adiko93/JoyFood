import { Button, Rate, Spin } from "antd";
import style from "../../styles/UI/RecipeCard.module.css";
import SVG from "../../utility/Svg";
import Image from "next/image";
import _ from "lodash";
import Clamp from "react-multiline-clamp";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SITE_BACKEND_URL } from "../../utility/globals";

export default function RecipeCard({ recipe }) {
  useEffect(() => {}, []);
  const [imageLoading, setImageLoading] = useState(true);
  const router = useRouter();

  return (
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
          src={`${SITE_BACKEND_URL}/assets/${recipe.images[0].directus_files_id.id}`}
          width={315}
          height={415}
          className={style.image}
        />
      </Spin>

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
              defaultValue={2}
              style={{ fontSize: "14px", paddingRight: "5px" }}
            />{" "}
            3.5
          </div>
          <div className={style.author}>
            by{" "}
            <span className={style.color}>
              {_.get(recipe, "author.title", recipe.publisher)}
            </span>
          </div>
        </div>
        <div className={style.details}>
          <div className={style.clock}>
            <SVG id="#icon-clock" /> {recipe.cooking_time} min
          </div>
          <div className={style.clockDesc}>Cooking time</div>
          <div className={style.ingr}>
            <SVG id="#icon-ingredient" /> {recipe.ingredients.length}
          </div>
          <div className={style.ingrDesc}>Ingredients</div>
          <div className={style.serv}>
            <SVG id="#icon-servings" /> {recipe.servings}
          </div>
          <div className={style.servDesc}>Servings</div>
        </div>
        <div className={style.description}>{recipe.description}</div>
        <Link href={`/recipes/${recipe.slug}`}>
          <a>
            <Button type="primary" className={style.button}>
              View recipe
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
}
