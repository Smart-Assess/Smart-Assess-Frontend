import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/SuperAdmin/Dashboard";
import AddUniversity from "./Pages/SuperAdmin/AddUniversity";
import EditUniversity from "./Pages/SuperAdmin/EditUniversity";
import StudentsDashboard from "./Pages/Student/StudentsDashboard";
import AllAssignments from "./Pages/Student/AllAssignments";
import AssignmentsList from "./Pages/Student/AssignmentsList";
import StudentsEvaluation from "./Pages/Student/StudentsEvaluation";
import StudentProfile from "./Pages/Student/StudentProfile";
import StudentDashboard from "./Pages/UniversityAdmin/StudentDashboard";
import AddStudent from "./Pages/UniversityAdmin/AddStudent";
import EditStudent from "./Pages/UniversityAdmin/EditStudent";
import TeacherDashboard from "./Pages/UniversityAdmin/TeacherDashboard";
import AddTeacher from "./Pages/UniversityAdmin/AddTeacher";
import EditTeacher from "./Pages/UniversityAdmin/EditTeacher";
import UploadAssignment from "./Pages/Student/UploadAssingment";
import TeacherMainDashboard from "./Pages/Teacher/Dashboard";
import AddCourse from "./Pages/Teacher/AddCourse";
import EditCourse from "./Pages/Teacher/EditCourse";
import CreateAssignment from "./Pages/Teacher/CreateAssignment";
import ViewRequest from "./Pages/Teacher/ViewRequest";
import EvaluateAssignment from "./Pages/Teacher/EvaluateAssignment";
import ViewAssignments from "./Pages/Teacher/ViewAssignments";
import ViewSubmissions from "./Pages/Teacher/ViewSubmissions";
import Grading from "./Pages/Teacher/Grading";
import CourseMaterial from "./Pages/Student/CourseMaterial";  // Ensure correct import
import Reesults from "./Pages/Student/Reesults";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Login />} />

      {/* SuperAdmin */}
      <Route path="/superadmin/dashboard" element={<Dashboard />} />
      <Route path="/superadmin/addUniversity" element={<AddUniversity />} />
      <Route path="/superadmin/editUniversity/:id" element={<EditUniversity />} />

      {/* Students */}
      <Route path="/student/Dashboard" element={<StudentsDashboard />} />
      <Route path="/student/allAssignments/:course_id" element={<AllAssignments />} />
      <Route path="/student/assignmentsList" element={<AssignmentsList />} />
      <Route path="/student/studentsEvaluation" element={<StudentsEvaluation />} />
      <Route path="/student/studentProfile" element={<StudentProfile />} />
      <Route path="/student/uploadAssignment/:assignment_id" element={<UploadAssignment />} />
      <Route path="/student/courseMaterial/:course_id" element={<CourseMaterial />} />

      <Route path="/student/results/:assignment_id" element={<Reesults />} />


      {/* UniversityAdmin */}
      <Route path="/university/student/Dashboard" element={<StudentDashboard />} />
      <Route path="/university/addStudent" element={<AddStudent />} />
      <Route path="/university/editStudent" element={<EditStudent />} />
      <Route path="/university/teacher/Dashboard" element={<TeacherDashboard />} />
      <Route path="/university/teacher/addTeacher" element={<AddTeacher />} />
      <Route path="/university/teacher/editTeacher" element={<EditTeacher />} />

      {/* Teacher */}
      <Route path="/teacher/Dashboard" element={<TeacherMainDashboard/>} />
      <Route path="/teacher/addCourse" element={<AddCourse/>} />
      <Route path="/teacher/editCourse/:courseId" element={<EditCourse/>} />
      <Route path="/teacher/createAssignment/:courseId" element={<CreateAssignment/>} />
      <Route path="/teacher/viewRequest/:courseId" element={<ViewRequest/>} />
      <Route path="/teacher/evaluateAssignment" element={<EvaluateAssignment/>} />
      <Route path="/teacher/viewAssignments/:courseId" element={<ViewAssignments/>} />
      <Route path="/teacher/viewStudentsSubmissions/:courseId/:assignmentId" element={<ViewSubmissions/>} />
      <Route path="/teacher/student/grading/:courseId/:assignmentId" element={<Grading/>} />
    </Routes>
  );
};

export default App;
