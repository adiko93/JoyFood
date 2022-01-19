import { InputNumber, Slider, Tooltip } from "antd";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCookingTime,
  updateFilters,
  updateInArrayFilters,
} from "../../../../state/listSlice";
import { getMaxCookingTime } from "../../../../state/utilitySlice";
import minutesToHours from "../../../../utility/minutesToHours";

function CookingTimeFilter() {
  const dispatch = useDispatch();
  const cookingTimeState = useSelector(getCookingTime);
  const maxCookingTime = useSelector(getMaxCookingTime);

  // const debounce = _.debounce(() => sendQuery(true), 1000, { maxWait: 1000 });

  // useEffect(() => {
  //   debounce();
  //   return debounce.cancel;
  // }, [filters]);
  // useEffect(() => {});
  return (
    <>
      <Slider
        range
        min={1}
        max={maxCookingTime}
        defaultValue={cookingTimeState}
        value={cookingTimeState}
        tipFormatter={(key) => minutesToHours(key)}
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
          max={maxCookingTime}
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
          max={maxCookingTime}
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
}

export default React.memo(CookingTimeFilter);
