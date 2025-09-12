import { useSelector, useDispatch } from "react-redux";
import { updateFilter, selectFilterStatus } from "../redux/todoSlice";

const TodoFilter = () => {
  const dispatch = useDispatch();
  const filteredBy = useSelector(selectFilterStatus);

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFilter(e.target.value as any));
  };

  return (
    <div className="flex gap-2">
      <h3>Filtered By:</h3>
      <select
        id="filteredBy"
        name="filteredBy"
        value={filteredBy}
        onChange={handleFilter}
      >
        <option value="all">All</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In-Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
};

export default TodoFilter;
