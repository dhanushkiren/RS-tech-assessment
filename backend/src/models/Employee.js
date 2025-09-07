import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Employee = sequelize.define(
  "employee",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: { type: DataTypes.STRING(120), allowNull: false },
    employeeId: { type: DataTypes.STRING(32), allowNull: false, unique: true },
    department: { type: DataTypes.STRING(80), allowNull: false },
    designation: { type: DataTypes.STRING(120), allowNull: false },
    project: { type: DataTypes.STRING(120), allowNull: true },

    type: {
      type: DataTypes.ENUM("Office", "Remote", "Hybrid"),
      allowNull: false,
      defaultValue: "Office",
    },
    status: {
      type: DataTypes.ENUM("Permanent", "Internship", "Probation", "Contract", "Active", "Inactive"),
      allowNull: false,
      defaultValue: "Probation",
    },

    avatarUrl: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    tableName: "employee_table",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Employee;
