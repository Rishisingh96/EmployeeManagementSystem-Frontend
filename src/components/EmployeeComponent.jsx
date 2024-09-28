import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeServices";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  // Get the ID from the URL
  //const [employees,setEmployees] = useState
  const navigator = useNavigate(); // For navigating after employee is saved

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  //3 way do reduce code boilerplate  use directly in onChange ()
  //Way 2
  //   const handleFirstName = (e) => setFirstName(e.target.value);

  //   const handleLastName = (e) => setLastName(e.target.value);

  //   const handleEmailName = (e) => setEmail(e.target.value);

  //   const handleFirstName = (e) => {
  //     setFirstName(e.target.value);
  //   };

  //way 1
  //   const handleLastName = (e) => {
  //     setLastName(e.target.value);
  //   };

  //   const handleEmailName = (e) => {
  //     setEmail(e.target.value);
  //   };

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employee");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // Call the service to create employee
        createEmployee(employee)
          .then((response) => {
            console.log(response.data); // Navigate to employee list after success
            navigator("/employee");
          })
          .catch((error) => {
            console.error("There was an error saving the employee!", error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors }; // seprater oprator use for call error function

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email name is required";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card col-md-6 shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center mb-4">{pageTitle()}</h2>
          <div className="card-body">
            <form>
              {/* First Name Input */}
              <div className="form-group mb-3">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  //   onChange={handleFirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              {/* Last Name Input */}
              <div className="form-group mb-3">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  //   onChange={handleLastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              {/* Email Input */}
              <div className="form-group mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  //   className="form-control"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  //   onChange={handleEmailName}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* Submit Button */}
              <div className="d-grid">
                <button
                  className="btn btn-success btn-block"
                  onClick={saveOrUpdateEmployee}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
