// import { useState } from "react";
import "./App.css";

import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import EmployeeComponent from "./components/EmployeeComponent";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <HeaderComponent />
      <Routes>
        {/* http://localhost:5173 */}
        <Route path='/' element={  <ListEmployeeComponent />}></Route>

        {/* http://localhost:5173/employee */}
        <Route path='/employee' element={  <ListEmployeeComponent />}></Route>

        {/* //http://localhost:5173/add-employee */}
        <Route path='/add-employee' element={ <EmployeeComponent />}></Route>

          {/* //http://localhost:5173/edit-employee */}
          <Route path="/update-employee/:id" element={<EmployeeComponent />} />
      </Routes>
    <FooterComponent />
    </BrowserRouter>
          
    </>
  );
}

export default App;
