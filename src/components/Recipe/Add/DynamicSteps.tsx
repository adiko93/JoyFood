import styles from "../../../styles/Recipe/Add/DynamicSteps.module.css";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Button, Divider, Input } from "antd";
import PicturesWall from "./PicturesWall";
import EditableField from "../../UI/EditableField";
import _ from "lodash";
import { useState } from "react";

// TODO: REWORK SCSS + TSX

function DynamicSteps({ steps, setSteps }) {
  const [categoryKey, setCategoryKey] = useState(1);
  const [stepKey, setStepKey] = useState(1);
  const addCategoryHandler = (index) => {
    let newSteps = _.cloneDeep(steps);
    const tempCategoryKey = categoryKey;
    newSteps.push({
      title: "Click here to change category title",
      steps: [{ description: "", image: [] }],
      key: tempCategoryKey,
    });
    setCategoryKey(tempCategoryKey + 1);
    setSteps(newSteps);
  };

  const arrayShift = (array, index, direction) => {
    const toBeMoved = array[index];
    const movedTo = direction === "left" ? array[index - 1] : array[index + 1];
    const newArray = array.map((element, loopIndex) => {
      if (loopIndex === index) return movedTo;
      if (loopIndex === (direction === "left" ? index - 1 : index + 1))
        return toBeMoved;
      return element;
    });
    return newArray;
  };

  const addStepHandler = (categoryIndex) => {
    const tempStepKey = stepKey;
    let newSteps = _.cloneDeep(steps).map((category, index) => {
      if (index === categoryIndex)
        category.steps.push({
          description: "",
          image: [],
          stepKey: tempStepKey,
        });
      return category;
    });
    setStepKey(tempStepKey + 1);
    setSteps(newSteps);
  };
  const removeCategory = (categoryIndex) => {
    let newSteps = _.cloneDeep(steps).filter(
      (category, index) => index !== categoryIndex
    );
    setSteps(newSteps);
  };
  const removeStep = (categoryIndex, stepIndex) => {
    let newSteps = _.cloneDeep(steps).map((category, index) => {
      if (index === categoryIndex)
        category.steps = category.steps.filter(
          (step, index) => index !== stepIndex
        );
      return category;
    });
    setSteps(newSteps);
  };

  const categoryTitleHandler = (value, categoryIndex) => {
    let newSteps = _.cloneDeep(steps);
    newSteps[categoryIndex].title = value;
    setSteps(newSteps);
  };

  const stepsDescriptionHandler = (value, categoryIndex, stepIndex) => {
    let newSteps = _.cloneDeep(steps);
    newSteps[categoryIndex].steps[stepIndex].description = value;
    setSteps(newSteps);
  };
  const stepsImageHandler = (value, categoryIndex, stepIndex) => {
    let newSteps = _.cloneDeep(steps);
    newSteps[categoryIndex].steps[stepIndex].image = value;
    setSteps(newSteps);
  };

  const stepsMoveHandler = (categoryIndex, index, direction) => {
    let newSteps = _.cloneDeep(steps);
    newSteps[categoryIndex].steps = arrayShift(
      steps[categoryIndex].steps,
      index,
      direction
    );
    setSteps(newSteps);
  };

  return steps.map((category, categoryIndex) => {
    return (
      <>
        <div className={styles.stepsContainer} key={category.key}>
          {categoryIndex !== 0 ? <Divider type="horizontal" /> : null}
          <div className={styles.categoryTitle}>
            <EditableField
              textClass={styles.title}
              value={category.title}
              changeHandler={(value) =>
                categoryTitleHandler(value, categoryIndex)
              }
              minLength={5}
              size="large"
            />
            {categoryIndex !== 0 ? (
              <Button
                icon={<MinusOutlined />}
                style={{ marginLeft: "2rem" }}
                type="dashed"
                onClick={() => removeCategory(categoryIndex)}
              >
                Remove Category
              </Button>
            ) : null}
          </div>
          {category.steps.map((step, index, currentArray) => {
            return (
              <div className={styles.stepsStep} key={step.key}>
                <div className={styles.stepsLeftContainter}>
                  <div className={styles.stepsNumber}>
                    <div
                      className={`${styles.stepsArrowUp} ${
                        index !== 0 ? styles.stepsArrowUpActive : null
                      }`}
                      onClick={() =>
                        index !== 0
                          ? stepsMoveHandler(categoryIndex, index, "left")
                          : null
                      }
                    />
                    {index + 1}
                    <div
                      className={`${styles.stepsArrowDown}  ${
                        index === currentArray.length - 1
                          ? null
                          : styles.stepsArrowDownActive
                      }`}
                      onClick={() =>
                        index === currentArray.length - 1
                          ? null
                          : stepsMoveHandler(categoryIndex, index, "right")
                      }
                    />
                  </div>

                  <Button
                    icon={<MinusOutlined />}
                    type="dashed"
                    size="small"
                    shape="round"
                    disabled={index !== 0 ? false : true}
                    onClick={() => removeStep(categoryIndex, index)}
                  >
                    Remove
                  </Button>
                </div>
                <div className={styles.stepsDescription}>
                  <Input.TextArea
                    value={step.description}
                    onChange={(value) =>
                      stepsDescriptionHandler(
                        value.target.value,
                        categoryIndex,
                        index
                      )
                    }
                  />
                  <div className={styles.stepsPictureUpload}>
                    <PicturesWall
                      maxImages="1"
                      fileList={step.image}
                      setFileList={(files) =>
                        stepsImageHandler(files, categoryIndex, index)
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              icon={<PlusOutlined />}
              type="dashed"
              size="large"
              onClick={() => addStepHandler(categoryIndex)}
              className={styles.stepsAddNewStep}
            >
              Add new step
            </Button>
            {steps.length - 1 === categoryIndex ? (
              <Button
                icon={<PlusOutlined />}
                type="dashed"
                size="large"
                className={styles.stepsAddNewStep}
                onClick={() => addCategoryHandler()}
              >
                Add new Category
              </Button>
            ) : null}
          </div>
        </div>
      </>
    );
  });
}

export default DynamicSteps;
