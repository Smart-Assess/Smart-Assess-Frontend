import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  SimpleGrid,
  Text,
  Flex,
  VStack,
  Icon,
  HStack,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import { FiUpload, FiTrash } from "react-icons/fi";
import FormInput from "./../UI/FormInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addCourse } from "../../data/UniversityData";

function EditCourseForm({ showUpload, courseId,setCourseCodeId }) {
  const methods = useForm();

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState({});
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://127.0.0.1:8000/teacher/course/${courseId}`,
        config
      );

      if (response.status === 200) {
        const courseData = response.data.course;
        setCourses(courseData);
        setCourseCodeId(courseData.course_code)
        
        setLoading(false);
        methods.setValue("name", courseData.name);
        methods.setValue("batch", courseData.batch);
        methods.setValue("group", courseData.group);
        methods.setValue("section", courseData.section);
        methods.setValue("pdfs", courseData.pdf_urls || []);

        if (courseData.pdf_urls) {
          setUploadedFiles(courseData.pdf_urls.map((url) => ({ name: url })));
        }
      }
    } catch (err) {
      setLoading(false);
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const nav = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/teacher/course/${courseId}`,
        data,
        config
      );

      if (response.status === 200) {
        nav("/teacher/Dashboard");
      }
    } catch (err) {
      console.error("Error updating course:", err);
    }
  };
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxFileSize = 5 * 1024 * 1024; // 5 MB

    const validFiles = [];
    let validationError = null;

    files.forEach((file) => {
      if (file.size > maxFileSize) {
        validationError = `File "${file.name}" exceeds the maximum size of 5 MB.`;
      } else {
        validFiles.push(file);
      }
    });

    if (validationError) {
      setError(validationError);
    } else {
      setError(null);
    }

    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleFileDelete = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    methods.setValue(
      "pdfs",
      uploadedFiles.filter((_, i) => i !== index)
    );
  };

  return (
    <Flex w="100%" pb={8}>
      <Box w="100%">
        {loading ? (
          <Flex justifyContent="center" mt="140px" alignItems="center">
            <Spinner size="lg" thickness="4px" speed="0.65s" color="blue.500" />
          </Flex>
        ) : (
          <Flex align="flex-start">
            {showUpload && (
              <VStack spacing="4" w="40%" mr="8">
                <Box
                  w="100%"
                  h="240px"
                  border="2px"
                  borderColor="gray.200"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="gray.50"
                  flexDirection="column"
                >
                  <Icon as={FiUpload} w={10} h={10} color="gray.400" mb="2" />
                  <Text color="gray.500" mb="2">
                    Upload Documents
                  </Text>
                  <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    {...methods.register("pdfs")}
                    onChange={handleFileUpload}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                    }}
                  />
                </Box>
                {error && (
                  <Alert status="error" borderRadius="md" fontSize="sm" mt="4">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
                <Box w="100%">
                  {uploadedFiles.length > 0 && (
                    <VStack align="start" spacing="2" w="100%">
                      {uploadedFiles.map((file, index) => (
                        <HStack
                          key={index}
                          w="100%"
                          justify="space-between"
                          bg="gray.100"
                          p="2"
                          borderRadius="md"
                        >
                          <Text fontSize="sm" noOfLines={1} w="80%">
                            {file.name}
                          </Text>
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => handleFileDelete(index)}
                          >
                            <Icon as={FiTrash} />
                          </Button>
                        </HStack>
                      ))}
                    </VStack>
                  )}
                </Box>
              </VStack>
            )}

            <Box w="100%">
              
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <SimpleGrid columns={[1, null, 3]} spacing="8">
                    {addCourse.map((field) => (
                      <FormInput
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                        pattern={field.pattern}
                        validationMessage={field.validationMessage}
                        options={field.options}
                      />
                    ))}
                  </SimpleGrid>

                  <Box display="flex" justifyContent="flex-end" mt="6">
                    <Button
                      onClick={() => nav("/teacher/Dashboard")}
                      variant="outline"
                      colorScheme="gray"
                      mr="4"
                    >
                      Cancel
                    </Button>
                    <Button
                      isLoading={loading}
                      type="submit"
                      colorScheme="blue"
                    >
                      Update
                    </Button>
                  </Box>
                </form>
              </FormProvider>
            </Box>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}

export default EditCourseForm;
