import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import { teacherData } from "./../../data/TeacherData";
import TeacherTable from "../../Components/Pages/TeacherTable";

const TeacherDashboard = () => {
  return (
    <Flex direction="column">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <HeadingButtonSection
          path="/university/teacher/addTeacher"
          headingText="Teachers"
          bodyText="View and Manage teachers here"
          buttonText="Add New Teacher"
        />
        <TeacherTable data={teacherData}></TeacherTable>
      </Box>
      <Footer />
    </Flex>
  );
};

export default TeacherDashboard;
