import { Input, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import style from "../../../styles/Recipe/DynamicTabs.module.css";
import { EditOutlined } from "@ant-design/icons";
import _ from "lodash";

const { TabPane } = Tabs;

function DynamicTabs({ children, ingredients, setIngredients }) {
  const [activeKey, setActiveKey] = useState("1");
  const [tabIndex, setTabIndex] = useState(1);
  const [editing, setEditing] = useState({ isEditing: false, key: 0 });
  const [panes, setPanes] = useState([
    {
      title: "Ingredients",
      key: "1",
      closable: false,
    },
  ]);
  const inputRef = useRef();

  useEffect(() => {
    if (editing) {
      inputRef?.current?.focus();
    }
  }, [editing]);

  const toggleEdit = (key) => {
    setEditing({ isEditing: !editing.isEditing, key: key });
  };

  // Triggered after enter is clicked/loose focus
  const saveEdit = (value, key) => {
    if (value.target.value.length < 4) {
      return;
    }
    toggleEdit(key);

    const newIngredients = ingredients.map((category) => {
      if (category.key === key) category.title = value.target.value;
      return category;
    });
    setIngredients(newIngredients);
  };

  const remove = (key) => {
    let newActiveKey = activeKey;
    const newIngredients = ingredients.filter(
      (category) => category.key !== key
    );
    if (activeKey === key) newActiveKey--;
    setIngredients(newIngredients);
    setActiveKey(String(newActiveKey));
  };

  const add = function () {
    const newTabIndex = tabIndex + 1;
    const newIngredients = _.cloneDeep(ingredients);
    newIngredients.push({
      title: "New Tab",
      key: String(newTabIndex),
      ingredients: [],
    });
    setIngredients(newIngredients);
    setActiveKey(String(newTabIndex));
    setTabIndex(newTabIndex);
  };

  const onEdit = (targetKey, action) => {
    action === "add" && add(targetKey);
    action === "remove" && remove(targetKey);
  };

  const childNode = (title, key) => {
    if (editing.isEditing && editing.key === key) {
      return (
        <Input
          ref={inputRef}
          onPressEnter={(value) => saveEdit(value, key)}
          onBlur={(value) => saveEdit(value, key)}
          style={{ minWidth: "100px" }}
          maxLength={20}
          size="small"
          defaultValue={title}
        />
      );
    }
    return (
      <>
        <div className={style.title}>{title}</div>
        <div className={style.editIcon} onClick={() => toggleEdit(key)}>
          <EditOutlined className={style.icon} />
        </div>
      </>
    );
  };

  return (
    <Tabs
      type="editable-card"
      onChange={(activeKey) => setActiveKey(activeKey)}
      activeKey={activeKey}
      onEdit={onEdit}
    >
      {ingredients.map((category) => (
        <TabPane
          tab={childNode(category.title, category.key)}
          key={category.key}
          closable={category.closable}
        >
          {children(category.key)}
        </TabPane>
      ))}
    </Tabs>
  );
}

export default DynamicTabs;
