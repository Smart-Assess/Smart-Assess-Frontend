import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  useToast,
  SimpleGrid,
  Flex,
  Input,
  FormControl,
  FormLabel,
  IconButton,
  InputGroup,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import FormInput from "../UI/FormInput";
import ConfirmModal from "./ConfirmationModal";
import { editTeacher } from "../../data/TeacherData";

function EditTeacherForm({ teacher }) {
  const methods = useForm();
  const { handleSubmit, register, setValue, formState } = methods;
  const nav = useNavigate();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [updateLoading, setupdateLaoding] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (teacher) {
      setValue("teacherName", teacher?.full_name || "");
      setValue("department", teacher?.department || "");
      setValue("email", teacher?.email || "");
    }
  }, [teacher, setValue]);

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
      setupdateLaoding(true);
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("full_name", data.teacherName);
      formData.append("department", data.department);
      formData.append("email", data.email);

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
        `https://smartassess-backend-t3l93.ondigitalocean.app/universityadmin/teacher/${id}`,
        formData,
        config
      );

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Teacher updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        nav("/university/teacher/Dashboard");
      }
    } catch (err) {
      console.error("Error updating Teacher:", err);
    } finally {
      setupdateLaoding(false);
    }
  };

  return (
    <Flex w="100%" pb={8}>
      <Box w="100%">
        <Flex align="flex-start">
          <Box w="100%">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Main Fields */}
                <SimpleGrid columns={[1, null, 3]} spacing="8">
                  {editTeacher.map((field) => (
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

                {/* Password & Image Fields Styled Same */}
                <SimpleGrid columns={[1, null, 3]} spacing="8" mt={6}>
                  <FormControl>
                    <FormLabel>New Password</FormLabel>
                    <Tooltip label="Password must be at least 6 characters" hasArrow>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          {...register("password")}
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
                  </FormControl>

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

                  {/* Spacer for alignment */}
                  <Box />
                </SimpleGrid>

                {/* Buttons */}
                <Box display="flex" justifyContent="flex-end" mt="6">
                  <Button
                    onClick={() => {
                      if (formState.isDirty) {
                        setPendingAction(() => () =>
                          nav("/university/teacher/Dashboard")
                        );
                        setIsModalOpen(true);
                      } else {
                        nav("/university/teacher/Dashboard");
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

            {/* Confirm Navigation Modal */}
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
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default EditTeacherForm;
