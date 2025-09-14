import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoActions";
const TodoInput = () => {
  const [title, setTitle] = useState("");
  const [dec, setDec] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("low");

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(addTodo({ title, dec, status, priority }) as any);

    // clear input
    setTitle("");
    setDec("");
    setStatus("todo");
    setPriority("low");
  };

  return (
    <form
      className="flex flex-col gap-3 border-gray-300 border-2 p-4"
      onSubmit={handleSubmit}
    >
      <h2>Create Task</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type title..."
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-2 py-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type description..."
          name="dec"
          value={dec}
          onChange={(e) => setDec(e.target.value)}
          className="w-full px-2 py-1"
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row md:gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="status" className="text-sm font-medium text-gray-600">
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In-Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="status" className="text-sm font-medium text-gray-600">
            Priority:
          </label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="border-gray-300 border-2 bg-green-900 text-white hover:bg-green-700 cursor-pointer"
      >
        Add
      </button>
    </form>
  );
};

export default TodoInput;
