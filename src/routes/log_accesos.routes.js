import { Router } from "express";
import {
  getLogs,
  getLogsByUsuario,
  createLog,
  deleteLog,
} from "../controllers/log_accesos.controller.js";

const router = Router();

router.get("/logs", getLogs);
router.get("/logs/usuario/:usuario_id", getLogsByUsuario);
router.post("/logs", createLog);
router.delete("/logs/:id", deleteLog);

export default router;
