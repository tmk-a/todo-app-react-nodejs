import { Request, Response } from "express";
import {
  getAllTodos,
  createTodo,
  updateTodoById,
  updateTodoStatus,
  deleteTodoById,
} from "../models/todosModel";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const allTodos = await getAllTodos();
    res.status(200).json(allTodos);
  } catch (error) {
    res.status(500).json({ message: "Failed to get todos." });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const newTodo = await createTodo(req.body);
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Failed to create new todo." });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const newTodo = await updateTodoById(req.body);
    if (!newTodo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo." });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const newTodo = await updateTodoStatus(req.body);
    if (!newTodo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo status." });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newTodo = await deleteTodoById(id);
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo." });
  }
};
