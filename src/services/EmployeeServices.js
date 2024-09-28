import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employee';

// Function to list all employees
export const listEmployees = () => axios.get(REST_API_BASE_URL);

// Function to create an employee (POST request)
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

// Function to get an employee by ID (GET request)
// export const getEmployee = (employeeId) => axios.get(`${REST_API_BASE_URL}/${employeeId}`);
export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL+'/'+employeeId);

export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL+'/'+employeeId,employee);

export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL+'/'+employeeId);
// OR
// export const listEmployees =()=>{
//     return axios.get(REST_API_BASE_URL);
// }