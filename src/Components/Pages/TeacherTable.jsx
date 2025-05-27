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
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const TeacherTable = ({ data }) => {
  const nav = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [deleting, setDeleting] = useState({});

  console.log("Teachers Data:", data);
  const [loading, setLoading] = useState(true);

  const toast = useToast();
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://smartassess-backend-t3l93.ondigitalocean.app/universityadmin/teachers",
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

  const handleDelete = async (tch_id) => {
    try {
      setDeleting((prev) => ({ ...prev, [tch_id]: true }));
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://smartassess-backend-t3l93.ondigitalocean.app/universityadmin/teacher/${tch_id}`,
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

      setTeachers((prev) => prev.filter((std) => std.teacher_id !== tch_id));
    } catch (err) {
      console.error("Delete error:", err.message);
      toast({
        title: "Failed to delete student.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDeleting((prev) => ({ ...prev, [tch_id]: false }));
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
              <Th>Teacher Name </Th>
              <Th>Teacher ID</Th>
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
                    onClick={() =>
                      nav(`/university/teacher/edit/${uni.teacher_id}`)
                    }
                  />

                  <IconButton
                    aria-label="Delete"
                    ml={2}
                    icon={<DeleteIcon />}
                    size="sm"
                    isLoading={deleting[uni.teacher_id] || false}
                    onClick={() => handleDelete(uni.teacher_id)}
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

export default TeacherTable;
