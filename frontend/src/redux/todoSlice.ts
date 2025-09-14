import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import {
  getAllTodos,
  addTodo,
  editTodo,
  removeTodo,
  toggleTodo,
} from "./todoActions";

export type Todo = {
  _id: string;
  title: string;
  dec: string;
  status: string;
  priority: string;
};

type TodosState = {
  todos: Todo[];
  filterStatus: "all" | "todo" | "in-progress" | "done";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: TodosState = {
  todos: [],
  filterStatus: "all",
  status: "idle",
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    updateFilter: (
      state,
      action: PayloadAction<TodosState["filterStatus"]>
    ) => {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllTodos
      .addCase(getAllTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(getAllTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to fetch todos.";
      })

      // addTodo
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to add todo.";
      })

      // editTodo
      .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to edit todo.";
      })

      // toggleTodo
      .addCase(toggleTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        if (!action.payload) return;
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to toggle todo.";
      })

      // removeTodo
      .addCase(removeTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to delete todo.";
      });
  },
});

export const { updateFilter } = todoSlice.actions;

export const selectTodosState = (state: RootState) => state.todo;
export const selectTodos = (state: RootState) => state.todo.todos;
export const selectFilterStatus = (state: RootState) => state.todo.filterStatus;

export default todoSlice.reducer;
