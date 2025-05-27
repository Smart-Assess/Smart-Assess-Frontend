import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  useToast,
  SimpleGrid,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import FormInput from "./../UI/FormInput";
import { editStudent } from "../../data/studentsData";
import ConfirmModal from "./ConfirmationModal";

function EditStudentForm({ student }) {
  const methods = useForm();
  const { handleSubmit, register, setValue, formState, reset } = methods;
  const nav = useNavigate();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (student) {
      setValue("fullName", student?.full_name || "");
      setValue("studentDepartment", student?.department || "");
      setValue("email", student?.email || "");
      setValue("batch", student?.batch || "");
      setValue("section", student?.section || "");
    }
  }, [student, setValue]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (formState.isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formState.isDirty]);

  const onSubmit = async (data) => {
    try {
      setupdateLoading(true);
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();

      formData.append("full_name", data.fullName);
      formData.append("department", data.studentDepartment);
      formData.append("email", data.email);
      formData.append("batch", data.batch);
      formData.append("section", data.section);

      if (data.password) {
        formData.append("password", data.password);
      }

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `https://smartassess-backend-t3l93.ondigitalocean.app/universityadmin/student/${id}`,
        formData,
        config
      );

      if (response.status === 200 || response.status === 201) {
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
      console.error("Error updating student:", err);
    } finally {
      setupdateLoading(false);
    }
  };

  return (
    <Flex w="100%" pb={8}>
      <Box w="100%">
        <Flex align="flex-start">
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
                      options={field.options} // <-- Add this line
                      validationMessage={field.validationMessage}
                    />
                  ))}

                  {/* Password Field */}
                  <FormControl>
                    <FormLabel>
                      New Password{" "}
                      <span style={{ fontSize: "12px", color: "gray" }}>
                        (Optional)
                      </span>
                    </FormLabel>
                    <Tooltip
                      hasArrow
                    >
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          {...register("password", {
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                            },
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                              message:
                                "Password must include uppercase, lowercase, number, and special character",
                            },
                          })}
                        />
                        <InputRightElement>
                          <IconButton
                            variant="ghost"
                            aria-label="Toggle password visibility"
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </Tooltip>
                    {formState.errors.password && (
                      <Box color="red.500" fontSize="sm" mt={1}>
                        {formState.errors.password.message}
                      </Box>
                    )}
                  </FormControl>

                  {/* Image Upload Field */}
                  <FormControl>
                    <FormLabel>Upload New Profile Image</FormLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      {...register("image")}
                      padding="1"
                      height="auto"
                    />
                  </FormControl>
                </SimpleGrid>

                <Box display="flex" justifyContent="flex-end" mt="6">
                  <Button
                    onClick={() => {
                      if (formState.isDirty) {
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
              reset();
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
