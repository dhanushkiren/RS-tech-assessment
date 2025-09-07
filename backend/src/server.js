import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import app from "./app.js";
import Employee from "./models/Employee.js"; // must import models before sync

const PORT = process.env.PORT || 5000;

// Step 1: ensure database exists
async function ensureDatabase() {
  const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_DIALECT } = process.env;

  // connect WITHOUT db
  const tempSequelize = new Sequelize("", DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
  });

  await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  console.log(`✅ Database ${DB_NAME} is ready`);

  await tempSequelize.close();
}

// Step 2: connect with real Sequelize
import { sequelize } from "./config/db.js"; // your main sequelize instance

const start = async () => {
  try {
    await ensureDatabase(); // create db if missing

    await sequelize.authenticate();
    console.log("✅ Sequelize connected");

    await sequelize.sync({ alter: true }); // create/update tables
    console.log("✅ Tables synced");

    app.listen(PORT, () =>
      console.log(`🚀 API running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Startup error:", err);
    process.exit(1);
  }
};

start();
