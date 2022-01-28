import { Input, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import style from "../../../styles/Recipe/DynamicTabs.module.css";
import { EditOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

function DynamicTabs(props) {
  const [activeKey, setActiveKey] = useState("1");
  const [tabIndex, setTabIndex] = useState(1);
  const [panes, setPanes] = useState([
    {
      title: "Ingredients",
      content: props.children("test123"),
      key: "1",
      closable: false,
    },
  ]);
  const inputRef = useRef();
  const [editing, setEditing] = useState({ isEditing: false, key: 0 });
  const toggleEdit = (key) => {
    setEditing({ isEditing: !editing.isEditing, key: key });
  };
  useEffect(() => {
    if (editing) {
      inputRef?.current?.focus();
    }
  }, [editing]);

  const saveEdit = (value, key) => {
    if (value.target.value.length < 4) {
      return;
    }
    toggleEdit(0);

    const newPanes = panes.map((pane) => {
      if (pane.key === key) {
        pane.title = value.target.value;
        return pane;
      }
      return pane;
    });
    setPanes(newPanes);
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
          minLength={5}
          size="small"
          defaultValue={title}
        />
      );
    }
    return (
      <>
        <div
          // className="editable-cell-value-wrap"
          className={style.title}
        >
          {title}
        </div>
        <div className={style.editIcon} onClick={() => toggleEdit(key)}>
          <EditOutlined className={style.icon} />
        </div>
      </>
    );
  };

  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (activeKey === targetKey) newActiveKey--;
    setPanes(newPanes);
    setActiveKey(String(newActiveKey));
  };

  const add = function () {
    const newTabIndex = tabIndex + 1;
    const newPanes = [...panes];
    newPanes.push({
      title: "New Tab",
      content: props.children("test123"),
      key: String(newTabIndex),
    });
    setPanes(newPanes);
    setActiveKey(String(newTabIndex));
    setTabIndex(newTabIndex);
    console.log(newPanes);
  };

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  const onEdit = (targetKey, action) => {
    switch (action) {
      case "add":
        add(targetKey);
        break;
      case "remove":
        remove(targetKey);
        break;
    }
  };

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
    >
      {panes.map((pane) => (
        <TabPane
          tab={childNode(pane.title, pane.key)}
          key={pane.key}
          closable={pane.closable}
        >
          {pane.content}
        </TabPane>
      ))}
    </Tabs>
  );
}

export default DynamicTabs;
