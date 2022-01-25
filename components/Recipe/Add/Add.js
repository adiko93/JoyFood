import {
  Divider,
  InputNumber,
  Select,
  Space,
  Typography,
  Upload,
  Form,
  Input,
  Button,
  Radio,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Layout from "../../components/Layout/Layout";
import styles from "../../styles/Recipe/Add/AddRecipe.module.css";
import PicturesWall from "../../components/Recipe/Add/PicturesWall";
import DynamicTabs from "../../components/Recipe/Add/DynamicTabs";
import DynamicList from "../../components/Recipe/Add/DynamicList";
import { useForm } from "antd/lib/form/Form";

const { Title } = Typography;
const { Option } = Select;

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const AddRecipe = function (props) {
  const [form] = useForm();
  console.log(form);
  return (
    <Layout activeNav={"recipes"} title={"Add recipe"}>
      <div className={styles.container}>
        <Form.Provider
          onFormFinish={(name, info) => {
            console.log(info.forms.ingredients.getFieldValue("nwm"));
          }}
        >
          <Form
            name="generalInfo"
            form={form}
            className={styles.mainDescription}
            layout="vertical"
            onFinish={(test) => console.log(test)}
          >
            <div className={styles.title}>
              <Title style={{ marginBottom: "-10px" }}>Add recipe</Title>
            </div>
            <Divider className={styles.divider} />
            <Form.Item
              className={styles.inputTitle}
              label="Title"
              name="inputTitle"
            >
              <Input placeholder="input title"></Input>
            </Form.Item>
            <Form.Item
              className={styles.inputDescription}
              label="Description"
              name="inputDescription"
            >
              <Input.TextArea allowClear rows={5}></Input.TextArea>
            </Form.Item>
            <Form.Item
              className={styles.inputCategory}
              label="Category"
              name="inputCategory"
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="Please select categories"
              >
                <Option key="1">Test</Option>
                <Option key="2">Test2</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className={styles.inputCookingTime}
              label="Cooking Time"
              name="inputCookingTime"
            >
              <InputNumber controls></InputNumber>
            </Form.Item>
            <Form.Item
              className={styles.inputServings}
              label="Servings"
              name="inputServings"
            >
              <InputNumber controls></InputNumber>
            </Form.Item>
            <Form.Item
              label="Images"
              name="inputImages"
              className={styles.inputImages}
            >
              <PicturesWall></PicturesWall>
            </Form.Item>
          </Form>
          <Divider className={styles.divider} />
          <Title level={3}>Ingredients </Title>

          <DynamicTabs>{(test) => <DynamicList test={test} />}</DynamicTabs>
        </Form.Provider>
      </div>
    </Layout>
  );
};

export default AddRecipe;
