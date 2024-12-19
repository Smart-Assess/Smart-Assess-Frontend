import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Spinner,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";

const CourseMaterial = () => {
  const { course_id } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!course_id) {
          throw new Error("Invalid Course ID.");
        }

        const response = await fetch(
          `http://127.0.0.1:8000/student/course/${course_id}/materials`,
          {
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.success) {
          const materialsArray = JSON.parse(data.course_materials);
          setMaterials(materialsArray || []);
        } else {
          throw new Error("Failed to fetch materials.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch materials.");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [course_id]);

  const getFileNameFromURL = (url) => {
    const urlObj = new URL(url);
    const fileName = urlObj.pathname.split("/").pop();
    return decodeURIComponent(fileName);
  };

  const nav = useNavigate();
  return (
    <Flex direction="column" minH="100vh">
      <Header />

      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <HeadingButtonSection
              path="Course Materials"
              content="Uploaded Course Materials"
              showButton={false}
            />
          </Box>
          <Box mt={6}>
            <Button
              colorScheme="blue"
              onClick={() => nav(`/student/allAssignments/${course_id}`)}
            >
              Assignments
            </Button>
          </Box>
        </Flex>

        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mt={4}>
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>Material Title</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <Tr>
                  <Td colSpan="1" textAlign="center">
                    <Spinner size="lg" color="blue.500" />
                  </Td>
                </Tr>
              ) : error ? (
                <Tr>
                  <Td colSpan="1" textAlign="center" color="red.500">
                    {error}
                  </Td>
                </Tr>
              ) : materials.length === 0 ? (
                <Tr>
                  <Td colSpan="1" textAlign="center">
                    No materials available.
                  </Td>
                </Tr>
              ) : (
                materials.map((material, index) => {
                  const materialName = getFileNameFromURL(material);
                  return (
                    <Tr key={index}>
                      <Td>
                        <Link
                          href={material}
                          download
                          color="teal.500"
                          fontWeight="medium"
                          target="_blank"
                        >
                          {materialName}
                        </Link>
                      </Td>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>

      <Footer />
    </Flex>
  );
};

export default CourseMaterial;
