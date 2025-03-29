import React, { useState, useEffect } from "react";
import { Box, Flex, Grid, Image, Text, Spinner, Badge } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import { useNavigate, useParams } from "react-router-dom";
import Math from "./../../assets/images/Math.png"; // Placeholder image

const AllAssignments = () => {
  const [assignments, setAssignments] = useState([]); // State to store assignments
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const { course_id } = useParams(); // Get course_id from URL
  const nav = useNavigate();


  console.log(assignments)
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!course_id) {
          throw new Error("Invalid Course ID.");
        }

        const response = await fetch(
          `http://127.0.0.1:8000/student/course/${course_id}/assignments`,
          {
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.success) {
          setAssignments(data.assignments || []);
        } else {
          throw new Error("Failed to fetch assignments.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch assignments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [course_id]);

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <HeadingButtonSection
          path="Assignments"
          content="View Assignments"
          showButton={false}
          showSearchBar={false}
        />

        {loading ? (
          <Flex justify="center" align="center" height="100%">
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : error ? (
          <Text color="red.500" fontSize="lg">
            {error}
          </Text>
        ) : assignments.length === 0 ? (
          <Text fontSize="lg" color="gray.500">
            No assignments available.
          </Text>
        ) : (
          <Grid py={4} gap={4}>
            {assignments.map((assignment) => (
              <Flex
                cursor={"pointer"}
                onClick={() =>
                  nav(`/student/uploadAssignment/${assignment.id}`)
                } // Redirect to assignment submission page
                key={assignment.id}
                gap={4}
                align="start"
                border="1px solid "
                borderColor="gray.300"
                borderRadius="md"
                p={4}
                shadow="sm"
              >
                <Box>
                  <Image src={Math} alt="Assignment Image" />
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize="lg">
                    {assignment.name}
                  </Text>
                  <Badge colorScheme="blue" mt={2}>
                    Due: {assignment.deadline}
                  </Badge>

                  <Text>Grade: {assignment.grade}</Text>
                  {assignment.submission && assignment.submission.pdf_url && (
                    <Text color="blue.500" fontSize="sm">
                      <a
                        href={assignment.submission.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Submission
                      </a>
                    </Text>
                  )}
                </Box>
              </Flex>
            ))}
          </Grid>
        )}
      </Box>
      <Footer />
    </Flex>
  );
};

export default AllAssignments;
