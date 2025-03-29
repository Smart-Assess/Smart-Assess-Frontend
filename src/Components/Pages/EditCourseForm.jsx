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
  useToast,
} from "@chakra-ui/react";
import { FiUpload, FiTrash } from "react-icons/fi";
import FormInput from "./../UI/FormInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addCourse } from "../../data/UniversityData";

function EditCourseForm({ showUpload, courseId, setCourseCodeId }) {
  const methods = useForm();
  const { setValue } = methods;
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [error, setError] = useState(null);
  const nav = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `http://127.0.0.1:8000/teacher/course/${courseId}`,
        config
      );

      if (response.status === 200) {
        const courseData = response.data.course;
        setCourses(courseData);
        setCourseCodeId(courseData.course_code);
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

  const toast = useToast();
  const [updateLoading, setupdateLaoding] = useState(false);
  const onSubmit = async (data) => {
    try {
      setupdateLaoding(true);
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("batch", data.batch);
      formData.append("group", data.group || "");
      formData.append("section", data.section);

      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/teacher/course/${courseId}`,
        formData,
        config
      );

      if (response.status === 200 || response.status === 201) {
        setupdateLaoding(false);
        toast({
          title: "Course updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        nav("/teacher/Dashboard");
      }
    } catch (err) {
      console.error("Error updating course:", err);
      setupdateLaoding(false);
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
    setUploadedFiles((prev) => {
      const updatedFiles = prev.filter((_, i) => i !== index);

      // Update the form state with the updated files
      setValue(
        "pdfs",
        updatedFiles.map((file) => file.name)
      );

      return updatedFiles;
    });
  };

  return (
    <Flex w="100%" pb={8} flexDirection="column">
      <Box w="100%">
        {loading ? (
          <Flex justifyContent="center" mt="140px" alignItems="center">
            <Spinner size="lg" thickness="4px" speed="0.65s" color="blue.500" />
          </Flex>
        ) : (
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={8}
            align="flex-start"
          >
            {/* Upload Section */}
            {showUpload && (
              <VStack
                spacing={4}
                w={{ base: "100%", md: "40%" }}
                align="center"
              >
                <Box
                  w="100%"
                  h={{ base: "200px", md: "240px" }}
                  border="2px"
                  borderColor="gray.200"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="gray.50"
                  flexDirection="column"
                  position="relative"
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
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                    }}
                  />
                </Box>

                {error && (
                  <Alert status="error" borderRadius="md" fontSize="sm" mt={2}>
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <Box w="100%">
                  {uploadedFiles.length > 0 && (
                    <VStack align="start" spacing={2} w="100%">
                      {uploadedFiles.map((file, index) => (
                        <HStack
                          key={index}
                          w="100%"
                          justify="space-between"
                          bg="gray.100"
                          p={2}
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

            {/* Form Section */}
            <Box w={{ base: "100%", md: showUpload ? "60%" : "100%" }}>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
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

                  <Flex
                    justifyContent="flex-end"
                    mt={6}
                    flexWrap="wrap"
                    gap={4}
                  >
                    <Button
                      onClick={() => nav("/teacher/Dashboard")}
                      variant="outline"
                      colorScheme="gray"
                      size={{ base: "sm", md: "md" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      isLoading={updateLoading}
                      type="submit"
                      colorScheme="blue"
                      size={{ base: "sm", md: "md" }}
                    >
                      Update
                    </Button>
                  </Flex>
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
