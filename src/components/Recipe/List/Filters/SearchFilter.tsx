import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSearch, updateFilters } from "../../../../state/listSlice";

const SearchFilter: React.FC = () => {
  const dispatch = useDispatch();
  const searchState = useSelector(getSearch);

  return (
    <Input
      placeholder="Search for a recipe..."
      allowClear
      name="search"
      size="middle"
      onChange={(event) =>
        dispatch(updateFilters({ name: "search", value: event.target.value }))
      }
      value={searchState}
    />
  );
};

export default SearchFilter;
