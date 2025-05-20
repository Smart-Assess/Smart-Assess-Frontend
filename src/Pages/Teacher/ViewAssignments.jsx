import React, { useEffect, useState } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import TableofAssignmentsList from "../../Components/Pages/TableofAssignmentsList";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

import axios from "axios";

const ViewAssignments = () => {
  const { courseId } = useParams();

  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://134.209.110.162:8000/teacher/course/${courseId}/assignments`,
        config
      );

      if (response.status === 200) {
        setAssignments(response.data.assignments);
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

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <HeadingButtonSection
          path="Assignments"
          content="Marketing"
          showButton={false}
          showBulkAddButton={false}

        />

        <IconButton
          aria-label="Go Back"
          icon={<ArrowBackIcon />}
          onClick={() => nav(`/teacher/editCourse/${courseId}`)}
          mr={4}
          mb={4}
        />

        <TableofAssignmentsList
          loading={loading}
          courseId={courseId}
          assignments={assignments}
          setAssignments={setAssignments}
        />
      </Box>
      <Footer />
    </Flex>
  );
};

export default ViewAssignments;
