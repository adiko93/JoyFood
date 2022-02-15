import { Input, InputNumber, Tooltip } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../../styles/UI/EditableField.module.css";

interface EditableField {
  size: SizeType;
  textClass: string;
  value: string | number;
  changeHandler: (value: string) => void;
  maxLength: number;
  minLength: number;
}

const EditableField: React.FC<EditableField> = ({
  size = "normal" as SizeType,
  textClass,
  value,
  changeHandler,
  maxLength,
  minLength = 10,
}) => {
  const [editing, setEditing] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const inputRef = useRef<Input>(null);

  const saveEdit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    value
  ) => {
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

  if (editing) {
    return (
      <Tooltip
        color="red"
        visible={tooltipVisible}
        title={`Minimum ${minLength} charachters required!`}
      >
        <Input
          size={size}
          value={value}
          onPressEnter={(value) =>
            saveEdit(value as unknown as ChangeEvent<HTMLInputElement>)
          }
          onBlur={(value) => saveEdit(value)}
          onChange={(value) => changeHandler(value.target.value)}
          maxLength={maxLength}
          minLength={minLength}
          ref={inputRef}
        />
      </Tooltip>
    );
  }
  return (
    <span
      className={`${textClass} ${styles.text}`}
      onClick={() => setEditing(true)}
    >
      {value}
    </span>
  );
};

export default EditableField;
