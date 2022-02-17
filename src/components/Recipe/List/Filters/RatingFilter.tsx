import { Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getRating, updateFilters } from "../../../../state/listSlice";

const RatingFilter: React.FC = () => {
  const dispatch = useDispatch();
  const ratingState = useSelector(getRating);

  return (
    <Slider
      range
      min={0}
      max={5}
      value={ratingState}
      step={0.5}
      tipFormatter={(key) => `${key} ${key! <= 1 ? "star" : "stars"}`}
      onChange={(key) =>
        dispatch(updateFilters({ name: "rating", value: key }))
      }
      style={{ marginBottom: "1.5rem" }}
    />
  );
};

export default RatingFilter;
