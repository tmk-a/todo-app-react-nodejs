import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTodos } from "../redux/todoActions";
import { selectTodos, selectFilterStatus } from "../redux/todoSlice";
import { type AppDispatch } from "../redux/store";

const TodoList = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const filterStatus = useSelector(selectFilterStatus);
  const loadingStatus = useSelector(
    (state: { todo: { status: string } }) => state.todo.status
  );

  useEffect(() => {
    if (loadingStatus === "idle") {
      dispatch(getAllTodos());
    }
  }, [loadingStatus, dispatch]);

  const filteredTodos = todos.filter((todo) => {
    if (filterStatus === "all") {
      return true;
    } else {
      return todo.status === filterStatus;
    }
  });

  return (
    <ul className="flex flex-col gap-4">
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => <TodoItem key={todo._id} item={todo} />)
      ) : (
        <h1>No tasks</h1>
      )}
    </ul>
  );
};

export default TodoList;
