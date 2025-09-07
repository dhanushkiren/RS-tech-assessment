import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import EmployeeList from './components/Employee/EmployeeList';
import EmployeeDetailsPage from './components/Employee/EmployeeDetailsPage';
import DeleteConfirmation from './components/Employee/DeleteConfirmation';

import { setTheme } from './redux/theme/themeSlice';
import ViewEmployeeDetails from './components/Employee/ViewEmployeeDetails';
import ThemeHandler from './utils/ThemeHandler';


function App() {
  const dispatch = useDispatch();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    dispatch(setTheme(mode));
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="flex h-screen bg-white dark:bg-gray-900">
        <Sidebar isMobile={isMobile} isOpen={sidebarOpen} onClose={handleSidebarClose} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={handleMenuClick} />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/employees" replace />} />
              <Route path="/employees" element={<EmployeeList />} />
              {/* <Route path="/employees/add" element={<AddEmployee />} /> */}
              <Route path="/employees/add" element={<EmployeeDetailsPage mode="add" />} />
              <Route path="/employees/edit/:id" element={<EmployeeDetailsPage mode="edit" />} />
              <Route path="/employees/view/:id" element={<ViewEmployeeDetails mode="view" />} />
              {/* Add other routes as needed */}
            </Routes>
          </main>
        </div>

        <DeleteConfirmation />
        
        <ThemeHandler />
        {/* Toaster */}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </Router>
  );
}

export default App;
