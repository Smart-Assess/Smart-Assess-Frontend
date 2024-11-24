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
import StudentDashboard from "./Pages/UniversityAdmin/StudentDashboard"
import AddStudent from "./Pages/UniversityAdmin/AddStudent"
import EditStudent from "./Pages/UniversityAdmin/EditStudent"
import TeacherDashboard from "./Pages/UniversityAdmin/TeacherDashboard"
import AddTeacher from "./Pages/UniversityAdmin/AddTeacher"
import EditTeacher from "./Pages/UniversityAdmin/EditTeacher";
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* SuperAdmin */}
      <Route path="/superadmin/dashboard" element={<Dashboard />} />
      <Route path="/superadmin/addUniversity" element={<AddUniversity />} />
      <Route path="/superadmin/editUniversity" element={<EditUniversity />} />


      {/* Students */}
      <Route path="/student/Dashboard" element={<StudentsDashboard/>} />
      <Route path="/student/listofAssignments" element={<ListofAssignments/>} />
      <Route path="/student/assignmentsList" element={<AssignmentsList/>} />
      <Route path="/student/studentsEvaluation" element={<StudentsEvaluation/>} />
      <Route path="/student/studentProfile" element={<StudentProfile/>} />


      {/* UniversityAdmin */}
      <Route path="/university/student/Dashboard" element={<StudentDashboard/>} />
      <Route path="/university/addStudent" element={<AddStudent/>} />
      <Route path="/university/editStudent" element={<EditStudent/>} />
      <Route path="/university/teacher/Dashboard" element={<TeacherDashboard/>} />
      <Route path="/university/teacher/addTeacher" element={<AddTeacher/>} />
      <Route path="/university/teacher/editTeacher" element={<EditTeacher/>} />




    </Routes>
  );
};

export default App;
