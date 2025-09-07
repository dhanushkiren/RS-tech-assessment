import express from "express";
import cors from "cors";
import path from "path";

import { httpLogger } from './utils/logger.js';
import helmet from 'helmet';

import { fileURLToPath } from "url";
import employeeRoutes from "./routes/employee.route.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(helmet({crossOriginResourcePolicy: false}));
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, "..", process.env.UPLOAD_DIR || "uploads");
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
}, express.static(uploadPath));

// main routes
app.use("/api/employees", employeeRoutes);
// health check
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
