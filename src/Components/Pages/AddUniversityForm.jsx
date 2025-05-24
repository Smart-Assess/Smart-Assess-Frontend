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
  useToast,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import FormInput from "./../UI/FormInput";
import { addUniversity } from "../../data/UniversityData";
import { useNavigate } from "react-router-dom";
import axios from "axios";



// sdfdsfs

function AddUniversityForm({ showUpload }) {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const nav = useNavigate();
  const toast = useToast();

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
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

      const response = await axios.post(
        "https://smartassess-backend-t3l93.ondigitalocean.app/superadmin/university",
        formData,
        config
      );

      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast({
          title: "University added successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        nav("/superadmin/dashboard");
      }
    } catch (err) {
      console.error("Error adding university:", err);
      setLoading(false);
      toast({
        title: "Error adding university",
        description:
          err.response?.data?.detail ||
          "An unexpected error occurred. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
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
            <VStack
              spacing={4}
              w={{ base: "100%", md: "40%" }}
              align="center"
            >
              <Box
                w="100%"
                h="240px"
                border="2px"
                borderColor={errors.universityLogo ? "red.500" : "gray.200"}
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
                  Upload University Logo
                </Text>
                <input
                  type="file"
                  accept="image/*"
                  {...register("universityLogo")}
                  onChange={handleFileChange}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
              </Box>
              {fileName && (
                <HStack
                  w="100%"
                  justify="space-between"
                  bg="gray.100"
                  p="2"
                  borderRadius="md"
                >
                  <Text fontSize="sm" noOfLines={1} w="80%">
                    {file.name}
                  </Text>
                </HStack>
              )}
              {errors.universityLogo && (
                <Text color="red.500">{errors.universityLogo.message}</Text>
              )}
            </VStack>
          )}

          {/* Form Section */}
          <Box w={{ base: "100%", md: showUpload ? "60%" : "100%" }}>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {addUniversity.map((field) => (
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

                {/* Buttons */}
                <Flex justifyContent="flex-end" mt={6} flexWrap="wrap">
                  <Button
                    onClick={() => nav("/superadmin/Dashboard")}
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

export default AddUniversityForm;
