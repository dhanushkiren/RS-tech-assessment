import React from 'react';
import { Camera } from 'lucide-react';

const EmployeeForm = ({
  mode, // "add" | "edit" | "view"
  formData,
  errors,
  onChange,
  onImageChange,
  onSubmit,
  onCancel,
  loading,
}) => {
  const isReadOnly = mode === 'view';
  const submitText = mode === 'add' ? ' Confirm' : 'Save Changes';

  return (
    <form onSubmit={onSubmit} className="space-y-8 px-4">
      {/* Profile Image Upload Section */}
      <div className="relative w-28 h-28 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer">
        {formData.avatarPreview ? (
          <img
            src={formData.avatarPreview}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {!isReadOnly && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="hidden"
              id="profileImageInput"
            />
            <label
              htmlFor="profileImageInput"
              className="absolute bottom-1 right-1 bg-white dark:bg-gray-700 rounded-full p-1 shadow cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
              title="Change Profile Image"
            >
              <Camera className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </label>
          </>
        )}
      </div>
      <span className="text-xs text-gray-400">Profile photo (optional)</span>

      {/* Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-base font-semibold text-gray-900 dark:text-white mb-2">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Enter name"
            readOnly={isReadOnly}
            className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-100 dark:bg-gray-700 dark:text-white text-lg outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } ${isReadOnly ? 'cursor-not-allowed bg-gray-100 dark:bg-gray-800' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-base font-semibold text-gray-900 dark:text-white mb-2">Employee ID*</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={onChange}
            placeholder="Enter employee ID"
            readOnly={isReadOnly}
            className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white text-lg outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.employeeId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } ${isReadOnly ? 'cursor-not-allowed bg-gray-100 dark:bg-gray-800' : ''}`}
          />
          {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
        </div>

        {/* Department */}
        <div>
          <label className="block text-base font-semibold text-gray-900 dark:text-white mb-2">Department*</label>
          <select
            name="department"
            value={formData.department}
            onChange={onChange}
            disabled={isReadOnly}
            className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white text-lg outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.department ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } ${isReadOnly ? 'cursor-not-allowed bg-gray-100 dark:bg-gray-800' : ''}`}
          >
            <option value="">Select Department</option>
            {['Design', 'Development', 'Marketing', 'HR', 'Sales'].map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
        </div>

        {/* Designation */}
        <div>
          <label className="block text-base font-semibold text-gray-900 dark:text-white mb-2">Designation*</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={onChange}
            disabled={isReadOnly}
            className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white text-lg outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.designation ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } ${isReadOnly ? 'cursor-not-allowed bg-gray-100 dark:bg-gray-800' : ''}`}
          >
            <option value="">Select designation</option>
            {['Design Lead', 'Senior Developer', 'Manager', 'Executive', 'Intern'].map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
        </div>

        {/* Project */}
        <div>
          <label className="block text-base font-semibold text-gray-900 dark:text-white mb-2">Project</label>
          <input
            type="text"
            name="project"
            value={formData.project}
            onChange={onChange}
            placeholder="Enter Project"
            readOnly={isReadOnly}
            className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white text-lg outline-none focus:ring-2 focus:ring-blue-500 ${
              isReadOnly ? 'cursor-not-allowed bg-gray-100 dark:bg-gray-800' : ''
            }`}
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-base font-semibold text-gray-900 dark:text-white mb-2">Type*</label>
          <select
            name="type"
            value={formData.type}
            onChange={onChange}
            disabled={isReadOnly}
            className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white text-lg outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.type ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } ${isReadOnly ? 'cursor-not-allowed bg-gray-100 dark:bg-gray-800' : ''}`}
          >
            <option value="">Select Type</option>
            {['Office', 'Remote', 'Hybrid'].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-base font-semibold text-gray-900 dark:text-white mb-2">Status*</label>
          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            disabled={isReadOnly}
            className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white text-lg outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.status ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } ${isReadOnly ? 'cursor-not-allowed bg-gray-100 dark:bg-gray-800' : ''}`}
          >
            <option value="">Select Status</option>
            {['Active', 'Probation', 'Permanent', 'Contract','Inactive'].map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
        </div>
      </div>

      {/* Action Buttons */}
      {!isReadOnly && (
        <div className="flex justify-end space-x-4 pt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-500 bg-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-lg font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
          >
            {loading ? (mode === 'add' ? 'Adding...' : 'Saving...') : submitText}
          </button>
        </div>
      )}
    </form>
  );
};

export default EmployeeForm;
