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
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const { assignment_id } = useParams();
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
        throw new Error(errorData.detail || "Failed to submit assignment.");
      }

      const data = await response.json();
      setAssignment((prev) => ({
        ...prev,
        submission: data.submission,
        grade: data.submission.grade,
      }));

      setFiles([]);
      setError("");
    } catch (err) {
      setError(err.message || "An error occurred while submitting the assignment.");
    } finally {
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
      <Box flex="1" px={{ base: 4, md: 8, lg: 12 }} py={6}>
        {/* Heading & Actions */}
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", md: "center" }}
          justifyContent="space-between"
          gap={4}
        >
          <Box>
            <Heading
              color="#3D4C5E"
              fontSize={{ base: "24px", md: "28px", lg: "32px" }}
              fontWeight="500"
            >
              {assignment?.name}
            </Heading>
            <Badge bg="gray.500" color="white" mt={2} fontSize="sm">
              Due {new Date(assignment?.deadline).toLocaleString()}
            </Badge>
          </Box>

          <Flex direction={{ base: "column", sm: "row" }} gap={4} alignItems="center">
            <Box textAlign={{ base: "left", sm: "center" }}>
              <Text fontSize="md">Points</Text>
              {assignment?.submission?.status === "submitted" ? (
                <Text color="#546881">{assignment.grade}</Text>
              ) : (
                <Text color="#546881">Not Graded Yet</Text>
              )}
            </Box>

            <Button
              isLoading={postLoading}
              colorScheme="blue"
              onClick={handleSubmitAssignment}
              isDisabled={assignment?.submission?.status === "submitted"}
              width={{ base: "100%", sm: "auto" }}
            >
              {assignment?.submission?.status === "submitted" ? "Handed In" : "Hands In"}
            </Button>

            <Button
              colorScheme="blue"
              onClick={() => nav(`/student/results/${assignment_id}`)}
              width={{ base: "100%", sm: "auto" }}
            >
              Results
            </Button>
          </Flex>
        </Flex>

        {/* Submission Status */}
        {assignment?.submission?.status === "submitted" && (
          <Badge bg="gray.500" color="white" mt={4} fontSize="sm">
            Submitted at {new Date(assignment.submission.submitted_at).toLocaleString()}
          </Badge>
        )}

        {/* Description & Upload Section */}
        <Box mt={6}>
          <Flex direction="column" gap={4}>
            <Text fontSize="md">{assignment?.description}</Text>

            {assignment?.question_pdf_url && (
              <Box
                border="1px solid"
                borderColor="blue.500"
                borderRadius="8px"
                p={4}
              >
                <Link
                  href={assignment.question_pdf_url}
                  download={extractFileName(assignment.question_pdf_url)}
                  color="blue.500"
                  fontSize="md"
                  fontWeight="bold"
                >
                  {extractFileName(assignment.question_pdf_url)}
                </Link>
              </Box>
            )}

            <Text fontSize="md">My work:</Text>

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

            {/* Submitted File */}
            {assignment?.submission?.status === "submitted" && (
              <Box>
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

            {/* Error Message */}
            {error && (
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}

            {/* Selected Files */}
            {files.length > 0 && (
              <Box>
                <Text fontSize="md" mb={2}>
                  Selected files:
                </Text>
                {files.map((file, index) => (
                  <Text
                    border="1px solid #AACCFF"
                    p={2}
                    borderRadius="8px"
                    mt={2}
                    key={index}
                  >
                    {file.name}
                  </Text>
                ))}
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
