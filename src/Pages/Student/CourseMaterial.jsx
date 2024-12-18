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
import { useParams } from "react-router-dom";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";

const CourseMaterial = () => {
  const { course_id } = useParams(); // Get course_id from URL
  const [materials, setMaterials] = useState([]); // State to store course materials
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // Ensure course_id exists
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
          // Parse the stringified array to an actual array
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

  // Function to extract and decode the file name from the URL
  const getFileNameFromURL = (url) => {
    const urlObj = new URL(url); // Create a URL object from the string
    const fileName = urlObj.pathname.split('/').pop(); // Get the file name from the URL
    return decodeURIComponent(fileName); // Decode URL-encoded characters like %20 to space
  };

  return (
    <Flex direction="column" minH="100vh">
      {/* Header */}
      <Header role={"student"} />

      {/* Content */}
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px" marginTop="40px">
        {/* Page Heading */}
        <HeadingButtonSection
          path="Course Materials"
          content="Uploaded Course Materials"
          showButton={false}
        />
        {/* Assignment Button */}
        <Flex justifyContent={"space-between"} mb={4}>
          <Button
            colorScheme="blue"
            onClick={() => window.location.href = `/student/allAssignments/${course_id}`} // Use course_id here
          >
            Assignments
          </Button>
        </Flex>

        {/* Loading/Error State */}
        {loading ? (
          <Spinner size="xl" color="blue.500" />
        ) : error ? (
          <Text color="red.500" fontSize="lg">
            {error}
          </Text>
        ) : materials.length === 0 ? (
          <Text fontSize="lg" color="gray.500">
            No course materials available.
          </Text>
        ) : (
          /* Table with Materials */
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mt={4}>
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th>Material Title</Th>
                </Tr>
              </Thead>
              <Tbody>
                {materials.map((material, index) => {
                  const materialName = getFileNameFromURL(material);
                  return (
                    <Tr key={index}>
                      <Td>
                        <Link
                          href={material} // material is the URL for PDF
                          download
                          color="teal.500"
                          fontWeight="medium"
                          target="_blank"
                        >
                          {materialName} {/* Display the decoded file name */}
                        </Link>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default CourseMaterial;
