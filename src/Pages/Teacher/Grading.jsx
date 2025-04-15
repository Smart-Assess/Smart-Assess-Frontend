import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Link,
  Icon,
  Checkbox,
  HStack,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tooltip,
  Avatar,
} from "@chakra-ui/react";
import { FaFilePdf, FaInfoCircle } from "react-icons/fa";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { createAssignment } from "../../data/UniversityData";
import { useForm, FormProvider, Controller } from "react-hook-form";
import FormInput from "../../Components/UI/FormInput";

const Grading = () => {
  const { courseId, assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [hasSubmissions, setHasSubmissions] = useState(false);
  const [isCheckingSubmissions, setIsCheckingSubmissions] = useState(true);

  console.log(studentsData);
  const [uploadFileName, setUploadFileName] = useState(null);
  const [isAssignmentLoading, setIsAssignmentLoading] = useState(true);
  const [isStudentsLoading, setIsStudentsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm({
    defaultValues: {
      enable_plagiarism: false,
      enable_ai_detection: false,
      enable_grammar: false,
    },
  });
  const navigate = useNavigate();

  const fetchAssignmentData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get(
        `http://127.0.0.1:8000/teacher/course/${courseId}/assignment/${assignmentId}`,
        config
      );

      if (response.status === 200) {
        const data = response.data.assignment;
        setAssignment(data);
        methods.setValue("name", data.name);
        methods.setValue("deadline", data.deadline_date);
        methods.setValue("time", data.deadline_time);
        methods.setValue("description", data.description);
        methods.setValue("grade", data.grade);
        setUploadFileName(data.question_pdf_url);
      }
    } catch (err) {
      console.error("Error fetching assignment:", err);
    } finally {
      setIsAssignmentLoading(false);
    }
  };

  const fetchStudentsData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get(
        `http://127.0.0.1:8000/teacher/course/${courseId}/assignment/${assignmentId}/total-scores`,
        config
      );

      if (response.status === 200) {
        setStudentsData(response.data.total_scores);
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
    } finally {
      setIsStudentsLoading(false);
    }
  };

  const checkForSubmissions = async () => {
    try {
      setIsCheckingSubmissions(true);
      const token = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get(
        `http://127.0.0.1:8000/teacher/course/${courseId}/assignment/${assignmentId}/submissions?page=1&limit=1`,
        config
      );

      if (response.status === 200) {
        setHasSubmissions(response.data.total > 0);
      }
    } catch (err) {
      console.error("Error checking for submissions:", err);
      setHasSubmissions(false);
    } finally {
      setIsCheckingSubmissions(false);
    }
  };

  // Handle Form Submission
  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const { enable_plagiarism, enable_ai_detection, enable_grammar } =
        formData;
      const jsonData = {
        enable_plagiarism,
        enable_ai_detection,
        enable_grammar,
      };

      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `http://localhost:8000/teacher/${courseId}/assignment/${assignmentId}/evaluate`,
        jsonData,
        config
      );

      if (response.status === 200) {
        fetchStudentsData();
      }
    } catch (err) {
      console.error("Error submitting evaluation:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchAssignmentData();
    fetchStudentsData();
    checkForSubmissions();
  }, []);

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        {isAssignmentLoading || isStudentsLoading ? (
          <Flex height="300px" justifyContent="center" alignItems="center">
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
          </Flex>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between" my={6}>
              <Box>
                <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
                  Assignment
                </Heading>
                <Text color="#546881">Add the required information below</Text>
              </Box>
            </Flex>

            <Flex w="100%" pb={8}>
              <Box w="100%">
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <SimpleGrid columns={[1, null, 3]} spacing="8">
                      {createAssignment.map((field) => (
                        <FormInput
                          key={field.name}
                          name={field.name}
                          label={field.label}
                          type={field.type}
                          placeholder={field.placeholder}
                          isDisabled={true} // Disable inputs
                        />
                      ))}
                    </SimpleGrid>

                    {uploadFileName && (
                      <Box
                        mt="6"
                        p="4"
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor="gray.300"
                      >
                        <Flex align="center">
                          <Icon
                            as={FaFilePdf}
                            color="red.500"
                            boxSize="6"
                            mr="3"
                          />
                          <Link
                            href={uploadFileName}
                            color="blue.500"
                            fontWeight="medium"
                            isExternal
                          >
                            {uploadFileName.split("/").pop()}
                          </Link>
                        </Flex>
                      </Box>
                    )}

                    <HStack align="flex-start" mt="6" spacing={4}>
                      <Controller
                        name="enable_plagiarism"
                        control={methods.control}
                        render={({ field }) => (
                          <Checkbox {...field} colorScheme="blue">
                            Plagiarism
                          </Checkbox>
                        )}
                      />

                      <Controller
                        name="enable_ai_detection"
                        control={methods.control}
                        render={({ field }) => (
                          <Checkbox {...field} colorScheme="blue">
                            AI Detection
                          </Checkbox>
                        )}
                      />

                      <Controller
                        name="enable_grammar"
                        control={methods.control}
                        render={({ field }) => (
                          <Checkbox {...field} colorScheme="blue">
                            Grammar Check
                          </Checkbox>
                        )}
                      />
                    </HStack>

                    <Box display="flex" justifyContent="flex-end" mt="6">
                      <Button
                        onClick={() =>
                          navigate(`/teacher/viewAssignments/${courseId}`)
                        }
                        variant="outline"
                        colorScheme="gray"
                        mr="4"
                      >
                        Cancel
                      </Button>

                      <Button
                        isLoading={isSubmitting}
                        type="submit"
                        colorScheme="blue"
                        isDisabled={!hasSubmissions || isSubmitting || isCheckingSubmissions}
                        title={!hasSubmissions ? "No student submissions available to evaluate" : ""}
                      >
                        Evaluate
                      </Button>
                    </Box>
                  </form>
                </FormProvider>
              </Box>
            </Flex>

            <Box>
              <TableContainer
                mb={12}
                height="100%"
                border="1px solid #e0e0e0"
                boxShadow="lg"
                borderRadius="xl"
                bg="white"
              >
                <Table variant="simple">
                  <Thead backgroundColor="#EAEEF0">
                    {/* <Tr>
                      <Th>Name</Th>
                      <Th>Batch</Th>
                      <Th>Department</Th>
                      <Th>Section</Th>
                      <Th>Total Score</Th>
                      <Th>Avg Context Score</Th>
                      <Th>Avg Plagiarism Score</Th>
                      <Th>Avg AI Score</Th>
                      <Th>Avg Grammar Score</Th>
                      <Th>Feedback</Th>
                    </Tr> */}

                    <Tr>
                      {[
                        {
                          name: "Name",
                          tooltip: "This column displays the student's name.",
                        },
                        {
                          name: "Batch",
                          tooltip: "This column shows the student's batch.",
                        },
                        {
                          name: "Department",
                          tooltip: "This column displays the department.",
                        },
                        {
                          name: "Section",
                          tooltip:
                            "This column shows the section of the student.",
                        },
                        {
                          name: "Total Score",
                          tooltip:
                            "This represents your total score achieved out of the maximum possible.",
                        },
                        {
                          name: "Avg Context Score",
                          tooltip:
                            "This is the average context score of the student.",
                        },
                        {
                          name: "Avg Plagiarism Score",
                          tooltip:
                            "This score shows the similarity of your content with existing sources.If plagirism score is greater than 90% then total score will be zero of that question",
                        },
                        {
                          name: "Avg AI Score",
                          tooltip:
                            "This score indicates the likelihood that content was generated by AI tools like ChatGPT. If AI detection score is greater than 90%, the total score will be zero for that question.",
                        },
                        {
                          name: "Avg Grammar Score",
                          tooltip:
                            "This score reflects how grammatically accurate your submission is.",
                        },
                        {
                          name: "Feedback",
                          tooltip:
                            "This column contains feedback for the student.",
                        },
                      ].map((header, idx) => (
                        <Th key={idx}>
                          <Tooltip label={header.tooltip} hasArrow>
                            {header.name}
                          </Tooltip>
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {studentsData.length === 0 ? (
                      <Tr>
                        <Td colSpan={7} textAlign="center">
                          <Box p={5}>
                            <Text fontSize="xl" color="gray.500">
                              No Data Found
                            </Text>
                          </Box>
                        </Td>
                      </Tr>
                    ) : (
                      studentsData.map((student, index) => (
                        <Tr key={index}>
                          <Td
                            cursor={"pointer"}
                            onClick={() =>
                              navigate(
                                `/student/teacher/results/${courseId}/${assignmentId}/${student.id}`
                              )
                            }
                          >
                            <Flex alignItems={"center"}>
                              <Avatar src={student.image} size="sm" mr={3} />
                              {student.name}
                            </Flex>
                          </Td>
                          <Td
                            cursor={"pointer"}
                            onClick={() =>
                              navigate(
                                `/student/teacher/results/${courseId}/${assignmentId}/${student.id}`
                              )
                            }
                          >
                            {student.batch}
                          </Td>
                          <Td
                            cursor={"pointer"}
                            onClick={() =>
                              navigate(
                                `/student/teacher/results/${courseId}/${assignmentId}/${student.id}`
                              )
                            }
                          >
                            {student.department}
                          </Td>
                          <Td
                            cursor={"pointer"}
                            onClick={() =>
                              navigate(
                                `/student/teacher/results/${courseId}/${assignmentId}/${student.id}`
                              )
                            }
                          >
                            {student.section}
                          </Td>
                          <Td
                            cursor={"pointer"}
                            onClick={() =>
                              navigate(
                                `/student/teacher/results/${courseId}/${assignmentId}/${student.id}`
                              )
                            }
                          >
                            {student.total_score}/
                            {student.total_assignment_grade}
                          </Td>
                          <Td
                            cursor={"pointer"}
                            onClick={() =>
                              navigate(
                                `/student/teacher/results/${courseId}/${assignmentId}/${student.id}`
                              )
                            }
                          >
                            {student.avg_context_score
                              ? (student.avg_context_score * 100).toFixed(2) +
                                "%"
                              : "0.00%"}
                          </Td>
                          <Td
                            cursor={"pointer"}
                            onClick={() =>
                              navigate(
                                `/student/teacher/results/${courseId}/${assignmentId}/${student.id}`
                              )
                            }
                          >
                            {student.avg_plagiarism_score
                              ? (student.avg_plagiarism_score * 100).toFixed(
                                  2
                                ) + "%"
                              : "0.00%"}
                          </Td>
                          <Td
                            cursor={"pointer"}
                            onClick={() =>
                              navigate(
                                `/student/teacher/results/${courseId}/${assignmentId}/${student.id}`
                              )
                            }
                          >
                            {student.avg_ai_score
                              ? (student.avg_ai_score * 100).toFixed(2) + "%"
                              : "0.00%"}
                          </Td>
                          <Td
                            cursor={"pointer"}
                            onClick={() =>
                              navigate(
                                `/student/teacher/results/${courseId}/${assignmentId}/${student.id}`
                              )
                            }
                          >
                            {student.avg_grammar_score
                              ? (student.avg_grammar_score * 100).toFixed(2) +
                                "%"
                              : "0.00%"}
                          </Td>
                          <Td>
                            <Box
                              maxW="200px"
                              cursor="pointer"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace={
                                student.showFull ? "normal" : "nowrap"
                              }
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent navigation
                                setStudentsData((prev) =>
                                  prev.map((s, i) =>
                                    i === index
                                      ? { ...s, showFull: !s.showFull }
                                      : s
                                  )
                                );
                              }}
                            >
                              {student.feedback}
                            </Box>
                          </Td>
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Grading;
