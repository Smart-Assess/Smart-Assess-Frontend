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
  Spinner,
  Center,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const AdminTable = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState({});

  const nav = useNavigate();
  const toast = useToast();

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://smartassess-backend-t3l93.ondigitalocean.app/superadmin/universities",
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
      setUniversities(data.universities || []);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleDelete = async (uni_id) => {
    try {
      setDeleting((prev) => ({ ...prev, [uni_id]: true }));
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://smartassess-backend-t3l93.ondigitalocean.app/superadmin/university/${uni_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting university");
      }

      toast({
        title: "University deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setUniversities((prev) => prev.filter((uni) => uni.id !== uni_id));
    } catch (err) {
      console.error("Delete error:", err.message);
      toast({
        title: "Failed to delete university.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDeleting((prev) => ({ ...prev, [uni_id]: false })); // Reset only the clicked university
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
              <Th>ID</Th>
              <Th>University Name</Th>
              <Th>No. of Students</Th>
              <Th>No. of Teachers</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {universities.map((uni) => (
              <Tr key={uni.uni_id}>
                <Td>{uni.uni_id}</Td>
                <Td>{uni.name.charAt(0).toUpperCase() + uni.name.slice(1)}</Td>
                <Td>{uni.students_count}</Td>
                <Td>{uni.teachers_count}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    onClick={() => nav(`/superadmin/editUniversity/${uni.id}`)}
                  />
                  <IconButton
                    aria-label="Delete"
                    ml={2}
                    icon={<DeleteIcon />}
                    size="sm"
                    isLoading={deleting[uni.id] || false}
                    onClick={() => handleDelete(uni.id)}
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

export default AdminTable;
