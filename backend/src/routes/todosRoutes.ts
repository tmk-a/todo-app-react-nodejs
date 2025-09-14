import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  updateStatus,
  deleteTodo,
} from "../controller/todosController";

const router = Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.patch("/:id", updateStatus);
router.delete("/:id", deleteTodo);

export default router;
