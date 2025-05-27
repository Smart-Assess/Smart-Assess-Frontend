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
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateTeacherModal from "../../Components/Pages/UpdateTeacherModal";

const Dashboard = () => {
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();
  // const name = localStorage.getItem("name");

  const [named, setName] = useState("");
  const fetchTeacher = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://smartassess-backend-t3l93.ondigitalocean.app/teacher/profile",
        {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Error fetching teacher");
      const data = await response.json();
      setName(data?.teacher?.full_name || "");
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTeacher();
  }, []);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "https://smartassess-backend-t3l93.ondigitalocean.app/teacher/courses",
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
        `https://smartassess-backend-t3l93.ondigitalocean.app/teacher/course/${course_id}`,
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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            {/* Batch Dropdown */}
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {selectedBatch || "Select Batch"}
              </MenuButton>
              <MenuList>
                {Array.from(new Set(courses.map((course) => course.batch)))
                  .length === 0 ? (
                  <MenuItem isDisabled>No batches found</MenuItem>
                ) : (
                  Array.from(
                    new Set(courses.map((course) => course.batch))
                  ).map((batch) => (
                    <MenuItem
                      key={batch}
                      onClick={() => setSelectedBatch(batch)}
                    >
                      {batch}
                    </MenuItem>
                  ))
                )}
              </MenuList>
            </Menu>

            {/* Section Dropdown */}
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {selectedSection || "Select Section"}
              </MenuButton>
              <MenuList>
                {Array.from(new Set(courses.map((course) => course.section)))
                  .length === 0 ? (
                  <MenuItem isDisabled>No sections found</MenuItem>
                ) : (
                  Array.from(
                    new Set(courses.map((course) => course.section))
                  ).map((section) => (
                    <MenuItem
                      key={section}
                      onClick={() => setSelectedSection(section)}
                    >
                      {section}
                    </MenuItem>
                  ))
                )}
              </MenuList>
            </Menu>

            {/* Reset Filters Button */}
            <Button
              colorScheme="gray"
              variant="outline"
              onClick={() => {
                setSelectedBatch("");
                setSelectedSection("");
              }}
            >
              Reset Filters
            </Button>
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
              <Heading fontSize="2xl">Welcome Back {named}! 👋</Heading>
              <Text mt={1} color="gray.600">
                Track and Manage all your activities in one place
              </Text>
            </Box>
            <Box display="flex" gap={2}>
              <Button
                colorScheme="blue"
                onClick={() => nav("/teacher/addCourse")}
                alignSelf={{ base: "stretch", md: "auto" }}
              >
                Add New Course
              </Button>
              <Button
                colorScheme="blue"
                onClick={onOpen}
                alignSelf={{ base: "stretch", md: "auto" }}
              >
                Update Profile
              </Button>
            </Box>
            <UpdateTeacherModal fetchTeacher={fetchTeacher} isOpen={isOpen} onClose={onClose} />
          </Flex>

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
                    <Tr key={course.id}>
                      <Td>{course.name}</Td>
                      <Td>{course.group}</Td>
                      <Td>
                        <Flex>
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
                        </Flex>
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

          <Box height="80px" />
        </Box>
      </Flex>

      <Footer mt="auto" />
    </Flex>
  );
};

export default Dashboard;
