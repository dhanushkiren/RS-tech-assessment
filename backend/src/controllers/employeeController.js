import Employee from "../models/Employee.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Op } from "sequelize";

export const listEmployees = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const where = q
    ? {
        [Op.or]: [
          { name: { [Op.like]: `%${q}%` } },
          { employeeId: { [Op.like]: `%${q}%` } },
          { department: { [Op.like]: `%${q}%` } },
          { designation: { [Op.like]: `%${q}%` } },
          { project: { [Op.like]: `%${q}%` } }
        ]
      }
    : {};

  const employees = await Employee.findAll({ where, order: [["id", "DESC"]] });
  res.json(employees);
});

export const getEmployee = asyncHandler(async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ message: "Employee not found" });
  res.json(emp);
});

export const createEmployee = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (req.file) {
    payload.avatarUrl = `/${process.env.UPLOAD_DIR || "uploads"}/${req.file.filename}`;
  }

  const created = await Employee.create(payload);
  res.status(201).json(created);
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ message: "Employee not found" });

  if (req.file) {
    req.body.avatarUrl = `/${process.env.UPLOAD_DIR || "uploads"}/${req.file.filename}`;
  }

  await emp.update(req.body);
  res.json(emp);
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ message: "Employee not found" });

  await emp.destroy();
  res.json({ message: "Employee deleted" });
});
