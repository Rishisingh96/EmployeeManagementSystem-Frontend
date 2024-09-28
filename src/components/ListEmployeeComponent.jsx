import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeServices";
import { useNavigate } from "react-router-dom";
const ListEmployeeComponent = () => {
  const [employee, setEmployee] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function addNewEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/update-employee/${id}`);
  }

  function removeEmployee(id) {
    console.log(id);
    deleteEmployee(id)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //USE DUMMY DATA FOR INSERT
  // const dummyData = [
  //   {
  //     id: 1,
  //     firstName: "Rishi",
  //     lastName: "Singh",
  //     email: "rishi@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     firstName: "Priya",
  //     lastName: "Sharma",
  //     email: "priya.sharma@gmail.com",
  //   },
  //   {
  //     id: 3,
  //     firstName: "Amit",
  //     lastName: "Patel",
  //     email: "amit.patel@gmail.com",
  //   },
  //   {
  //     id: 4,
  //     firstName: "Sneha",
  //     lastName: "Verma",
  //     email: "sneha.verma@gmail.com",
  //   },
  //   {
  //     id: 5,
  //     firstName: "Rahul",
  //     lastName: "Yadav",
  //     email: "rahul.yadav@gmail.com",
  //   },
  //   {
  //     id: 6,
  //     firstName: "Anjali",
  //     lastName: "Gupta",
  //     email: "anjali.gupta@gmail.com",
  //   },
  // ];

  return (
    <div className="container">
      <h2 className="text-center">List of Employee</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeEmployee(employee.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
