import styles from "../../styles/Recipe/Add/AddRecipe.module.css";
import {
  UserOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Rate, Tag } from "antd";
import Layout from "../../components/Layout/Layout";
import Avatar from "antd/lib/avatar/avatar";
import Link from "next/link";
import SVG from "../../utility/Svg";
import UploadRecipeCarousel from "../../components/UI/RecipeCarousel/UploadRecipeCarousel";
import DynamicTabs from "../../components/Recipe/Add/DynamicTabs";
import DynamicList from "../../components/Recipe/Add/DynamicList";
import PicturesWall from "../../components/Recipe/Add/PicturesWall";

function AddRecipe() {
  return (
    <Layout title="Add recipe" activeNav="recipes">
      <div className={styles.header}>
        <PicturesWall />
        <div className={styles.details}>
          <div className={styles.title}>
            Your recipe title
            <span className={styles.categories}>
              <Tag key={1} color="#FA9400">
                Your category here
              </Tag>
            </span>
          </div>

          <div className={styles.ratingAuthor}>
            <div className={styles.rating}>
              <Rate
                disabled
                defaultValue={5}
                style={{ fontSize: "18px", paddingRight: "5px" }}
              />
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
              by <Link href="/">Martha</Link>
            </div>
          </div>
          <div className={styles.description}>Your description here</div>
          <div className={styles.stats}>
            <div className={styles.clock}>
              <ClockCircleOutlined />
              25 hours 5 minutes
              {/* {minutesToHours(recipe.cooking_time)} */}
            </div>
            <div className={styles.clockDesc}>Cooking time</div>
            <div className={styles.ingr}>
              <SVG id="#icon-ingredient" /> 0
            </div>
            <div className={styles.ingrDesc}>Ingredients</div>
            <div className={styles.serv}>
              <TeamOutlined />0
            </div>
            <div className={styles.servDesc}>Servings</div>
          </div>
        </div>
      </div>
      <div className={styles.ingredientsContainer}>
        <div className={styles.ingredientsTitle}>Ingredients:</div>
        <div className={styles.ingredientsList}>
          <DynamicTabs>{(test) => <DynamicList test={test} />}</DynamicTabs>
        </div>
        <Button
          type="primary"
          disabled
          icon={<ShoppingCartOutlined />}
          style={{
            fontSize: "1.6rem",
            width: "25rem",
            alignSelf: "center",
            marginBlock: "2rem",
          }}
        >
          Add to cart
        </Button>
      </div>
      <div className={styles.stepsContainer}>
        <div className={styles.stepsStep} key="1">
          <div className={styles.stepsNumber}>1</div>
          <div className={styles.stepsDescription}>blahblahblah</div>
        </div>
      </div>
    </Layout>
  );
}

export default AddRecipe;
