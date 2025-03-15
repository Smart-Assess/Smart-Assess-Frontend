import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Spinner,
  TableContainer,
  Flex,
  IconButton,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const TeacherTable = ({ data }) => {
  const nav = useNavigate();
  const [teachers, setTeachers] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://127.0.0.1:8000/universityadmin/teachers",
        {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching universities");
      }

      const data = await response.json();
      setTeachers(data.teachers || []);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <TableContainer
      mb={12}
      height="100%"
      border="1px solid #e0e0e0"
      boxShadow="lg"
      borderRadius="xl"
      bg="white"
    >
      {loading ? (
        <Center py={10}>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : (
        <Table variant="simple">
          <Thead backgroundColor={"#EAEEF0"}>
            <Tr>
              <Th>Teacher Name </Th>
              <Th> Teacher ID </Th>
              <Th>EMAIL</Th>
              <Th> DEPARTMENT</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {teachers.map((uni, index) => (
              <Tr key={index}>
                <Td display="flex" alignItems="center">
                  <Avatar src={uni.image_url} size="sm" mr={3} />
                  {uni.full_name}
                </Td>
                <Td>{uni.teacher_id}</Td>

                <Td>{uni.email}</Td>

                <Td>{uni.department}</Td>

                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    onClick={() => nav("/university/teacher/editTeacher")}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
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

export default TeacherTable;
