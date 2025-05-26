import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  useToast,
  SimpleGrid,
  Flex,
  InputGroup,
  InputRightElement,
  IconButton,
  Tooltip,
  Input,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import FormInput from "./../UI/FormInput";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { editUniversity } from "../../data/UniversityData";
import ConfirmModal from "./ConfirmationModal";

function EditUniversityForm({ university, file, setFile, fileName, setFileName }) {
  const methods = useForm();
  const { handleSubmit, register } = methods;
  const nav = useNavigate();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
    if (university) {
      methods.setValue("city", university?.university?.city);
      methods.setValue("email", university?.university?.email);
      methods.setValue("universityName", university?.university?.name);
      methods.setValue("universityAdminEmail", university?.admin?.email);
      methods.setValue("universityAdmin", university?.admin?.name);
      methods.setValue("phoneNumber", university?.university?.phone_number);
      methods.setValue("streetAddress", university?.university?.street_address);
      methods.setValue("state", university?.university?.state);
      methods.setValue("zipcode", university?.university?.zipcode);
      if (university.university?.image_url) {
        setFileName(university.university.image_url);
      }
    }
  }, [university, methods.setValue]);

  const [updateLoading, setupdateLaoding] = useState();
  const { id } = useParams();

  const onSubmit = async (data) => {
    try {
      setupdateLaoding(true);
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();

      formData.append("city", data.city);
      formData.append("university_email", data.email);
      formData.append("admin_password", data.password);
      formData.append("phone_number", data.phoneNumber);
      formData.append("state", data.state);
      formData.append("street_address", data.streetAddress);
      formData.append("admin_name", data.universityAdmin);
      formData.append("admin_email", data.universityAdminEmail);
      formData.append("university_name", data.universityName);
      formData.append("zipcode", data.zipcode);
      if (file) {
        formData.append("image", file);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `https://smartassess-backend-t3l93.ondigitalocean.app/superadmin/university/${id}`,
        formData,
        config
      );

      if (response.status === 200 || response.status === 201) {
        setupdateLaoding(false);
        toast({
          title: "University updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        nav("/superadmin/dashboard");
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
          <Box w="100%">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={[1, null, 3]} spacing="8">
                  {editUniversity.map((field) => (
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

                  {/* Updated Password Field */}
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
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      Leave empty to keep the current password
                    </Text>
                  </FormControl>

                  {/* Updated Image Upload Field */}
                  <FormControl>
                    <FormLabel>Upload New University Image</FormLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      padding="1"
                      height="auto"
                      onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        if (selectedFile) {
                          setFile(selectedFile);
                          setFileName(selectedFile.name);
                        }
                      }}
                    />
                    {fileName && (
                      <Text fontSize="sm" mt={2} color="gray.600">
                        Selected: {fileName}
                      </Text>
                    )}
                  </FormControl>
                </SimpleGrid>

                <Box display="flex" justifyContent="flex-end" mt="6">
                  <Button
                    onClick={() => {
                      if (methods.formState.isDirty) {
                        setPendingAction(() => () => nav("/superadmin/Dashboard"));
                        setIsModalOpen(true);
                      } else {
                        nav("/superadmin/Dashboard");
                      }
                    }}
                    variant="outline"
                    colorScheme="gray"
                    mr="4"
                  >
                    Cancel
                  </Button>
                  <Button isLoading={updateLoading} type="submit" colorScheme="blue">
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

export default EditUniversityForm;
