import { InputNumber, Slider, Tooltip } from "antd";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCookingTime,
  updateFilters,
  updateInArrayFilters,
} from "../../../../state/listSlice";
import minutesToHours from "../../../../utility/minutesToHours";

const CookingTimeFilter: React.FC = () => {
  const dispatch = useDispatch();
  const cookingTimeState = useSelector(getCookingTime);

  return (
    <>
      <Slider
        range
        min={1}
        max={2000}
        defaultValue={cookingTimeState as [number, number]}
        value={cookingTimeState as [number, number]}
        tipFormatter={(key) => minutesToHours(key!)}
        onChange={(key) =>
          dispatch(updateFilters({ name: "cookingTime", value: key }))
        }
        style={{ marginBottom: "1.5rem" }}
      />
      <Tooltip title="In minutes">
        {" "}
        Min:
        <InputNumber
          min={1}
          max={2000}
          style={{ margin: "0 5px", width: "28%" }}
          value={cookingTimeState[0]}
          onChange={(key) =>
            dispatch(
              updateInArrayFilters({
                name: "cookingTime",
                value: key,
                number: 0,
              })
            )
          }
        />
      </Tooltip>
      <Tooltip title="In minutes">
        {"     "}
        Max:
        <InputNumber
          min={1}
          max={2000}
          style={{ margin: "0 5px", width: "28%" }}
          value={cookingTimeState[1]}
          onChange={(key) =>
            dispatch(
              updateInArrayFilters({
                name: "cookingTime",
                value: key,
                number: 1,
              })
            )
          }
        />
      </Tooltip>
    </>
  );
};

export default CookingTimeFilter;
