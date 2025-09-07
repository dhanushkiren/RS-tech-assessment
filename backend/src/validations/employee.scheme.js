import * as yup from 'yup';

export const employeeSchema = yup.object().shape({
  name: yup.string().required("Name is required").max(120),
  employeeId: yup.string().required("Employee ID is required").max(32),
  department: yup.string().required("Department is required").max(80),
  designation: yup.string().required("Designation is required").max(120),
  project: yup.string().max(120).nullable(),
  type: yup
    .mixed()
    .oneOf(["Office", "Remote", "Hybrid"])
    .required("Type is required"),
  status: yup
    .mixed()
    .oneOf(["Permanent", "Internship", "Probation", "Contract", "Active", "Inactive"])
    .required("Status is required"),
});