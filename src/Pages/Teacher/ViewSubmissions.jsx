import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";

const ViewSubmissions = () => {
  const { courseId, assignmentId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `https://smartassess-backend-t3l93.ondigitalocean.app/teacher/course/${courseId}/assignment/${assignmentId}/submissions`,
        config
      );

      if (response.status === 200) {
        setAssignments(response.data.submissions);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const nav = useNavigate();

  const [deleting, setDeleting] = useState({});
  const toast = useToast();

  const handleDelete = async (submission_id) => {
    try {
      setDeleting((prev) => ({ ...prev, [submission_id]: true }));
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://smartassess-backend-t3l93.ondigitalocean.app/teacher/course/${courseId}/assignment/${assignmentId}/submission/${submission_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting university");
      }

      toast({
        title: "University deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setAssignments((prev) =>
        prev.filter((uni) => uni.submission_id !== submission_id)
      );
    } catch (err) {
      console.error("Delete error:", err.message);
      toast({
        title: "Failed to delete university.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDeleting((prev) => ({ ...prev, [submission_id]: false })); // Reset only the clicked university
    }
  };

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box
        flex="1"
        mx={{ base: 6, lg: 12 }}
        overflowY="auto"
        paddingBottom="80px"
      >
        <HeadingButtonSection
          path="Submissions"
          content="Submissions"
          showButton={false}
          showBulkAddButton={false}
        />
        <IconButton
          aria-label="Go Back"
          icon={<ArrowBackIcon />}
          onClick={() => nav(`/teacher/viewAssignments/${courseId}`)}
          mr={4}
          mb={4}
        />

        {loading ? (
          <Flex height="300px" justifyContent="center" alignItems="center">
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
          </Flex>
        ) : assignments.length === 0 ? (
          <Flex justifyContent="center" alignItems="center" height="300px">
            <Text fontSize="lg" color="gray.500">
              No Data Found
            </Text>
          </Flex>
        ) : (
          <TableContainer
            mb={12}
            height="100%"
            border="1px solid #e0e0e0"
            boxShadow="lg"
            borderRadius="xl"
            bg="white"
          >
            <Table variant="simple">
              <Thead backgroundColor={"#EAEEF0"}>
                <Tr>
                  <Th>Name</Th>
                  <Th>Department</Th>
                  <Th>Section</Th>
                  <Th>Batch</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {assignments.map((assignment, index) => (
                  <Tr key={index}>
                    <Td>{assignment.student.name}</Td>
                    <Td>{assignment.student.department}</Td>
                    <Td>{assignment.student.section}</Td>
                    <Td>{assignment.student.batch}</Td>
                    <Td>
                      {assignment.pdf_url ? (
                        <Button
                          as="a"
                          href={assignment.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          colorScheme="blue"
                          size="sm"
                        >
                          View PDF
                        </Button>
                      ) : null}
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="Delete"
                        ml={2}
                        icon={<DeleteIcon />}
                        size="sm"
                        isLoading={deleting[assignment.submission_id] || false}
                        onClick={() => handleDelete(assignment.submission_id)}
                        colorScheme="blue"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Flex px={6} py={2} pb={6} justifyContent={"space-between"}>
              <Button mt={4} onClick={() => alert("Previous Page")} mr={2}>
                Previous
              </Button>
              <Button mt={4} onClick={() => alert("Next Page")}>
                Next
              </Button>
            </Flex>
          </TableContainer>
        )}
      </Box>
      <Footer />
    </Flex>
  );
};

export default ViewSubmissions;
