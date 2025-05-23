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
  IconButton,
  Badge,
  useToast,
  
} from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const UploadAssignments = () => {
  const [files, setFiles] = useState([]);
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const { assignment_id, course_id } = useParams();
  const [postLoading, setPostLoading] = useState(false);
  const cancelRef = useRef();
  const toast = useToast();



  const extractFileName = (url) => {
    if (!url) return "";
    // Extract the actual filename from the UUID-based filename
    const urlParts = url.split("/");
    const fullFileName = urlParts[urlParts.length - 1];
    
    // Try to extract the original filename if it's in the format of UUID_originalName.pdf
    const nameParts = fullFileName.split("_");
    if (nameParts.length > 2) {
      // Return just the last part which might be closer to the original name
      const dateTimePart = nameParts[nameParts.length - 1];
      return dateTimePart;
    }
    return fullFileName;
  };

  const nav = useNavigate();

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `https://smartassess-backend-t3l93.ondigitalocean.app/student/assignment/${assignment_id}`,
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
    setFiles(selectedFiles);
    setError(""); // Clear any previous errors
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
      
      // Determine if this is a new submission or an update based on assignment state
      const endpoint = assignment?.submission?.id 
        ? `https://smartassess-backend-t3l93.ondigitalocean.app/student/assignment/${assignment_id}/update-submission`
        : `https://smartassess-backend-t3l93.ondigitalocean.app/student/assignment/${assignment_id}/submit`;
      
      const method = assignment?.submission?.id ? "PUT" : "POST";
      
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || `Failed to ${assignment?.submission?.id ? "update" : "submit"} assignment.`);
      }

      setAssignment((prev) => ({
        ...prev,
        submission: data.submission,
        grade: data.submission.grade,
      }));

      setFiles([]); // Clear selected files after submission
      setError("");
      nav(`/student/allAssignments/${course_id}`);
      
      toast({
        title: assignment?.submission?.id 
          ? "Assignment resubmitted successfully" 
          : "Assignment submitted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      setError(
        err.message || "An error occurred while submitting the assignment."
      );
      
      toast({
        title: "Error",
        description: err.message || "Failed to submit assignment.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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

  // Check if the assignment is past due date
  const isPastDue = new Date() > new Date(assignment?.deadline);
  const isSubmissionEvaluated = assignment?.submission?.evaluation_done;
  const isSubmitted = assignment?.submission?.status === "submitted";

  // Extract original file name from the submission URL
  const submittedFileName = isSubmitted ? 
    files.length > 0 ? files[0].name : 
    assignment.submission.original_filename || extractFileName(assignment.submission.pdf_url) :
    "";

    console.log(isPastDue)
    console.log(isSubmitted)
    console.log(files.length==0)

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box px={{ base: 6, lg: 12 }} py={6}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            aria-label="Go Back"
            icon={<ArrowBackIcon />}
            onClick={() => nav(`/student/allAssignments/${course_id}`)}
            mr={4}
          />
          <Box
            display={"flex"}
            borderRadius={"6px"}
            px={2}
            py={1}
            bg="#3182CE"
            color="white"
          >
            <Text fontSize="md">Points</Text>
            {isSubmitted ? (
              <Text ml={2} color="white">
                {assignment.grade ?? "Not Graded Yet"}
              </Text>
            ) : (
              <Text ml={2} color="white">
                {assignment?.grade}
              </Text>
            )}
          </Box>
        </Flex>

        {/* Heading & Status */}
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          alignItems={{ base: "flex-start", md: "center" }}
          justifyContent="space-between"
          gap={4}
        >
          <Box mt={2} display="flex" flexDirection={"column"}>
            <Heading
              color="#3D4C5E"
              fontSize={{ base: "24px", md: "28px", lg: "32px" }}
              fontWeight="500"
            >
              {assignment?.name?.charAt(0).toUpperCase() +
                assignment?.name?.slice(1)}
            </Heading>
            <Badge
              borderRadius={"6px"}
              color={isPastDue ? "red.500" : "gray"}
              bg="transparent"
              mt={2}
              fontSize="sm"
            >
              {isPastDue ? "Past Due: " : "Due "} 
              {new Date(assignment?.deadline).toLocaleString()}
            </Badge>
            {isSubmitted && assignment?.submission?.submitted_at && (
              <Badge
                color="gray"
                bg="transparent"
                borderRadius={"6px"}
                mt={2}
                fontSize="sm"
              >
                Submitted at{" "}
                {new Date(assignment.submission.submitted_at).toLocaleString()}
              </Badge>
            )}
          </Box>

          {/* Action Buttons */}
          <Box
            w={{ base: "100%", lg: "auto" }}
            flex={{ base: 1, lg: "0" }}
            mt={{ base: 4, lg: 0 }}
            display={"flex"}
            alignItems={"flex-end"}
            flexDirection={"row"}
            flexWrap={{ base: "wrap", md: "nowrap" }}
            gap={2}
          >
            {isSubmitted ? (
              <>
                <Button
                  colorScheme="orange"
                  mr={{base:0,lg:2}}
                  onClick={handleSubmitAssignment}
                  isDisabled={isPastDue  || assignment.submission.pdf_url === null}
                  width={{ base: "100%", sm: "auto" }}
                  isLoading={postLoading}
                  loadingText="Submitting"
                >
                  Resubmit
                </Button>
              </>
            ) : (
              <Button
                isLoading={postLoading}
                loadingText="Submitting"
                colorScheme="blue"
                mr={2}
                onClick={handleSubmitAssignment}
                isDisabled={isPastDue || files.length === 0}
                width={{ base: "100%", sm: "auto" }}
              >
                Hand In
              </Button>
            )}

            <Button
              colorScheme="blue"
              disabled={!assignment.submission?.evaluation_done}
              onClick={() => nav(`/student/results/${assignment_id}/${course_id}`)}
              width={{ base: "100%", sm: "auto" }}
            >
              Results
            </Button>
          </Box>
        </Flex>

        {/* Description & Upload Section */}
        <Box mt={6}>
          <Flex direction="column" gap={{ base: 2, lg: 4 }}>
            <Text fontSize="md">{assignment?.description}</Text>

            {assignment?.question_pdf_url && (
              <Box
                w={{ base: "100%", lg: "25%" }}
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

            {isSubmitted && assignment.submission.pdf_url && (
              <Box mb={4}>
                <Text fontSize="md" mb={2}>
                  Submitted File:
                </Text>
                <Box
                  w={{ base: "100%", lg: "25%" }}
                  border="1px solid #AACCFF"
                  p={2}
                  borderRadius="8px"
                >
                  <Link
                    href={assignment.submission.pdf_url}
                    color="blue.500"
                    fontWeight="bold"
                    isExternal
                  >
                    {submittedFileName}
                  </Link>
                </Box>
              </Box>
            )}

            <Button
              w={{ base: "100%", lg: "25%" }}
              colorScheme="blue"
              onClick={triggerFileInput}
              isDisabled={isPastDue && !isSubmitted}
              leftIcon={<span>📄</span>}
            >
              Upload New File
            </Button>
            <Input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf"
              display="none"
            />

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
                  {isSubmitted ? "New file to submit:" : "Selected file:"}
                </Text>
                {files.map((file, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    border="1px solid #AACCFF"
                    p={3}
                    borderRadius="8px"
                    mt={2}
                    bg="blue.50"
                    w={{ base: "100%", lg: "25%" }} 
                  >
                    <Flex align="center">
                      <Box color="blue.500" mr={2}>📄</Box>
                      <Text fontWeight="medium">{file.name}</Text>
                    </Flex>
                  </Box>
                ))}
                
                {isSubmitted && (
                  <Text fontSize="sm" mt={2} color="gray.600">
                    Click the "Resubmit" button at the top to replace your previous submission with this file.
                  </Text>
                )}
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