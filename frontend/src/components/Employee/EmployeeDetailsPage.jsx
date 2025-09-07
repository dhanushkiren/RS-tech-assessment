import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, User } from 'lucide-react'; // Import icons
import EmployeeForm from './EmployeeForm';
import { addEmployeeRequest, updateEmployeeRequest, fetchEmployeesRequest } from '../../redux/employee/employeeSlice';

const EmployeeDetailsPage = ({ mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, loading } = useSelector(state => state.employees);
  const { id } = useParams(); // employee id for edit/view

  const emptyForm = {
    name: '',
    employeeId: '',
    department: '',
    designation: '',
    project: '',
    type: '',
    status: '',
    avatarFile: null,
    avatarPreview: ''
  };

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});


  useEffect(() => {
  if ((mode === 'edit' || mode === 'view') && id) {
    const emp = employees.find(e => e.id === Number(id));
    if (emp) {
      setFormData({ ...emp, avatarPreview: emp.avatarUrl ? `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${emp.avatarUrl}` : '' });
    } else {
      // Employee not in store, fetch from API
      dispatch(fetchEmployeesRequest(id));
    }
  }
}, [mode, id, employees, dispatch]);

  useEffect(() => {
    if ((mode === 'edit' || mode === 'view') && id) {
      const emp = employees.find(e => e.id === Number(id));
      if (emp) {
        setFormData({
          name: emp.name || '',
          employeeId: emp.employeeId || '',
          department: emp.department || '',
          designation: emp.designation || '',
          project: emp.project || '',
          type: emp.type || '',
          status: emp.status || '',
          avatarFile: null,
          avatarPreview: emp.avatarUrl
            ? `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${emp.avatarUrl}`
            : ''
        });
      }
    }
  }, [mode, id, employees]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const onImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFormData(prev => ({
      ...prev,
      avatarFile: file,
      avatarPreview: URL.createObjectURL(file),  // <-- This makes preview possible
    }));
  }
};

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.status) newErrors.status = 'Status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (validateForm()) {
    const payload = { ...formData };
    // delete payload.avatarFile; 
    if (mode === 'edit' && id) {
        
      dispatch(updateEmployeeRequest({ id: Number(id), payload }));
    } else {
      dispatch(addEmployeeRequest(payload));
    }
    navigate('/employees');
  }
};


  const handleCancel = () => {
    navigate('/employees');
  };

  // Dynamic header text (unchanged)
  const headerText =
    mode === 'add'
      ? 'Add New Employee'
      : mode === 'edit'
      ? 'Edit Employee Details'
      : 'View Employee Details';

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 mt-2">
      {/* Back Button + Heading */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleCancel}
          className="rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Back"
        >
          <ChevronLeft className="w-10 h-10 text-gray-700 dark:text-white" />
        </button>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white ml-4">{headerText}</h1>
      </div>

      {/* Personal Information Tab style */}
      <div className="flex items-center mb-6 px-4">
        <div className="flex items-center space-x-2 border-b-2 border-blue-600 pb-1 mr-8">
          <User className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-blue-600 text-lg">Personal Information</span>
        </div>
      </div>

      <EmployeeForm
        mode={mode}
        formData={formData}
        errors={errors}
        onChange={handleInputChange}
        onImageChange={onImageChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};

export default EmployeeDetailsPage;
