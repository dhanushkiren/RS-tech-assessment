import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
  loading: false,
  error: null,
  showAddModal: false,
  showDeleteModal: false,
  selectedEmployee: null,
  searchTerm: '',
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Fetch employees
    fetchEmployeesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    },
    fetchEmployeesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Add employee
    addEmployeeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.employees.unshift(action.payload);
      state.showAddModal = false;
    },
    addEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //update employee
    updateEmployeeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateEmployeeSuccess: (state, action) => {
      state.loading = false;
      // Find and update the employee in the array
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
      state.showAddModal = false;  // Or you may want a separate modal for edit
    },
    updateEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete employee
    deleteEmployeeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
      state.showDeleteModal = false;
      state.selectedEmployee = null;
    },
    deleteEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // UI actions
    toggleAddModal: (state) => {
      state.showAddModal = !state.showAddModal;
    },
    toggleDeleteModal: (state, action) => {
      state.showDeleteModal = !state.showDeleteModal;
      state.selectedEmployee = action.payload || null;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchEmployeesRequest,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  addEmployeeRequest,
  addEmployeeSuccess,
  addEmployeeFailure,
  updateEmployeeRequest,
  updateEmployeeSuccess,
  updateEmployeeFailure,
  deleteEmployeeRequest,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  toggleAddModal,
  toggleDeleteModal,
  setSearchTerm,
  clearError,
} = employeeSlice.actions;

export default employeeSlice.reducer;