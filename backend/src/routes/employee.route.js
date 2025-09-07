import { Router } from "express";
import {
  listEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employeeController.js";
import { upload } from "../middlewares/upload.js";
import { validateBody } from "../middlewares/validateBody.js";
import { employeeSchema } from "../validations/employee.scheme.js";

const router = Router();

// GET /api/employees?q=search
router.get("/", listEmployees);
router.get("/:id", getEmployee);

// POST with optional avatar: field name "avatar"
router.post(
  "/",
  upload.single("avatar"),
  validateBody(employeeSchema),
  createEmployee
);

// PUT with optional avatar
router.put(
  "/:id",
  upload.single("avatar"),
  validateBody(employeeSchema),
  updateEmployee
);

router.delete("/:id", deleteEmployee);

export default router;
