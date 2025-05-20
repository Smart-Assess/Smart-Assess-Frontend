import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, IconButton } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import ViewRequestTable from "../../Components/Pages/ViewRequestTable";
import { viewRequestData } from "./../../data/studentsData";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const ViewRequest = () => {
  const { courseId } = useParams();

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://134.209.110.162:8000/teacher/course/${courseId}/requests`,
        config
      );

      if (response.status === 200) {
        setCourses(response.data.requests);
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
      <Box flex="1" mx={{base:6,lg:12}} overflowY="auto" paddingBottom="80px">
        <Flex alignItems="center" justifyContent="space-between" my={6}>
          <Box>
            <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
              View Requests
            </Heading>
            <Text color="#546881">Add the required information below</Text>
          </Box>
        </Flex>
        <IconButton
          aria-label="Go Back"
          icon={<ArrowBackIcon />}
          onClick={() => nav(`/teacher/editCourse/${courseId}`)}
          mr={4}
          mb={4}
        />
        <ViewRequestTable
          courseId={courseId}
          courses={courses}
          data={viewRequestData}
          loading={loading}
        ></ViewRequestTable>
      </Box>

      <Footer />
    </Flex>
  );
};

export default ViewRequest;
