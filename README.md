# RS-TECH Employee Management System

This project contains a **backend** API built with Node.js and Express, and a **frontend** React application, organized under the `backend` and `frontend` folders respectively.

**IMPORTANT**
make sure created .env file in both frontend and backend and entered the value.
use example.env for reference.
---

## Prerequisites

- Node.js
- npm or yarn package manager
- React ( vite )

---

## Backend Setup

The backend is a REST API using Express, Sequelize ORM, and includes features such as file uploads and logging.

### Main Packages Used

| Package      | Purpose                                              |
| ------------ | --------------------------------------------------- |
| `express`    | Web framework for building API routes                |
| `yup`        | Data validation and schema definition                 |
| `helmet`     | Security middleware to set HTTP headers               |
| `multer`     | Handling multipart/form-data (file uploads)           |
| `pino`       | Fast, structured logging                              |
| `sequelize`  | ORM for interacting with SQL databases                 |
| `nodemon`    | Auto restarts server during development               |

### Installation and Running

cd backend
npm install
npm run dev # Starts backend in development mode with nodemon

--------------------------------------------------------------------------------

Backend server will typically run at: `http://localhost:5000`

---

## Frontend Setup

The frontend is built with React using Redux Saga for state management and Tailwind CSS for styling.

### Main Packages Used

| Package          | Purpose                                            |
| ---------------- | ------------------------------------------------- |
| `react`          | Frontend UI framework                              |
| `react-hot-toast` | Notification library for showing toast messages   |
| `tailwindcss`    | Utility-first CSS framework                         |
| `lucide-react`   | Icon library for React                              |
| `redux-saga`     | Middleware for Redux to handle async side effects  |

### Installation and Running

cd frontend
npm install
npm run dev # Starts frontend dev server (Vite or CRA)

Frontend dev server typically runs at: `http://localhost:5173`

