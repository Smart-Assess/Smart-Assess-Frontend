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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const TableofAssignmentsList = ({ assignments,courseId }) => {
  const nav = useNavigate();

  const getBadgeColor = (deadline) => {
    const today = new Date();
    const dueDate = new Date(deadline);

    if (dueDate < today) return "red"; // Overdue
    const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 3) return "orange"; // Urgent
    return "green"; // Safe
  };

  return (
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
            <Th>Due Date</Th>
            <Th>Description</Th>
            <Th>Score</Th>
            <Th></Th> {/* Updated Header */}
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
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() =>
                    nav(`/student/studentsEvaluation/${courseId}/${assignment.id}`)
                  }
                >
                  View Submissions
                </Button>
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
  );
};

export default TableofAssignmentsList;
