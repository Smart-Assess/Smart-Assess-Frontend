import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/SuperAdmin/Dashboard";
import AddUniversity from "./Pages/SuperAdmin/AddUniversity";
import EditUniversity from "./Pages/SuperAdmin/EditUniversity";
import StudentsDashboard from "./Pages/Student/StudentsDashboard";
import ListofAssignments from "./Pages/Student/ListofAssignments";
import AssignmentsList from "./Pages/Student/AssignmentsList";
import StudentsEvaluation from "./Pages/Student/StudentsEvaluation"
import StudentProfile from "./Pages/Student/StudentProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/superadmin/dashboard" element={<Dashboard />} />
      <Route path="/superadmin/addUniversity" element={<AddUniversity />} />
      <Route path="/superadmin/editUniversity" element={<EditUniversity />} />
      <Route path="/student/studentsDashboard" element={<StudentsDashboard/>} />
      <Route path="/student/listofAssignments" element={<ListofAssignments/>} />
      <Route path="/student/assignmentsList" element={<AssignmentsList/>} />
      <Route path="/student/studentsEvaluation" element={<StudentsEvaluation/>} />
      <Route path="/student/studentProfile" element={<StudentProfile/>} />
    </Routes>
  );
};

export default App;
