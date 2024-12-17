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
  Spinner,
  Box,
  Text,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewRequestTable = ({ data, courses, courseId, loading }) => {
  const navigate = useNavigate();

  const handleSubmit = async (requestId, status) => {
    try {
      const token = localStorage.getItem("accessToken");

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",

          Authorization: `Bearer ${token}`,
        },
      };

      const payload = {
        status,
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/teacher/course/${courseId}/request/${requestId}`,
        payload,
        config
      );

      if (response.status === 200) {
        navigate(`/teacher/viewRequest/${courseId}`);
        window.location.reload();
      }
    } catch (err) {
      console.error("Error updating request:", err);
    }
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
            {data?.headers?.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={data.headers.length} textAlign="center">
                <Spinner
                  size="xl"
                  thickness="4px"
                  speed="0.65s"
                  color="blue.500"
                />
              </Td>
            </Tr>
          ) : courses.length === 0 ? (
            <Tr>
              <Td colSpan={data.headers.length} textAlign="center">
                <Box p={5}>
                  <Text fontSize="xl" color="gray.500">
                    No Data Found
                  </Text>
                </Box>
              </Td>
            </Tr>
          ) : (
            courses.map((uni, index) => (
              <Tr key={index}>
                <Td display="flex" alignItems="center">
                  <Avatar src={uni.image} size="sm" mr={3} />
                  {uni?.student?.name}
                </Td>
                <Td>{uni?.student?.id}</Td>
                <Td>{uni?.student?.batch}</Td>
                <Td>{uni?.student?.department}</Td>
                <Td>{uni?.student?.section}</Td>
                <Td>
                  <Flex gap={3}>
                    <Tooltip label="Approve" aria-label="Approve">
                      <CheckIcon
                        color="green.500"
                        boxSize={"6"}
                        cursor="pointer"
                        onClick={() =>
                          handleSubmit(uni?.request_id, "accepted")
                        }
                      />
                    </Tooltip>
                    <Tooltip label="Reject" aria-label="Reject">
                      <CloseIcon
                        mt="4px"
                        color="red.500"
                        cursor="pointer"
                        onClick={() =>
                          handleSubmit(uni?.request_id, "rejected")
                        }
                      />
                    </Tooltip>
                  </Flex>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ViewRequestTable;
