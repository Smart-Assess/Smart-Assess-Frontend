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
  Spinner,
  useToast,
  Input,
} from "@chakra-ui/react";
import { FaFilePdf, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "../../Components/UI/FormInput";
import { createAssignment } from "../../data/UniversityData";

import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import ConfirmModal from "../../Components/Pages/ConfirmationModal";

const EditAssignment = () => {
  const { courseId, assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [uploadFileName, setUploadFileName] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [isAssignmentLoading, setIsAssignmentLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm();
  const navigate = useNavigate();

  const toast = useToast();
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (methods.formState.isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [methods.formState.isDirty]);

  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const response = await axios.get(
          `http://134.209.110.162:8000/teacher/course/${courseId}/assignment/${assignmentId}`,
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

    fetchAssignmentData();
  }, []);

  const handleFileChange = (event) => {
    setNewFile(event.target.files[0]);
  };

  const handleRemoveFile = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      await axios.put(
        `http://134.209.110.162:8000/teacher/course/${courseId}/assignment/${assignmentId}`,
        { question_pdf: null }, // Send null to remove the file
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUploadFileName(null);
      setNewFile(null);

      toast({
        title: "File removed successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      console.error("Error removing file:", err);
      toast({
        title: "Failed to remove file",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      const { deadline, time } = data;
      const formattedDateTime = `${deadline} ${time}`;
      const updatedData = { ...data, deadline: formattedDateTime };
      delete updatedData.time;

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("deadline", updatedData.deadline || "");
      formData.append("grade", String(data.grade));

      if (newFile) {
        formData.append("question_pdf", newFile);
      } else if (!uploadFileName) {
        // If no file is selected and previous file is deleted, send null
        formData.append("question_pdf", "");
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://134.209.110.162:8000/teacher/course/${courseId}/assignment/${assignmentId}`,
        formData,
        config
      );

      if (response.status === 200 || response.status === 201) {
        if (response.data.assignment.question_pdf_url) {
          setUploadFileName(response.data.assignment.question_pdf_url);
        } else {
          setUploadFileName(null);
        }

        toast({
          title: "Assignment updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        navigate(`/teacher/viewAssignments/${courseId}`);
      }
    } catch (err) {
      console.error("Error updating assignment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        {isAssignmentLoading ? (
          <Flex justifyContent="center" mt="140px" alignItems="center">
            <Spinner size="lg" thickness="4px" speed="0.65s" color="blue.500" />
          </Flex>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between" my={6}>
              <Box>
                <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
                  Edit Assignment
                </Heading>
                <Text color="#546881">Update the information below</Text>
              </Box>
            </Flex>

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
                    />
                  ))}
                </SimpleGrid>

                <Flex mt={6} align="center">
                  {uploadFileName ? (
                    <Flex
                      w="100%"
                      align="center"
                      mr={4}
                      p={2}
                      border="1px solid gray"
                      borderRadius="md"
                    >
                      <Icon as={FaFilePdf} color="red.500" boxSize={6} mr={2} />
                      <Link
                        w="100%"
                        href={uploadFileName}
                        color="blue.500"
                        fontWeight="medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {uploadFileName.split("/").pop()}
                      </Link>

                      <Button
                        ml={4}
                        size="sm"
                        colorScheme="red"
                        onClick={handleRemoveFile}
                      >
                        <Icon as={FaTrash} />
                      </Button>
                    </Flex>
                  ) : (
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  )}
                </Flex>

                <Box display="flex" justifyContent="flex-end" mt="6">
                  <Button
                    onClick={() => {
                      if (methods.formState.isDirty) {
                        setPendingAction(
                          () => () =>
                            navigate(`/teacher/viewAssignments/${courseId}`)
                        );
                        setIsModalOpen(true);
                      } else {
                        navigate(`/teacher/viewAssignments/${courseId}`);
                      }
                    }}
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
                  >
                    Update
                  </Button>
                </Box>
              </form>
              <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                  setIsModalOpen(false);
                  methods.reset();
                  if (pendingAction) pendingAction();
                }}
                title="Discard changes?"
                message="You have unsaved changes. Are you sure you want to leave? Changes will be lost."
              />
            </FormProvider>
          </>
        )}
      </Box>
      <Footer mt="auto" />
    </Flex>
  );
};

export default EditAssignment;
