import React from "react";
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
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {  FiEye, FiCheckCircle } from "react-icons/fi";

const TableofAssignmentsList = ({ assignments, courseId, loading }) => {
  const nav = useNavigate();

  const getBadgeColor = (deadline) => {
    const today = new Date();
    const dueDate = new Date(deadline);

    if (dueDate < today) return "red";
    const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 3) return "orange"; // Urgent
    return "green"; // Safe
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
                  <Td>
                    <Box display="flex" justifyContent="flex-end" mt="6" pr="4">
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
                        onClick={() =>
                          nav(
                            `/teacher/student/grading/${courseId}/${assignment.id}`
                          )
                        }
                        leftIcon={<Icon as={FiCheckCircle} />}
                      >
                        Grading
                      </Button>
                    </Box>
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
        </>
      )}
    </TableContainer>
  );
};

export default TableofAssignmentsList;
