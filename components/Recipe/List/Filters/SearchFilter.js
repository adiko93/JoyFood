import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSearch, updateFilters } from "../../../../state/listSlice";

export default function SearchFilter() {
  const dispatch = useDispatch();
  const searchState = useSelector(getSearch);

  return (
    <Input
      placeholder="Search for a recipe..."
      allowClear
      name="search"
      size="medium"
      onChange={(event) =>
        dispatch(updateFilters({ name: "search", value: event.target.value }))
      }
      value={searchState}
    />
  );
}
