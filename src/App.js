import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/SuperAdmin/Dashboard";
import AddUniversity from "./Pages/SuperAdmin/AddUniversity";
import EditUniversity from "./Pages/SuperAdmin/EditUniversity";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/superadmin/dashboard" element={<Dashboard />} />
      <Route path="/superadmin/addUniversity" element={<AddUniversity />} />
      <Route path="/superadmin/editUniversity" element={<EditUniversity />} />
    </Routes>
  );
};

export default App;
