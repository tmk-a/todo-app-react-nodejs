// src/redux/todoActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type Todo } from "./todoSlice";
import * as todoApi from "../api/todoApi";
import type { RootState } from "./store";

export const getAllTodos = createAsyncThunk<Todo[]>(
  "todos/getAllTodos",
  async (_, { rejectWithValue }) => {
    try {
      return await todoApi.getAllTodos();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (newTodo: Omit<Todo, "_id">, { rejectWithValue }) => {
    try {
      return await todoApi.createTodo(newTodo);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (
    {
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
    },
    { rejectWithValue }
  ) => {
    try {
      return await todoApi.updateTodo({
        id,
        newTitle,
        newDec,
        newStatus,
        newPriority,
      });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const todo = state.todo.todos.find((t) => t._id === id);
      if (!todo) {
        throw new Error("Todo not found.");
      }
      const newStatus = todo.status === "done" ? "in-progress" : "done";
      return await todoApi.updateTodoStates(id, newStatus);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (id: string, { rejectWithValue }) => {
    try {
      return await todoApi.deleteTodo(id);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
