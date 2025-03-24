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
} from "@chakra-ui/react";
import { FiUpload, FiTrash } from "react-icons/fi";
import FormInput from "./../UI/FormInput";
import { createAssignment } from "../../data/UniversityData";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAssignmentForm({ showUpload, courseId }) {
  const [uploadFileName, setUploadFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const methods = useForm();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setErrorMessages({});
      const { deadline, time } = data;
      const formattedDateTime = `${deadline} ${time}`;
      const updatedData = { ...data, deadline: formattedDateTime };
      delete updatedData.time;
      setUploadFileName(data.question_pdf[0]?.name);

      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("deadline", updatedData.deadline || "");
      formData.append("grade", String(data.grade));
      formData.append("question_pdf", data.question_pdf[0]);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `http://127.0.0.1:8000/teacher/course/${courseId}/assignment`,
        formData,
        config
      );

      if (response.status === 200) {
        setLoading(false);
        nav("/teacher/Dashboard");
      }
    } catch (err) {
      setLoading(false);
      if (err.response?.data) {
        const { detail } = err.response.data;
        if (Array.isArray(detail)) {
          setErrorMessages(
            detail.reduce((acc, error) => {
              acc[error.loc[1]] = error.msg;
              return acc;
            }, {})
          );
        } else {
          setErrorMessages({ general: detail });
        }
      } else {
        setErrorMessages({ general: "An unexpected error occurred." });
      }
    }
  };

  return (
    <Flex w="100%" pb={8}>
      <Box w="100%">
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={8}
          align="flex-start"
        >
          {showUpload && (
            <VStack
              spacing="4"
              w={{ base: "100%", md: "40%" }}
              mb={{ base: 4, md: 0 }}
            >
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
                position="relative"
              >
                <Icon as={FiUpload} w={10} h={10} color="gray.400" mb="2" />
                <Text color="gray.500" mb="2">
                  Upload Assignment
                </Text>
                <input
                  type="file"
                  accept="application/pdf"
                  {...methods.register("question_pdf")}
                  onChange={(e) => {
                    setUploadFileName(e.target.files[0]?.name);
                  }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
              </Box>

              {uploadFileName && (
                <Box w="100%">
                  <VStack align="start" spacing="2" w="100%">
                    <HStack
                      w="100%"
                      justify="space-between"
                      bg="gray.100"
                      p="2"
                      borderRadius="md"
                    >
                      <Text fontSize="sm" noOfLines={1} w="80%">
                        {uploadFileName}
                      </Text>

                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => setUploadFileName(null)}
                      >
                        <Icon as={FiTrash} />
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              )}
            </VStack>
          )}

          <Box w="100%">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <SimpleGrid columns={[1, null, 2, 3]} spacing={8}>
                  {createAssignment.map((field) => (
                    <FormInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      defaultValue={field.defaultValue}
                      min={field.min}
                      max={field.max}
                    />
                  ))}
                </SimpleGrid>

                {/* Field-Level Errors */}
                {Object.keys(errorMessages).map((key) =>
                  key !== "general" && errorMessages[key] ? (
                    <Text key={key} color="red.500" fontSize="sm" mt={2}>
                      {key}: {errorMessages[key]}
                    </Text>
                  ) : null
                )}

                {/* General Errors */}
                {errorMessages.general && (
                  <Text color="red.500" fontSize="sm" mt={4}>
                    {errorMessages.general}
                  </Text>
                )}

                <Flex justify="flex-end" mt={6} wrap="wrap" gap={4}>
                  <Button
                    variant="outline"
                    colorScheme="gray"
                    onClick={() => nav(`/teacher/editCourse/${courseId}`)}
                  >
                    Cancel
                  </Button>
                  <Button isLoading={loading} type="submit" colorScheme="blue">
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

export default CreateAssignmentForm;
