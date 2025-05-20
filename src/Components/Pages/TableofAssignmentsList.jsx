import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Badge,
  Button,
  Icon,
  IconButton,
  Spinner,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiCheckCircle } from "react-icons/fi";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const TableofAssignmentsList = ({
  assignments,
  courseId,
  loading,
  setAssignments,
}) => {
  const nav = useNavigate();

  const getBadgeColor = (deadline) => {
    const today = new Date();
    const dueDate = new Date(deadline);

    if (dueDate < today) return "red";
    const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 3) return "orange";
    return "green";
  };

  const toast = useToast();

  const [deleting, setDeleting] = useState({});

  const handleDelete = async (courseId, assignmentId) => {
    try {
      setDeleting((prev) => ({ ...prev, [assignmentId]: true }));

      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://134.209.110.162:8000/teacher/course/${courseId}/assignment/${assignmentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting assignment");
      }

      toast({
        title: "Assignment deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setAssignments((prev) => prev.filter((ass) => ass.id !== assignmentId));
    } catch (err) {
      console.error("Delete error:", err.message);
      toast({
        title: "Failed to delete assignment.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDeleting((prev) => ({ ...prev, [assignmentId]: false }));
    }
  };

  return (
    <TableContainer
      mb={12}
      height="100%"
      width={"100%"}
      border="1px solid #e0e0e0"
      boxShadow="lg"
      borderRadius="xl"
    >
      {loading ? (
        <Flex height="300px" justifyContent="center" alignItems="center">
          <Spinner size="lg" thickness="4px" speed="0.65s" color="blue.500" />
        </Flex>
      ) : (
        <>
          <Table variant="simple">
            <Thead backgroundColor={"#EAEEF0"}>
              <Tr>
                <Th>Name</Th>
                <Th>Due Date</Th>
                <Th>Description</Th>
                <Th>Score</Th>
                <Th></Th>
                <Th>ACTIONS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {assignments.map((assignment, index) => (
                <Tr key={index}>
                  <Td>{assignment.name}</Td>
                  <Td>
                    <Badge colorScheme={getBadgeColor(assignment.deadline)}>
                      {assignment.deadline}
                    </Badge>
                  </Td>
                  <Td>{assignment.description}</Td>
                  <Td>{assignment.grade}</Td>
                  <Td></Td>

                  <Td>
                    <Button
                      onClick={() =>
                        nav(
                          `/teacher/viewStudentsSubmissions/${courseId}/${assignment.id}`
                        )
                      }
                      variant="outline"
                      colorScheme="blue"
                      mr="4"
                      leftIcon={<Icon as={FiEye} />}
                    >
                      View Submissions
                    </Button>
                    <Button
                      isLoading={loading}
                      type="submit"
                      colorScheme="blue"
                      mr="4"
                      onClick={() =>
                        nav(
                          `/teacher/student/grading/${courseId}/${assignment.id}`
                        )
                      }
                      leftIcon={<Icon as={FiCheckCircle} />}
                    >
                      Grading
                    </Button>

                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      size="sm"
                      colorScheme="blue"
                      onClick={() =>
                        nav(
                          `/teacher/editAssignments/${courseId}/${assignment.id}`
                        )
                      }
                    />
                    <IconButton
                      aria-label="Delete"
                      ml={2}
                      icon={<DeleteIcon />}
                      size="sm"
                      isLoading={deleting[assignment.id] || false}
                      onClick={() => handleDelete(courseId, assignment.id)}
                      colorScheme="blue"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
    </TableContainer>
  );
};

export default TableofAssignmentsList;
