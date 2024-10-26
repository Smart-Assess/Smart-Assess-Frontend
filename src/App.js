import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/SuperAdmin/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/superadmin/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
