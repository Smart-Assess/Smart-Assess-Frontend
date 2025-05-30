import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Spinner,
  Text,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import JoinCourseModal from "../../Components/Pages/JoinCourseModal";
import Math from "./../../assets/images/Math.png";
import Arrow from "./../../assets/images/Arrow.png";
import { useNavigate } from "react-router-dom";

const StudentsDashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const name = localStorage.getItem("name");

  const handleOpenModal = () => {
    setCourseCode("");
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        };

        const response = await fetch("https://smartassess-backend-t3l93.ondigitalocean.app/student/courses", {
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

  const nav = useNavigate();

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box
        flex="1"
        mx={{ base: 4, md: 8, lg: 12 }}
        overflowY="auto"
        paddingBottom="80px"
        marginTop="40px"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={4}
          mb={4}
        >
          <Heading fontSize={{ base: "xl", md: "2xl" }}>
            Welcome Back {name}{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </Heading>
          <Button colorScheme="blue" onClick={handleOpenModal}>
            Join Course
          </Button>
        </Flex>

        <Box mt={8}>
          {loading ? (
            <Flex justifyContent="center" alignItems="center" minHeight="50vh">
              <Spinner size="xl" color="blue.500" />
            </Flex>
          ) : error ? (
            <Text color="red.500" fontSize="lg">
              {error}
            </Text>
          ) : courses.length > 0 ? (
            <Grid
              templateColumns={{
                base: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={8}
              mb={8}
            >
              {courses.map((course) => (
                <GridItem
                  key={course.id}
                  p={6}
                  minWidth="auto"
                  minHeight="170px"
                  bg="blue.50"
                  borderRadius="15px"
                  boxShadow="lg"
                  cursor="pointer"
                  position="relative"
                  onClick={() => nav(`/student/courseMaterial/${course.id}`)}
                >
                  <Flex justify="space-between" alignItems="center">
                    <Image
                      src={course.icon || Math}
                      padding={1}
                      bg="white"
                      borderRadius="full"
                      boxSize={{ base: "10", md: "14" }}
                      alt={`${course.name} icon`}
                    />
                    <Image
                      src={Arrow}
                      padding={1}
                      bg="white"
                      borderRadius="full"
                      boxSize={{ base: "10", md: "14" }}
                      alt="Forward Arrow"
                    />
                  </Flex>

                  <Text
                    marginLeft={4}
                    fontSize={{ base: "md", md: "20px" }}
                    fontWeight="bold"
                    position="absolute"
                    bottom={4}
                    left={4}
                  >
                    {course.name}
                  </Text>
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
