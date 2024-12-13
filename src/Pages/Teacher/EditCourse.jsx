import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import AddCourseForm from "../../Components/Pages/AddCourseForm";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditCourseForm from "../../Components/Pages/EditCourseForm";

const EditCourse = () => {
  const { courseId } = useParams();

  


  const nav = useNavigate();
  return (
    <Flex direction="column">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <Flex alignItems="center" justifyContent="space-between" my={6}>
          <Box>
            <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
              Edit Course
            </Heading>
            <Text color="#546881">Add the required information below</Text>
          </Box>
          <Box d="flex">
            <Button
              mr={3}
              colorScheme="blue"
              onClick={() => nav("/teacher/viewRequest")}
            >
              View Request
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => nav("/teacher/createAssignment")}
            >
              Create Assignment
            </Button>
          </Box>
        </Flex>
        
        <EditCourseForm courseId={courseId} showUpload={true}></EditCourseForm>
      </Box>
      <Footer />
    </Flex>
  );
};

export default EditCourse;
