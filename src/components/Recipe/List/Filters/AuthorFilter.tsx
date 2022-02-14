import { Input, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAuthor, updateFilters } from "../../../../state/listSlice";

const AuthorFilter: React.FC = () => {
  const dispatch = useDispatch();
  const authorState = useSelector(getAuthor);

  return (
    <Tooltip title="Case sensitive!">
      <Input
        placeholder="Author"
        allowClear
        name="author"
        value={authorState}
        onChange={(event) =>
          dispatch(updateFilters({ name: "author", value: event.target.value }))
        }
        style={{
          width: "100%",
        }}
      />
    </Tooltip>
  );
};

export default AuthorFilter;
