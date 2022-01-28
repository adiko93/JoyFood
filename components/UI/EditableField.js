import { Input, InputNumber, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/UI/EditableField.module.css";

function EditableField({
  type = "input",
  size = "normal",
  textClass,
  value,
  changeHandler,
  maxLength,
  minLength = 10,
}) {
  const [editing, setEditing] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const inputRef = useRef();

  const saveEdit = (value) => {
    if (value.target.value.length >= minLength) {
      setEditing(false);
      setTooltipVisible(false);
      return;
    }
    setTooltipVisible(true);
  };
  useEffect(() => {
    if (editing) {
      inputRef?.current?.focus();
    }
  }, [editing]);

  const inputModel = () => {
    let output = null;
    switch (type) {
      case "textarea":
        output = (
          <Input.TextArea
            type={type}
            size={size}
            value={value}
            onPressEnter={(value) => saveEdit(value)}
            onBlur={(value) => saveEdit(value)}
            onChange={(value) => changeHandler(value.target.value)}
            maxLength={maxLength}
            minLength={minLength}
            ref={inputRef}
            style={{ height: "20rem" }}
          />
        );
        break;
      case "input":
        output = (
          <Input
            type={type}
            size={size}
            value={value}
            onPressEnter={(value) => saveEdit(value)}
            onBlur={(value) => saveEdit(value)}
            onChange={(value) => changeHandler(value.target.value)}
            maxLength={maxLength}
            minLength={minLength}
            ref={inputRef}
          />
        );
        break;
      case "number":
        output = (
          <InputNumber
            type={type}
            size={size}
            value={value}
            onPressEnter={(value) => saveEdit(value)}
            onBlur={(value) => saveEdit(value)}
            onChange={(value) => changeHandler(value)}
            maxLength={maxLength}
            minLength={minLength}
            ref={inputRef}
          />
        );
        break;
    }
    return output;
  };

  if (editing) {
    return (
      <Tooltip
        color="red"
        visible={tooltipVisible}
        title={`Minimum ${minLength} charachters required!`}
      >
        {inputModel()}
      </Tooltip>
    );
  }
  return (
    <span
      className={`${textClass} ${type !== "textarea" && styles.text}`}
      onClick={() => setEditing(true)}
    >
      {value}
    </span>
  );
}

export default EditableField;
