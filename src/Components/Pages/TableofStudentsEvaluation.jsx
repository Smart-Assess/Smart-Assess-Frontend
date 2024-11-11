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
  Button
} from "@chakra-ui/react";
import {evaluationList} from "./../../data/EvaluationListData"

const TableofStudentsEvaluationList = () => {
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
            <Th>Question</Th>
            <Th>Answer</Th>
            <Th>Feedback</Th>
            <Th>Result</Th>
          </Tr>
        </Thead>
        <Tbody>
          {evaluationList.map((evaluation, index) => (
            <Tr key={index}>
              <Td>{evaluation.question}</Td>
              <Td>{evaluation.answer}</Td>
              <Td>{evaluation.feedback}</Td>
              <Td>{evaluation.result}</Td>
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

export default TableofStudentsEvaluationList;
