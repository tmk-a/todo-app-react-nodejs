import express, { Request, Response } from "express";
import cors from "cors";
import todosRouter from "./routes/todosRoutes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", todosRouter);

app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ error: `Not Found Route - ${req.method} ${req.path}` });
});
