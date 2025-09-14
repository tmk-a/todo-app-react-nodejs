import { type Todo } from "../redux/todoSlice";

export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await fetch("http://localhost:8000/api/todos");
  if (!response.ok) {
    throw new Error("Failed to fetch todos.");
  }
  return await response.json();
};

export const createTodo = async (newTodo: Partial<Todo>): Promise<Todo> => {
  const response = await fetch("http://localhost:8000/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error("Failed to create todo.");
  }
  return await response.json();
};

export const updateTodo = async ({
  id,
  newTitle,
  newDec,
  newStatus,
  newPriority,
}: {
  id: string;
  newTitle: string;
  newDec: string;
  newStatus: string;
  newPriority: string;
}) => {
  const response = await fetch(`http://localhost:8000/api/todos/:${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      newTitle,
      newDec,
      newStatus,
      newPriority,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo.");
  }
  return await response.json();
};

export const updateTodoStates = async (id: string, newStatus: string) => {
  const response = await fetch(`http://localhost:8000/api/todos/:${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      newStatus,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to update status of todo.");
  }
  return await response.json();
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(`http://localhost:8000/api/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to create todo.");
  }

  const res = await response.json();
  return res._id;
};
