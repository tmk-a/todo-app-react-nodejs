import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  editTodo,
  removeTodo,
  toggleTodo,
  type Todo,
} from "../redux/todoSlice";

type TodoItemProps = {
  item: Todo;
};

const TodoItem = ({ item }: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedDec, setEditedDec] = useState(item.dec);
  const [editedStatus, setEditedStatus] = useState(item.status);
  const [editedPriority, setEditedPriority] = useState(item.priority);

  const dispatch = useDispatch();

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      editTodo({
        id: item.id,
        newTitle: editedTitle,
        newDec: editedDec,
        newStatus: editedStatus,
        newPriority: editedPriority,
      })
    );
    setIsEdit(false);
  };

  const handleDelete = () => {
    dispatch(removeTodo(item.id));
  };

  const handleToggle = () => {
    dispatch(toggleTodo(item.id));
  };

  // after handleToggle, update　editedStatus
  useEffect(() => {
    setEditedStatus(item.status);
  }, [item.status]);

  // style
  let priority;
  switch (item.priority) {
    case "low":
      priority = "text-blue-500 bg-blue-200";
      break;
    case "medium":
      priority = "text-green-500 bg-green-200";
      break;
    case "high":
      priority = "text-red-500 bg-red-200";
      break;
    default:
      priority = "text-gray-500 bg-gray-200";
      break;
  }

  return (
    <li key={item.id} className="border-1 border-gray-900 p-2">
      {isEdit ? (
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-1">
          <div>
            <select
              id="status"
              name="status"
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In-Progress</option>
              <option value="done">Done</option>
            </select>
            <select
              id="priority"
              name="priority"
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <input
            type="text"
            name="title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="px-2 py-1 border-1 border-gray-400 rounded-md"
          />
          <input
            type="text"
            name="dec"
            value={editedDec}
            onChange={(e) => setEditedDec(e.target.value)}
            className="px-2 py-1 border-1 border-gray-400 rounded-md"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="text-green-600 hover:text-green-300 cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEdit(false)}
              className="text-red-600 hover:text-red-300 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <div className="flex gap-1">
              <input
                type="checkbox"
                checked={item.status === "done"}
                onChange={handleToggle}
              />
              <p>{item.status}</p>
            </div>
            <p className={`text-end ${priority} rounded-lg px-1`}>
              {item.priority}
            </p>
          </div>
          <p>{item.title}</p>
          <p>{item.dec}</p>
          <div className="flex gap-4">
            <button
              className="text-start w-fit text-green-600 hover:text-green-300 cursor-pointer"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
            <button
              className="text-start w-fit text-red-600 hover:text-red-300 cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
