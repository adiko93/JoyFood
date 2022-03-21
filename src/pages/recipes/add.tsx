import styles from "../../styles/Recipe/Add/AddRecipe.module.css";
import {
  UserOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined,
  DiffOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Rate,
  Result,
  Select,
} from "antd";
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
import { useMutation } from "@apollo/client";
import { ADD_RECIPE } from "../../apollo/mutations";
import { useSelector } from "react-redux";
import { getIsAuthorized, getUserDetails } from "../../state/authSlice";
import { useRouter } from "next/router";
import { getCategories } from "../../state/utilitySlice";
import { SITE_BACKEND_URL } from "../../utility/globals";

const AddRecipe: React.FC = () => {
  const [title, setTitle] = useState("Click here to change title");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState(60);
  const [servings, setServings] = useState(4);
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [steps, setSteps] = useState([
    {
      title: "Click here to change category title",
      steps: [{ description: "", image: [], stepKey: 0 }],
      key: 0,
    },
  ]);
  const [ingredients, setIngredients] = useState([
    {
      title: "Ingredients",
      key: "1",
      closable: false,
      ingredients: [
        {
          key: 0,
          quantity: null,
          unit: null,
          description: null,
        },
      ],
    },
  ]);
  const [categories, setCategories] = useState([]);

  const userDetails = useSelector(getUserDetails);
  const isAuthorized = useSelector(getIsAuthorized);
  const recipeCategories = useSelector(getCategories);
  const router = useRouter();

  // const [addRecipe, { data, error, loading }] = useMutation(ADD_RECIPE);

  const { Option } = Select;

  // const addRecipeHandler = () => {
  //   if (categories.length < 1) {
  //     message.warning("Categories cannot be empty!");
  //     return;
  //   }

  //   if (imagesList.length < 1) {
  //     message.warning("Please upload atleast one image!");
  //     return;
  //   }

  //   if (!ingredients[0]?.ingredients[0]?.description) {
  //     message.warning("Ingredients cannot be empty!");
  //     return;
  //   }

  //   if (!steps[0]?.steps[0]?.description) {
  //     message.warning("Steps cannot be empty!");
  //     return;
  //   }
  //   addRecipe({
  //     variables: {
  //       status: "Published",
  //       title: title,
  //       servings: servings,
  //       publisher: userDetails.username,
  //       cookingTime: cookingTime,
  //       description: description,
  //       categories: categories.map((category) => {
  //         return {
  //           category_id: {
  //             id: recipeCategories[category].id,
  //             title: recipeCategories[category].title,
  //           },
  //         };
  //       }),
  //       steps: steps.map((category) => {
  //         return {
  //           title: category.title,
  //           steps: category.steps.map((step) => {
  //             return {
  //               description: step.description,
  //               image: step.image[0]
  //                 ? {
  //                     id: step.image[0].response.data.id,
  //                     filename_disk: step.image[0].response.data.filename_disk,
  //                     filename_download:
  //                       step.image[0].response.data.filename_download,
  //                     filesize: +step.image[0].response.data.filesize,
  //                     height: step.image[0].response.data.height,
  //                     id: step.image[0].response.data.id,
  //                     modified_on: step.image[0].response.data.modified_on,
  //                     storage: step.image[0].response.data.storage,
  //                     title: step.image[0].response.data.title,
  //                     type: step.image[0].response.data.type,
  //                     uploaded_on: step.image[0].response.data.uploaded_on,
  //                     width: step.image[0].response.data.width,
  //                   }
  //                 : null,
  //             };
  //           }),
  //         };
  //       }),
  //       ingredients: ingredients.map((category) => {
  //         return {
  //           title: category.title,
  //           ingredients: category.ingredients.map((ingredient) => {
  //             return {
  //               quantity: ingredient.quantity,
  //               unit: ingredient.unit,
  //               description: ingredient.description,
  //             };
  //           }),
  //         };
  //       }),
  //       images: imagesList.map((image) => {
  //         const img = image.response.data;
  //         return {
  //           directus_files_id: {
  //             id: img.id,
  //             filename_disk: img.filename_disk,
  //             filename_download: img.filename_download,
  //             filesize: +img.filesize,
  //             height: img.height,
  //             modified_on: img.modified_on,
  //             storage: img.storage,
  //             title: img.title,
  //             type: img.type,
  //             uploaded_on: img.uploaded_on,
  //             width: img.width,
  //           },
  //         };
  //       }),
  //     },
  //   });
  // };

  if (!isAuthorized) {
    return (
      <Layout title="Log In" activeNav="home">
        <div className={styles.container}>
          <Result
            style={{ width: "100%", alignSelf: "center" }}
            status="error"
            title="You need to be logged in to view this site"
            extra={[
              <Button
                key="button"
                onClick={() => {
                  router.push("/");
                }}
              >
                Go home
              </Button>,
            ]}
          ></Result>
        </div>
      </Layout>
    );
  }

  const avatarProps = userDetails?.avatar
    ? {
        src: `${SITE_BACKEND_URL}${userDetails?.avatar}`,
      }
    : {
        icon: <UserOutlined />,
      };

  return (
    <Layout title="Add recipe" activeNav="recipes">
      <Form>
        <div className={styles.header}>
          <div>
            <span className={styles.imagesTitle}>Images:</span>
            <PicturesWall
              fileList={imagesList}
              setFileList={(files: any) => setImagesList(files)}
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
                <Form.Item noStyle>
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Please select categories"
                    style={{ width: "100%" }}
                    onChange={(event) => setCategories(event)}
                  >
                    {recipeCategories.map((category: any, index) => (
                      <Option key={index} value={Object.keys(category)[0]}>
                        {category[Object.keys(category)[0]].title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
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
                  {...avatarProps}
                  style={{
                    marginRight: "1rem",
                  }}
                />
                by{" "}
                <Link href="/recipes/">
                  <>{userDetails.username}</>
                </Link>
              </div>
            </div>
            <div className={styles.description}>
              <Form.Item
                noStyle
                rules={[
                  { required: true, message: "Please input your E-Mail!" },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input.TextArea
                  value={description}
                  onChange={(value) => setDescription(value.target.value)}
                  style={{ minHeight: "20rem" }}
                  placeholder="Your description here"
                />
              </Form.Item>
            </div>
            <div className={styles.stats}>
              <div className={styles.clock}>
                <ClockCircleOutlined />
                <InputNumber
                  min={1}
                  value={cookingTime}
                  onChange={(event) => setCookingTime(event)}
                />
              </div>
              <div className={styles.clockDesc}>Cooking time</div>
              <div className={styles.ingr}>
                <SVG id="#icon-ingredient" />{" "}
                {ingredients.reduce(
                  (previousValue, currentValue) =>
                    previousValue + currentValue.ingredients.length,
                  0
                )}
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
            <DynamicTabs
              ingredients={ingredients}
              setIngredients={setIngredients}
            >
              {(categoryKey: any) => (
                <DynamicList
                  categoryKey={categoryKey}
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                />
              )}
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
        <DynamicSteps steps={steps} setSteps={setSteps} />
        <div className={styles.bottomNav}>
          <Button
            type="dashed"
            size="large"
            style={{ marginRight: "1rem" }}
            icon={<DiffOutlined />}
            onClick={() => console.log(steps)}
          >
            Save Draft
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<SendOutlined />}
            // onClick={() => addRecipeHandler()}
            htmlType="submit"
          >
            Send
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

export default AddRecipe;
