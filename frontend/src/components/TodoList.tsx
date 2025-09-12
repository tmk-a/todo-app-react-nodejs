import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { selectTodos, selectFilterStatus } from "../redux/todoSlice";

const TodoList = () => {
  const todos = useSelector(selectTodos);
  const filterStatus = useSelector(selectFilterStatus);

  //   const todosByStatus = {
  //     todo: todos.filter((todo) => todo.status === "todo"),
  //     "in-progress": todos.filter((todo) => todo.status === "in-progress"),
  //     done: todos.filter((todo) => todo.status === "done"),
  //   };

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
        filteredTodos.map((todo) => <TodoItem key={todo.id} item={todo} />)
      ) : (
        <h1>No tasks</h1>
      )}
    </ul>
    // <div className="flex flex-col gap-4 md:flex-row md:justify-between p-4">
    //   <div className="md:w-1/3 p-2 bg-gray-100 rounded-md">
    //     <h2 className="text-xl font-bold mb-2">Todo</h2>
    //     <ul className="space-y-2">
    //       {todosByStatus.todo.length > 0 ? (
    //         todosByStatus.todo.map((todo) => (
    //           <TodoItem key={todo.id} item={todo} />
    //         ))
    //       ) : (
    //         <p className="text-gray-500">No tasks</p>
    //       )}
    //     </ul>
    //   </div>

    //   <div className="md:w-1/3 p-2 bg-blue-100 rounded-md">
    //     <h2 className="text-xl font-bold mb-2">In Progress</h2>
    //     <ul className="space-y-2">
    //       {todosByStatus["in-progress"].length > 0 ? (
    //         todosByStatus["in-progress"].map((todo) => (
    //           <TodoItem key={todo.id} item={todo} />
    //         ))
    //       ) : (
    //         <p className="text-gray-500">No tasks</p>
    //       )}
    //     </ul>
    //   </div>

    //   <div className="md:w-1/3 p-2 bg-green-100 rounded-md">
    //     <h2 className="text-xl font-bold mb-2">Done</h2>
    //     <ul className="space-y-2">
    //       {todosByStatus.done.length > 0 ? (
    //         todosByStatus.done.map((todo) => (
    //           <TodoItem key={todo.id} item={todo} />
    //         ))
    //       ) : (
    //         <p className="text-gray-500">No tasks</p>
    //       )}
    //     </ul>
    //   </div>
    // </div>
  );
};

export default TodoList;
