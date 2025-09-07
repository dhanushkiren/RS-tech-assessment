// src/components/Employee/EmployeeList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchEmployeesRequest, setSearchTerm, toggleDeleteModal } from '../../redux/employee/employeeSlice';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employees, loading, searchTerm } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployeesRequest());
  }, [dispatch]);

  // Safe filtering with optional chaining
  const filteredEmployees = employees.filter((employee) =>
    (employee.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (employee.employeeId?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (employee.department?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    navigate('/employees/add');
  };

  const handleViewEmployee = (id) => {
    navigate(`/employees/view/${id}`);
  };

  const handleEditEmployee = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleDeleteEmployee = (employee) => {
    dispatch(toggleDeleteModal(employee));
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Employee</h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full sm:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
          <button
            onClick={handleAddEmployee}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Employee</span>
          </button>
        </div>
      </div>
      
      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Employee Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Employee ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-16 text-center text-gray-800 dark:text-gray-300 font-medium text-2xl">
                    No records found
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-300">
                          {employee.avatarUrl ? (
                            <img
                              src={`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${employee.avatarUrl}`}
                              alt={employee.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-medium text-gray-700">
                              {employee.name?.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{employee.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{employee.employeeId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{employee.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{employee.designation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{employee.project || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{employee.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          employee.status === 'Inactive'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : employee.status === 'Active' || employee.status === 'Permanent'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                      <div className="relative group">
                        <button
                          onClick={() => handleViewEmployee(employee.id)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 scale-0 rounded bg-gray-900 px-2 py-1 text-xs text-white transition-all group-hover:scale-100 whitespace-nowrap pointer-events-none">
                          View
                        </span>
                      </div>

                      <div className="relative group">
                        <button
                          onClick={() => handleEditEmployee(employee.id)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 scale-0 rounded bg-gray-900 px-2 py-1 text-xs text-white transition-all group-hover:scale-100 whitespace-nowrap pointer-events-none">
                          Edit
                        </span>
                      </div>

                      <div className="relative group">
                        <button
                          onClick={() => handleDeleteEmployee(employee)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 scale-0 rounded bg-gray-900 px-2 py-1 text-xs text-white transition-all group-hover:scale-100 whitespace-nowrap pointer-events-none">
                          Delete
                        </span>
                      </div>
                    </div>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
