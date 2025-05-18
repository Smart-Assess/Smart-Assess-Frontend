import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { FiUpload, FiTrash } from "react-icons/fi";
import FormInput from "./../UI/FormInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addCourse } from "../../data/UniversityData";

function AddCourseForm({ showUpload }) {
  const methods = useForm();
  const { setValue } = methods;

  const nav = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("batch", data.batch);
      formData.append("group", data.group || "");
      formData.append("section", data.section);
      formData.append("status", data.status);

      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "//134.209.110.162:8000/teacher/course",
        formData,
        config
      );

      if (response.status === 200) {
        setLoading(false);
        nav("/teacher/Dashboard");
      }
    } catch (err) {
      console.error("Error adding course:", err);
      setLoading(false);
      setError("An error occurred while adding the course.");
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

      setValue("pdfs", updatedFiles);

      return updatedFiles;
    });
  };

  return (
    <Flex w="100%" pb={8}>
      <Box w="100%">
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          gap={8}
          align="flex-start"
        >
          {/* Upload Section */}
          {showUpload && (
            <VStack spacing={4} w={{ base: "100%", md: "40%" }} align="center">
              <Box
                w="100%"
                h="240px"
                border="2px"
                borderColor={error ? "red.500" : "gray.200"}
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="gray.50"
                flexDirection="column"
                position="relative"
              >
                <Icon as={FiUpload} w={10} h={10} color="gray.400" mb={2} />
                <Text color="gray.500" mb={2}>
                  Upload Documents
                </Text>
                <input
                  type="file"
                  accept="application/pdf, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
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
                <Alert status="error" borderRadius="md" fontSize="sm">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

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
                      options={field.options || []}
                      pattern={field.pattern}
                      validationMessage={field.validationMessage}
                    />
                  ))}
                </SimpleGrid>

                {/* Buttons */}
                <Flex justifyContent="flex-end" mt={6} flexWrap="wrap">
                  <Button
                    onClick={() => nav("/teacher/Dashboard")}
                    variant="outline"
                    colorScheme="gray"
                    mr={4}
                    size={{ base: "sm", md: "md" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={loading}
                    type="submit"
                    colorScheme="blue"
                    size={{ base: "sm", md: "md" }}
                  >
                    Save
                  </Button>
                </Flex>
              </form>
            </FormProvider>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default AddCourseForm;
