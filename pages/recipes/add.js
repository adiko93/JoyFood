import styles from "../../styles/Recipe/Add/AddRecipe.module.css";
import {
  UserOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { Button, Divider, Input, InputNumber, Rate, Select, Tag } from "antd";
import Layout from "../../components/Layout/Layout";
import Avatar from "antd/lib/avatar/avatar";
import Link from "next/link";
import SVG from "../../utility/Svg";
import DynamicTabs from "../../components/Recipe/Add/DynamicTabs";
import DynamicList from "../../components/Recipe/Add/DynamicList";
import PicturesWall from "../../components/Recipe/Add/PicturesWall";
import { useState } from "react";
import EditableField from "../../components/UI/EditableField";
import _ from "lodash";
import DynamicSteps from "../../components/Recipe/Add/DynamicSteps";

function AddRecipe() {
  const [title, setTitle] = useState("Click here to change title");
  const [description, setDescription] = useState();
  const [cookingTime, setCookingTime] = useState(60);
  const [servings, setServings] = useState(4);
  const [imagesList, setImagesList] = useState([]);
  const [steps, setSteps] = useState([
    {
      title: "Click here to change category title",
      steps: [{ description: "", image: [] }],
    },
  ]);

  const { Option } = Select;

  return (
    <Layout title="Add recipe" activeNav="recipes">
      <div className={styles.header}>
        <div>
          <span className={styles.imagesTitle}>Images</span>
          <PicturesWall
            fileList={imagesList}
            setFileList={(files) => setImagesList(files)}
          />
        </div>
        <div className={styles.details}>
          <div className={styles.title}>
            <EditableField
              textClass={styles.title}
              value={title}
              changeHandler={setTitle}
              minLength={5}
            />
            <div className={styles.categories}>
              <Select
                mode="multiple"
                allowClear
                placeholder="Please select categories"
                style={{ width: "100%" }}
              >
                <Option key="1">Test</Option>
                <Option key="2">Test2</Option>
              </Select>
            </div>
          </div>

          <div className={styles.ratingAuthor}>
            <div className={styles.rating}>
              <Rate
                disabled
                defaultValue={5}
                style={{ fontSize: "18px", paddingRight: "5px" }}
              />
              5 (100 votes)
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
          <div className={styles.description}>
            <Input.TextArea
              value={description}
              onChange={(value) => setDescription(value.target.value)}
              style={{ minHeight: "20rem" }}
              placeholder="Your description here"
            />
          </div>
          <div className={styles.stats}>
            <div className={styles.clock}>
              <ClockCircleOutlined />
              <InputNumber
                min={1}
                value={cookingTime}
                onChange={(event) => setCookingTime(event)}
              />
              {/* {minutesToHours(recipe.cooking_time)} */}
            </div>
            <div className={styles.clockDesc}>Cooking time</div>
            <div className={styles.ingr}>
              <SVG id="#icon-ingredient" /> 0
            </div>
            <div className={styles.ingrDesc}>Ingredients</div>
            <div className={styles.serv}>
              <TeamOutlined />
              <InputNumber
                min={1}
                value={servings}
                onChange={(event) => setServings(event)}
              />
            </div>
            <div className={styles.servDesc}>Servings</div>
          </div>
        </div>
      </div>
      <div className={styles.ingredientsContainer}>
        <div className={styles.ingredientsTitle}>Ingredients:</div>
        <div className={styles.ingredientsList}>
          <DynamicTabs>
            {(test) => <DynamicList test={test} size="large" />}
          </DynamicTabs>
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
      {/* /////////////////// STEPS /////////////////////////////////// */}

      <DynamicSteps steps={steps} setSteps={setSteps} />
    </Layout>
  );
}

export default AddRecipe;
