import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasksController.js";
import { isAdmin } from "../auths/isAdmin.js";

const router = express.Router();

router.post("/create-new-task", isAdmin, createTask);
router.get("/tasks", getTasks);
router.put("/update-task/:id", isAdmin, updateTask);
router.delete("/delete-task/:id", isAdmin, deleteTask);

export default router;
