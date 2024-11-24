import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import { studentData } from "./../../data/studentsData";
import StudentTable from "../../Components/Pages/StudentTable";

const StudentDashboard = () => {
  return (
    <Flex direction="column">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <HeadingButtonSection
          path="/university/addStudent"
          headingText="Students"
          bodyText="View and Manage students here"
          buttonText="Add New Student"
        />
        <StudentTable data={studentData}></StudentTable>
      </Box>
      <Footer />
    </Flex>
  );
};

export default StudentDashboard;
