import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-hot-toast';
import * as api from '../../utils/api';
import {
  fetchEmployeesRequest,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  addEmployeeRequest,
  addEmployeeSuccess,
  addEmployeeFailure,
  deleteEmployeeRequest,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  updateEmployeeRequest,
  updateEmployeeSuccess,
  updateEmployeeFailure,
} from './employeeSlice';

function* fetchEmployeesSaga() {
  try {
    const response = yield call(api.fetchEmployees);
    yield put(fetchEmployeesSuccess(response.data));
  } catch (error) {
    yield put(fetchEmployeesFailure(error.message));
    toast.error('Failed to fetch employees');
  }
}

// Add employee saga
function* addEmployeeSaga(action) {
  try {
    const data = new FormData();
    const payload = action.payload;

    Object.entries(payload).forEach(([key, value]) => {
      if (key === 'avatarFile' && value) {
        data.append('avatar', value);
      } else if (key !== 'avatarPreview') {
        data.append(key, value); 
      }
    });

    const response = yield call(api.addEmployee, data);
    yield put(addEmployeeSuccess(response.data));
    toast.success('Employee added successfully');
  } catch (error) {
    yield put(addEmployeeFailure(error.message));
    toast.error('Failed to add employee');
  }
}

// Update employee saga
function* updateEmployeeSaga(action) {
  try {
    const { id, payload } = action.payload;
    const data = new FormData();

    for (const [key, value] of Object.entries(payload)) {
      if (key !== 'avatarFile' && key !== 'avatarPreview') {
        data.append(key, value);
      }
    }

    if (payload.avatarFile) {
      data.append('avatar', payload.avatarFile);
    }

    const response = yield call(api.updateEmployee, id, data);
    yield put(updateEmployeeSuccess(response.data));
    toast.success('Employee updated successfully');
  } catch (error) {
    yield put(updateEmployeeFailure(error.message));
    toast.error('Failed to update employee');
  }
}


function* deleteEmployeeSaga(action) {
  try {
    yield call(api.deleteEmployee, action.payload);
    yield put(deleteEmployeeSuccess(action.payload));
    toast.success('Employee deleted successfully');
  } catch (error) {
    yield put(deleteEmployeeFailure(error.message));
    toast.error('Failed to delete employee');
  }
}

function* employeeSaga() {
  yield takeLatest(fetchEmployeesRequest.type, fetchEmployeesSaga);
  yield takeEvery(addEmployeeRequest.type, addEmployeeSaga);
  yield takeEvery(updateEmployeeRequest.type, updateEmployeeSaga);
  yield takeEvery(deleteEmployeeRequest.type, deleteEmployeeSaga);
}

export default employeeSaga;