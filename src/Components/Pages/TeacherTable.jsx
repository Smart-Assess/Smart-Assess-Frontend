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
  IconButton,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const StudentTable = ({ data }) => {
  const nav = useNavigate();
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
            {data?.headers?.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.data?.map((uni, index) => (
            <Tr key={index}>
              <Td display="flex" alignItems="center">
                <Avatar src={uni.image} size="sm" mr={3} />
                {uni.teacherName}
              </Td>
              <Td>{uni.teacherId}</Td>
              <Td>{uni.department}</Td>


              <Td>
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  colorScheme="blue"
                  onClick={() => nav("/university/editStudent")}
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
  );
};

export default StudentTable;
