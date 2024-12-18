import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Button, Spinner, Text, Grid, GridItem, Image } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import JoinCourseModal from "../../Components/Pages/JoinCourseModal";
import Math from "./../../assets/images/Math.png"; // Use your actual icons for courses
import Eng from "./../../assets/images/Eng.png"; // Use your actual icons for courses
import Arrow from "./../../assets/images/Arrow.png"; // Optional arrow icon

const StudentsDashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleOpenModal = () => {
    setCourseCode("");
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  // Fetch enrolled courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

        // Set up headers with Authorization token if it exists
        const headers = {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Add Bearer token if available
        };

        const response = await fetch("http://127.0.0.1:8000/student/courses", {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
          setCourses(data.courses);
        } else {
          throw new Error("Failed to fetch courses.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Flex direction="column" minH="100vh">
      <Header role={"student"} />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px" marginTop="40px">
        <Flex justifyContent={"space-between"}>
          <Heading fontSize="2xl" mb={4}>
            Welcome Back, Ahsan{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </Heading>
          <Button colorScheme="blue" onClick={handleOpenModal}>
            Join Course
          </Button>
        </Flex>

        {/* Courses Section */}
        <Box mt={8}>
          {loading ? (
            <Spinner size="xl" color="blue.500" />
          ) : error ? (
            <Text color="red.500" fontSize="lg">
              {error}
            </Text>
          ) : courses.length > 0 ? (
            <Grid templateColumns="repeat(3, 1fr)" gap={8} mb={8}>
              {courses.map((course) => (
                <GridItem
                  key={course.id}
                  p={6}
                  minWidth="300px"
                  minHeight="170px"  // Increased height for additional fields
                  bg="blue.50"
                  borderRadius="15px"
                  boxShadow="lg"
                  cursor="pointer"
                  position="relative"
                  onClick={() => window.location.href = `/student/courseMaterial/${course.id}`}
  // Adjust navigation if necessary
                >
                  <Flex justify="space-between">
                    {/* Left Image at Top */}
                    <Image
                      src={course.icon || Math}  // Replace with dynamic icon logic (course.icon, etc.)
                      padding={1}
                      bg="white"
                      borderRadius="full"
                      boxSize={14}
                      alt={`${course.name} icon`}
                    />
                    {/* Right Arrow Icon */}
                    <Image
                      src={Arrow}
                      padding={1}
                      bg="white"
                      borderRadius="full"
                      boxSize={14}
                      alt="Forward Arrow"
                    />
                  </Flex>

                  {/* Course Name at Bottom Left */}
                  <Text
                    marginLeft={4}
                    fontSize="20px"
                    fontWeight="bold"
                    position="absolute"
                    bottom={4}
                    left={4}
                  >
                    {course.name}
                  </Text>

                  {/* Department and Batch */}
                  {/* <Box
                    position="absolute"
                    bottom={4}
                    right={4}
                    textAlign="right"
                  >
                    <Text fontSize="sm" color="gray.600">
                      Department: {course.department}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Batch: {course.batch}
                    </Text>
                  </Box> */}
                </GridItem>
              ))}
            </Grid>
          ) : (
            <Text fontSize="lg" color="gray.500">
              No courses found.
            </Text>
          )}
        </Box>
      </Box>
      <Footer />

      <JoinCourseModal
        courseCode={courseCode}
        setCourseCode={setCourseCode}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Flex>
  );
};

export default StudentsDashboard;
