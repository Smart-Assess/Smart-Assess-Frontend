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
} from "@chakra-ui/react";
import { FaFilePdf } from "react-icons/fa"; // Add an icon for better styling
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { createAssignment } from "../../data/UniversityData";

import { useForm, FormProvider, Controller } from "react-hook-form";
import FormInput from "../../Components/UI/FormInput";

const Grading = () => {
  const { courseId, assignmentId } = useParams();

  const [assignments, setAssignments] = useState([]);
  const [uploadFileName, setUploadFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const methods = useForm({
    defaultValues: {
      enable_plagiarism: false,
      enable_ai_detection: false,
      enable_grammar: false,
    },
  });
  const nav = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://127.0.0.1:8000/teacher/course/${courseId}/assignment/${assignmentId}`,
        config
      );

      if (response.status === 200) {
        setAssignments(response.data.assignment);
        const data = response.data.assignment;
        methods.setValue("name", data.name);
        methods.setValue("deadline", data.deadline_date);
        methods.setValue("time", data.deadline_time);
        methods.setValue("description", data.description);
        methods.setValue("grade", data.grade);
        setUploadFileName(data.question_pdf_url);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const { enable_plagiarism, enable_ai_detection, enable_grammar } =
        formData;
      const jsonData = {
        enable_plagiarism,
        enable_ai_detection,
        enable_grammar,
      };

      console.log(jsonData);

      const token = localStorage.getItem("accessToken");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `http://127.0.0.1:8000/teacher/${courseId}/assignment/${assignmentId}/evaluate`,

        jsonData,
        config
      );

      if (response.status === 200) {
        setLoading(false);
        nav("/teacher/Dashboard");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        {fetching ? (
          <Flex
            mt={20}
            height="300px"
            justifyContent="center"
            alignItems="center"
          >
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
                <Flex align="flex-start">
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
                              defaultValue={field.defaultValue}
                              min={field.min}
                              max={field.max}
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
                              <Checkbox
                                {...field}
                                isChecked={false}
                                isDisabled={true}
                                colorScheme="blue"
                              >
                                AI Detection
                              </Checkbox>
                            )}
                          />

                          <Controller
                            name="enable_grammar"
                            control={methods.control}
                            render={({ field }) => (
                              <Checkbox
                                {...field}
                                isChecked={false}
                                isDisabled={true}
                                colorScheme="blue"
                              >
                                Grammar Check
                              </Checkbox>
                            )}
                          />
                        </HStack>

                        <Box display="flex" justifyContent="flex-end" mt="6">
                          <Button
                            onClick={() =>
                              nav(`/teacher/viewAssignments/${courseId}`)
                            }
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
                            Evaluate
                          </Button>
                        </Box>
                      </form>
                    </FormProvider>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </>
        )}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Grading;
