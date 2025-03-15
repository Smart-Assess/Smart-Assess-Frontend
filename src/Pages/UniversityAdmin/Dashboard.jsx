import React, { useState, useEffect } from "react";
import { Box, Flex, Tabs, TabList, Tab } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import { studentData } from "../../data/studentsData";
import { teacherData } from "../../data/TeacherData";
import StudentTable from "../../Components/Pages/StudentTable";
import TeacherTable from "../../Components/Pages/TeacherTable";

const Dashboard = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  // Manage active tab
  const [activeTab, setActiveTab] = useState(type === "teacher" ? 1 : 0);

  useEffect(() => {
    setActiveTab(type === "teacher" ? 1 : 0);
  }, [type]);

  const isStudentPage = activeTab === 0;
  const data = isStudentPage ? studentData : teacherData;
  const headingText = isStudentPage ? "Students" : "Teachers";
  const bodyText = isStudentPage
    ? "View and Manage students here"
    : "View and Manage teachers here";
  const buttonPath = isStudentPage
    ? "/university/addStudent"
    : "/university/addTeacher";

  return (
    <Flex direction="column">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" mt={8}>
        {/* Tabs for Navigation */}
        <Tabs
          variant="soft-rounded"
          colorScheme="blue"
          index={activeTab}
          onChange={(index) => {
            setActiveTab(index);
            navigate(
              index === 0
                ? "/university/student/Dashboard"
                : "/university/teacher/Dashboard"
            );
          }}
        >
          <TabList>
            <Tab>Students</Tab>
            <Tab>Teachers</Tab>
          </TabList>
        </Tabs>

        <HeadingButtonSection
          path={buttonPath}
          headingText={headingText}
          bodyText={bodyText}
          buttonText={`Add New ${headingText}`}
        />

        {isStudentPage ? (
          <StudentTable data={data} />
        ) : (
          <TeacherTable data={data} />
        )}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Dashboard;
