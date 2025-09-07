import React, { useEffect, useState } from 'react';
import { ChevronLeft, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployeesRequest } from '../../redux/employee/employeeSlice';

const ViewEmployeeDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { employees, loading } = useSelector(state => state.employees);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (!employees.length) {
      dispatch(fetchEmployeesRequest());
    }
  }, [dispatch, employees.length]);

  useEffect(() => {
    if (employees.length) {
      const found = employees.find(emp => String(emp.id) === String(id));
      setEmployee(found || null);

    }
  }, [employees, id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-6 p-8 text-center text-gray-600 dark:text-gray-400">
        Loading employee details...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="max-w-6xl mx-auto mt-6 p-8 text-gray-800 dark:text-gray-300">
        Employee not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 pb-12">
      {/* Header with Back Button and Title */}
      <div className="flex items-center pb-4">
        <button
          onClick={() => navigate("/employees")}
          className="rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Back"
        >
          <ChevronLeft className="w-10 h-10 text-gray-700 dark:text-white" />
        </button>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white ml-4">
          View Employee Details
        </h1>
      </div>

      {/* Personal Information Tab */}
      <div className="flex items-center mb-5 ml-3">
        <div className="flex items-center space-x-2 border-b-2 border-blue-600 pb-1 mr-8">
          <User className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-blue-600 text-lg">Personal Information</span>
        </div>
      </div>

      {/* Profile and details */}
      <div className="ml-3 text-gray-800 dark:text-gray-300">

        {/* Profile image and Basic Info */}
        <div className="flex flex-col md:flex-col items-start mt-6 mb-8 space-y-4 md:space-y-0 md:space-x-20">
          {employee.avatarUrl ? (
            <img
                src={`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${employee.avatarUrl}`}
                alt={employee.name}
                className="w-28 h-28 rounded-lg object-cover border-2 border-gray-200"
            />
            ) : (
            <div className="w-28 h-28 rounded-lg flex items-center justify-center border-2 border-gray-300 text-gray-500 italic text-sm">
                No Profile Pic
            </div>
            )}
          <div className="flex flex-col w-full mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 w-full">
              <div>
                <div className="text-gray-500 mb-1">Name</div>
                <div className="text-lg text-gray-900 dark:text-gray-300">{employee.name}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Employee ID</div>
                <div className="text-lg text-gray-900 dark:text-gray-300">{employee.employeeId}</div>
              </div>
            </div>
          </div>
        </div>
        <hr />

        {/* Department/Designation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 mt-6">
          <div className="mb-6">
            <div className="text-gray-500 mb-1">Department</div>
            <div className="text-lg text-gray-900 dark:text-gray-300">{employee.department}</div>
          </div>
          <div className="mb-6">
            <div className="text-gray-500 mb-1">Designation</div>
            <div className="text-lg text-gray-900 dark:text-gray-300">{employee.designation}</div>
          </div>
        </div>
        <hr />

        {/* Project/Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 mt-6">
          <div className="mb-6">
            <div className="text-gray-500 mb-1">Project</div>
            <div className="text-lg text-gray-900 dark:text-gray-300">{employee.project}</div>
          </div>
          <div className="mb-6">
            <div className="text-gray-500 mb-1">Type</div>
            <div className="text-lg text-gray-900 dark:text-gray-300">{employee.type}</div>
          </div>
        </div>
        <hr />

        {/* Status */}
        <div className="mb-6 mt-6">
          <div className="text-gray-500 mb-1">Status</div>
          <div className="text-lg text-gray-900 dark:text-gray-300">{employee.status}</div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ViewEmployeeDetails;
