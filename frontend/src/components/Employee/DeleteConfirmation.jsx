import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { deleteEmployeeRequest, toggleDeleteModal } from '../../redux/employee/employeeSlice';

const DeleteConfirmation = () => {
  const dispatch = useDispatch();
  const { showDeleteModal, selectedEmployee, loading } = useSelector((state) => state.employees);

  const handleDelete = () => {
    if (selectedEmployee) {
      dispatch(deleteEmployeeRequest(selectedEmployee.id));
    }
  };

  const handleCancel = () => {
    dispatch(toggleDeleteModal(null));
  };

  if (!showDeleteModal || !selectedEmployee) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Are you sure you want to Delete
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This action will permanently delete {selectedEmployee.name} from the system.
          </p>
          
          <div className="flex space-x-4">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Deleting...' : 'Yes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;