import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  Heading,
  Input,
  Spinner,
  Link,
  Badge,
} from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import { useNavigate, useParams } from "react-router-dom";

const UploadAssignments = () => {
  const [files, setFiles] = useState([]);
  const [assignment, setAssignment] = useState(null); // Assignment details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const fileInputRef = useRef(null);
  const { assignment_id } = useParams(); // Get assignment_id from URL
  const [postLoading, setPostLoading] = useState(false);

  const extractFileName = (url) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 1];
  };

  const nav = useNavigate();

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `http://127.0.0.1:8000/student/assignment/${assignment_id}`,
          {
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching assignment details: ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data.success) {
          setAssignment(data.assignment);
        } else {
          throw new Error("Failed to fetch assignment details.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch assignment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentDetails();
  }, [assignment_id]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmitAssignment = async () => {
    if (files.length === 0) {
      setError("Please select a file to submit.");
      return;
    }

    const formData = new FormData();
    formData.append("submission_pdf", files[0]);

    try {
      setPostLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://127.0.0.1:8000/student/assignment/${assignment_id}/submit`,
        {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        throw new Error(errorData.detail || "Failed to submit assignment.");
      }

      const data = await response.json();
      setAssignment((prev) => ({
        ...prev,
        submission: data.submission,
        grade: data.submission.grade,
      }));

      setPostLoading(false);
      setFiles([]);
      setError("");
    } catch (err) {
      console.error("Submission error:", err);
      setError(
        err.message || "An error occurred while submitting the assignment."
      );
      setPostLoading(false);
    }
  };

  if (loading)
    return (
      <Flex minH="100vh" justifyContent="center" alignItems="center" bg="white">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <Flex alignItems={"center"} mt={6} justifyContent={"space-between"}>
          <Box>
            <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
              {assignment?.name}
            </Heading>
            <Badge bg="blue.500" color="white" mt={2}>
              Due {new Date(assignment?.deadline).toLocaleString()}
            </Badge>
          </Box>
          <Box display="flex" gap={4} alignItems={"center"}>
            <Box>
              <Text fontSize={"lg"}>Points</Text>
              {assignment?.submission?.status === "submitted" ? (
                <Text color="#546881">{assignment.grade}</Text>
              ) : (
                <Text color="#546881">Not Graded Yet</Text>
              )}
            </Box>
            <Box>
              {assignment?.submission?.status === "submitted" ? (
                <Button colorScheme="blue">Handed In</Button>
              ) : (
                <Button
                  border="1px solid"
                  borderColor="blue.500"
                  isLoading={postLoading}
                  colorScheme="white"
                  onClick={handleSubmitAssignment}
                >
                  Hands In
                </Button>
              )}
            </Box>

            <Box>
              <Button
                colorScheme="blue"
                onClick={() => nav(`/student/results/${assignment_id}`)}
                >
                Results
              </Button>
            </Box>
          </Box>
        </Flex>
        <Box>
          {assignment?.submission?.status === "submitted" ? (
            <Badge bg="blue.500" color="white" mt={2}>
              Submitted at{" "}
              {new Date(assignment.submission.submitted_at).toLocaleString()}
            </Badge>
          ) : null}
        </Box>

        <Box mt={6}>
          <Flex direction="column" alignItems="flex-start">
            <Box>
              <Text mb={2} fontSize="lg">
                {assignment?.description}
              </Text>
              {assignment?.question_pdf_url && (
                <Box
                  border="1px solid"
                  borderColor="blue.500"
                  borderRadius="8px"
                  mb={4}
                  p={4}
                >
                  <Text as="span" fontWeight="normal" color="blue.500">
                    <Link
                      href={assignment.question_pdf_url}
                      download={extractFileName(assignment.question_pdf_url)}
                      color="blue.500"
                      fontSize="md"
                      fontWeight="bold"
                    >
                      {extractFileName(assignment.question_pdf_url)}
                    </Link>
                  </Text>
                </Box>
              )}
            </Box>

            <Text mb={2} fontSize="lg">
              My work:
            </Text>

            <Button colorScheme="blue" onClick={triggerFileInput}>
              Upload Documents
            </Button>

            <Input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              accept=".pdf, .docx, .txt"
              display="none"
            />

            {assignment?.submission?.status === "submitted" && (
              <Box mt={4}>
                <Text fontSize="md" mb={2}>
                  Submitted File:
                </Text>
                <Box border="1px solid #AACCFF" p={2} borderRadius="8px">
                  <Link
                    href={assignment.submission.pdf_url}
                    color="blue.500"
                    fontWeight="bold"
                    isExternal
                  >
                    {extractFileName(assignment.submission.pdf_url)}
                  </Link>
                </Box>
              </Box>
            )}

            {error && (
              <Text color="red.500" fontSize="sm" mt={2}>
                {error}
              </Text>
            )}

            {files.length > 0 && (
              <Box mt={4}>
                <Text fontSize="md">Selected files:</Text>
                <ul>
                  {files.map((file, index) => (
                    <Text
                      border="1px solid #AACCFF"
                      p={2}
                      borderRadius={"8px"}
                      mt={3}
                      key={index}
                    >
                      {file.name}
                    </Text>
                  ))}
                </ul>
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
};

export default UploadAssignments;
