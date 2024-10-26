import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
