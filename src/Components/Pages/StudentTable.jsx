import React, { useEffect, useState } from "react";
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
  useToast,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const StudentTable = ({ data }) => {
  const nav = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [deleting, setDeleting] = useState({});

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://127.0.0.1:8000/universityadmin/students",
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
      setStudents(data.students || []);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (std_id) => {
    try {
      setDeleting((prev) => ({ ...prev, [std_id]: true }));
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://127.0.0.1:8000/universityadmin/student/${std_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting Student");
      }

      toast({
        title: "Student deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setStudents((prev) => prev.filter((std) => std.student_id !== std_id));
    } catch (err) {
      console.error("Delete error:", err.message);
      toast({
        title: "Failed to delete student.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDeleting((prev) => ({ ...prev, [std_id]: false }));
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
      {loading ? (
        <Center py={10}>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : (
        <Table variant="simple">
          <Thead backgroundColor={"#EAEEF0"}>
            <Tr>
              <Th>STUDENT NAME</Th>
              <Th>SUTDENT ID</Th>
              <Th>Email</Th>
              <Th>DEPARTMENT</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {students?.map((std, index) => (
              <Tr key={index}>
                <Td display="flex" alignItems="center">
                  <Avatar src={std.image_url} size="sm" mr={3} />
                  {std.full_name}
                </Td>
                <Td>{std.student_id}</Td>
                <Td>{std.email}</Td>
                <Td>{std.department}</Td>

                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    onClick={() =>
                      nav(`/university/student/edit/${std.student_id}`)
                    }
                  />
                  <IconButton
                    aria-label="Delete"
                    ml={2}
                    icon={<DeleteIcon />}
                    size="sm"
                    isLoading={deleting[std.student_id] || false}
                    onClick={() => handleDelete(std.student_id)}
                    colorScheme="blue"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
     
    </TableContainer>
  );
};

export default StudentTable;
