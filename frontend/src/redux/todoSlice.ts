import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type Todo = {
  id: string;
  title: string;
  dec: string;
  status: string;
  priority: string;
};

type TodosState = {
  todos: Todo[];
  filterStatus: "all" | "todo" | "in-progress" | "done";
};

const initialState: TodosState = {
  todos: [],
  filterStatus: "all",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.status = todo.status === "done" ? "in-progress" : "done";
      }
    },
    editTodo: (
      state,
      action: PayloadAction<{
        id: string;
        newTitle: string;
        newDec: string;
        newStatus: string;
        newPriority: string;
      }>
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.newTitle;
        todo.dec = action.payload.newDec;
        todo.status = action.payload.newStatus;
        todo.priority = action.payload.newPriority;
      }
    },
    updateFilter: (
      state,
      action: PayloadAction<TodosState["filterStatus"]>
    ) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, editTodo, updateFilter } =
  todoSlice.actions;

export const selectTodosState = (state: RootState) => state.todo;
export const selectTodos = (state: RootState) => state.todo.todos;
export const selectFilterStatus = (state: RootState) => state.todo.filterStatus;

export default todoSlice.reducer;
