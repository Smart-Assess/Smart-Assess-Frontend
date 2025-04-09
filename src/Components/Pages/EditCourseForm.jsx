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
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const getFilenameFromUrl = (url) => {
    if (!url) return "Unknown file";
    const fullName = url.split("/").pop().split("?")[0];
    // If filename has a course ID prefix (e.g., "123_filename.pdf"), remove it
    const parts = fullName.split("_");
    return parts.length > 1 ? parts.slice(1).join("_") : fullName;
  };

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

        if (courseData.pdf_urls && courseData.pdf_urls.length > 0) {
          setExistingFiles(courseData.pdf_urls.map(url => ({
            name: getFilenameFromUrl(url),
            url: url
          })));
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

      // Add new files to upload
      uploadedFiles.forEach((file) => {
        formData.append("pdfs", file);
      });

      // Add files to remove as a JSON string
      if (filesToRemove.length > 0) {
        formData.append("removed_pdfs", JSON.stringify(filesToRemove));
      }

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
      toast({
        title: "Error updating course",
        description: err.response?.data?.detail || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
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

    // Only add new files to the uploadedFiles state
    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleExistingFileDelete = (url) => {
    // Mark file for removal on the server
    setFilesToRemove((prev) => [...prev, url]);
    
    // Remove from displayed files
    setExistingFiles((prev) => prev.filter((file) => file.url !== url));
  };

  const handleNewFileDelete = (index) => {
    // Remove from uploaded files
    setUploadedFiles((prev) => {
      const updatedFiles = prev.filter((_, i) => i !== index);
      return updatedFiles;
    });
  };

  // Combined files for display
  const allFiles = [
    ...existingFiles.map((file) => ({
      ...file,
      isExisting: true,
    })),
    ...uploadedFiles.map((file) => ({
      name: file.name,
      isExisting: false,
      index: uploadedFiles.indexOf(file),
    })),
  ];

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
                    accept="application/pdf, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    multiple
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
                  {allFiles.length > 0 && (
                    <VStack align="start" spacing={2} w="100%">
                      {allFiles.map((file, idx) => (
                        <HStack
                          key={idx}
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
                            onClick={() => 
                              file.isExisting 
                                ? handleExistingFileDelete(file.url) 
                                : handleNewFileDelete(file.index)
                            }
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