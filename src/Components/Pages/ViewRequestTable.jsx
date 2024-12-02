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
  Tooltip,
  Avatar,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const ViewRequestTable = ({ data, onApprove, onReject }) => {
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
                {uni.studentName}
              </Td>
              <Td>{uni.studentID}</Td>
              <Td>{uni.batch}</Td>
              <Td>{uni.department}</Td>
              <Td>{uni.section}</Td>
              <Td>
                <Flex gap={3}>
                  <Tooltip label="Approve" aria-label="Approve">
                    <CheckIcon
                      color="green.500"
                      boxSize={'6'}
                      cursor="pointer"
                      onClick={() => onApprove(uni.studentID)}
                    />
                  </Tooltip>
                  <Tooltip label="Reject" aria-label="Reject">
                    <CloseIcon
                    mt="4px"
                      color="red.500"
                      cursor="pointer"
                      onClick={() => onReject(uni.studentID)}
                    />
                  </Tooltip>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ViewRequestTable;
