import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();
  const name = localStorage.getItem("name");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "http://127.0.0.1:8000/teacher/courses",
        config
      );

      if (response.status === 200) {
        setCourses(response.data.courses);
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

  const filteredCourses = courses.filter(
    (course) =>
      (selectedBatch === "" || course.batch === selectedBatch) &&
      (selectedSection === "" || course.section === selectedSection)
  );

  const handleDelete = async (course_id) => {
    try {
      setDeleting((prev) => ({ ...prev, [course_id]: true }));
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://127.0.0.1:8000/teacher/course/${course_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting course");
      }

      toast({
        title: "Course deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setCourses((prev) => prev.filter((course) => course.id !== course_id));
    } catch (err) {
      console.error("Delete error:", err.message);
      toast({
        title: "Failed to delete course.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDeleting((prev) => ({ ...prev, [course_id]: false })); // Reset only the clicked university
    }
  };

  return (
    <Flex direction="column" minH="100vh">
      <Header />

      <Flex
        flex="1"
        mx={{ base: 4, md: 8, lg: 12 }}
        my={6}
        direction={{ base: "column", lg: "row" }}
        gap={6}
      >
        {/* Sidebar Filters */}
        <Box
          w={{ base: "100%", lg: "20%" }}
          bg="white"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          boxShadow="md"
        >
          <VStack align="stretch" spacing={4}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {selectedBatch || "Select Batch"}
              </MenuButton>
              <MenuList>
                {Array.from(new Set(courses.map((course) => course.batch))).map(
                  (batch) => (
                    <MenuItem
                      key={batch}
                      onClick={() => setSelectedBatch(batch)}
                    >
                      {batch}
                    </MenuItem>
                  )
                )}
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {selectedSection || "Select Section"}
              </MenuButton>
              <MenuList>
                {Array.from(
                  new Set(courses.map((course) => course.section))
                ).map((section) => (
                  <MenuItem
                    key={section}
                    onClick={() => setSelectedSection(section)}
                  >
                    {section}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex="1">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            mb={6}
            gap={4}
          >
            <Box>
              <Heading fontSize="2xl">Welcome Back {name}! 👋</Heading>
              <Text mt={1} color="gray.600">
                Track and Manage all your activities in one place
              </Text>
            </Box>
            <Button
              colorScheme="blue"
              onClick={() => nav("/teacher/addCourse")}
              alignSelf={{ base: "stretch", md: "auto" }}
            >
              Add New Course
            </Button>
          </Flex>

          <Box mb={4}>
            <Input placeholder="Search" size="lg" />
          </Box>

          <Box
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            overflowX="auto"
            mb={4}
          >
            <Table variant="simple" cursor="pointer">
              <Thead bg="gray.100">
                <Tr>
                  <Th>Course Name</Th>
                  <Th>Department</Th>
                  <Th>ACTIONS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr>
                    <Td colSpan={2} textAlign="center">
                      <Spinner
                        size="lg"
                        thickness="4px"
                        speed="0.65s"
                        color="blue.500"
                      />
                    </Td>
                  </Tr>
                ) : filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <Tr
                      key={course.id}
                    >
                      <Td>{course.name}</Td>
                      <Td>{course.group}</Td>
                      <Td>
                        <IconButton
                          aria-label="Edit"
                          icon={<EditIcon />}
                          size="sm"
                          colorScheme="blue"
                          onClick={() =>
                            nav(`/teacher/editCourse/${course.id}`)
                          }
                        />
                        <IconButton
                          aria-label="Delete"
                          ml={2}
                          icon={<DeleteIcon />}
                          size="sm"
                          isLoading={deleting[course.id] || false}
                          onClick={() => handleDelete(course.id)}
                          colorScheme="blue"
                        />
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={2} textAlign="center">
                      No courses found.
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>

          {/* Pagination Buttons (Always Visible) */}
          <Flex
            py={2}
            pb={6}
            justifyContent={{ base: "center", md: "space-between" }}
            gap={4}
          >
            <Button onClick={() => alert("Previous Page")}>Previous</Button>
            <Button onClick={() => alert("Next Page")}>Next</Button>
          </Flex>
          <Box height="80px" />
        </Box>
      </Flex>

      <Footer mt="auto" />
    </Flex>
  );
};

export default Dashboard;
