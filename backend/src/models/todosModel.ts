import { TodoModel } from "./schema/todos.schema";

export interface TodoForm {
  title: string;
  dec: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
}

export interface EditedTodo {
  id: string;
  newTitle: string;
  newDec: string;
  newStatus: "todo" | "in-progress" | "done";
  newPriority: "low" | "medium" | "high";
}

export const getAllTodos = async () => {
  try {
    const todos = await TodoModel.find();
    return todos;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createTodo = async (todo: TodoForm) => {
  try {
    const newTodo = await TodoModel.create(todo);
    return newTodo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTodoById = async (todo: EditedTodo) => {
  try {
    const updateTodo = await TodoModel.findByIdAndUpdate(
      todo.id,
      {
        title: todo.newTitle,
        dec: todo.newDec,
        status: todo.newStatus,
        priority: todo.newPriority,
      },
      {
        new: true,
      }
    );
    return updateTodo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTodoStatus = async ({
  id,
  newStatus,
}: {
  id: string;
  newStatus: TodoForm["status"];
}) => {
  try {
    const updateTodoStatus = await TodoModel.findByIdAndUpdate(
      id,
      {
        status: newStatus,
      },
      { new: true }
    );
    return updateTodoStatus;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTodoById = async (id: string) => {
  try {
    const deleteTodo = await TodoModel.findByIdAndDelete(id);
    return deleteTodo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
