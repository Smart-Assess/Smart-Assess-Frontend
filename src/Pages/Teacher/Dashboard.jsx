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
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

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

  return (
    <Flex direction="column" height="100vh">
      <Header />

      <Flex flex="1" mx={12} my={6}>
        <Box
          h="fit-content"
          w="20%"
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

        <Box flex="1" ml={8}>
          <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Heading fontSize="2xl">Welcome Back Oliver! 👋</Heading>
              <Text mt={1} color="gray.600">
                Track and Manage all your activities in one place
              </Text>
            </Box>
            <Button
              colorScheme="blue"
              onClick={() => nav("/teacher/addCourse")}
            >
              + Add New Course
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
            <Table variant="simple" cursor={"pointer"}>
              <Thead bg="gray.100">
                <Tr>
                  <Th>Subject Name</Th>
                  <Th>Department</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredCourses?.map((course) => (
                  <Tr
                    key={course.id}
                    onClick={() => nav(`/teacher/editCourse/${course.id}`)}
                  >
                    <Td>{course.name}</Td>
                    <Td>{course.group}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Flex py={2} pb={6} justifyContent={"space-between"}>
            <Button mt={4} onClick={() => alert("Previous Page")} mr={2}>
              Previous
            </Button>
            <Button mt={4} onClick={() => alert("Next Page")}>
              Next
            </Button>
          </Flex>
        </Box>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default Dashboard;
