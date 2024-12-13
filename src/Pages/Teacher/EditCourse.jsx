import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import AddCourseForm from "../../Components/Pages/AddCourseForm";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
  const { courseId } = useParams();

  const [loading, setLoading] = useState(false);

  const [courses, setCourses] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://127.0.0.1:8000/teacher/course/${courseId}`,
        config
      );

      if (response.status === 200) {
        setCourses(response.data.course);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <AddCourseForm  showUpload={true}></AddCourseForm>
      </Box>
      <Footer />
    </Flex>
  );
};

export default EditCourse;
