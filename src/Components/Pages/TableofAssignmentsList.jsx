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

import { assignmentsList } from "./../../data/AssignmentsListData.js";

const TableofAssignmentsList = () => {
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
            <Th>Assignment</Th>
            <Th>Due Date</Th>
            <Th>Status</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {assignmentsList.map((assignment, index) => (
            <Tr key={index}>
              <Td>{assignment.assignment}</Td>
              <Td>{assignment.dueDate}</Td>
              <Td>
                <Badge
                  borderRadius={"lg"}
                  color={assignment.status.includes("Submitted") ? "green" : "red"}
                  bg={assignment.status.includes("Submitted") ? "#ECFDF3" : "#F2F4F7"}
                >
                  {assignment.status}
                </Badge>
              </Td>
              <Td>{assignment.score}</Td>
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
