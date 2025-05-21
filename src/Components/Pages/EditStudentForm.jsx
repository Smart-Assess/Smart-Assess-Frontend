import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, useToast, SimpleGrid, Flex } from "@chakra-ui/react";

import FormInput from "./../UI/FormInput";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { editStudent } from "../../data/studentsData";
import ConfirmModal from "./ConfirmationModal";
function EditStudentForm({ student, fileName, file, setFile, setFileName }) {
  const methods = useForm();
  const { handleSubmit } = methods;
  const nav = useNavigate();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    if (student) {
      methods.setValue("fullName", student?.full_name);
      methods.setValue("studentDepartment", student?.department);
      methods.setValue("email", student?.email);
      methods.setValue("batch", student?.batch);
      methods.setValue("section", student?.section);
    }
  }, [student, methods.setValue]);

  const [updateLoading, setupdateLaoding] = useState();
  const { id } = useParams();
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

  const onSubmit = async (data) => {
    try {
      setupdateLaoding(true);
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();

      formData.append("full_name", data.fullName);
      formData.append("department", data.studentDepartment);
      formData.append("email", data.email);
      formData.append("batch", data.batch);
      formData.append("section", data.section);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://134.209.110.162:8000/universityadmin/student/${id}`,
        formData,
        config
      );

      if (response.status === 200 || response.status === 201) {
        setupdateLaoding(false);
        toast({
          title: "Student updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        nav("/university/student/Dashboard");
      }
    } catch (err) {
      console.error("Error updating university:", err);
      setupdateLaoding(false);
    }
  };

  return (
    <Flex w="100%" pb={8}>
      <Box w="100%">
        <Flex align="flex-start">
          {/* Form Section */}
          <Box w="100%">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={[1, null, 3]} spacing="8">
                  {editStudent.map((field) => (
                    <FormInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      pattern={field.pattern}
                      validationMessage={field.validationMessage}
                    />
                  ))}
                </SimpleGrid>

                <Box display="flex" justifyContent="flex-end" mt="6">
                  <Button
                    onClick={() => {
                      if (methods.formState.isDirty) {
                        setPendingAction(
                          () => () => nav("/university/student/Dashboard")
                        );
                        setIsModalOpen(true);
                      } else {
                        nav("/university/student/Dashboard");
                      }
                    }}
                    variant="outline"
                    colorScheme="gray"
                    mr="4"
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={updateLoading}
                    type="submit"
                    colorScheme="blue"
                  >
                    Update
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </Box>
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
        </Flex>
      </Box>
    </Flex>
  );
}

export default EditStudentForm;
