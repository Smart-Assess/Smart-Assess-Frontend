import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  SimpleGrid,
  Flex,
  Icon,
  Text,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import FormInput from "./../UI/FormInput";
import { addTeacher } from "../../data/TeacherData";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import axios from "axios";

function TeacherForm({ show }) {
  const methods = useForm();
  const {
    register,
    formState: { errors },
  } = methods;

  const nav = useNavigate();
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

  const toast = useToast();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();

      formData.append("full_name", data.teacherName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("department", data.department);

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
        "//134.209.110.162:8000/universityadmin/teacher",
        formData,
        config
      );

      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast({
          title: "Teacher added successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        nav("/university/teacher/Dashboard");
      }
    } catch (err) {
      console.error("Error adding course:", err);
      setLoading(false);
      toast({
        title: "Error adding Teacher",
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
          {show && (
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
                  Upload Teacher Image
                </Text>
                <input
                  type="file"
                  accept="image/*"
                  {...register("teacherImage")}
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

          <Box w={{ base: "100%", md: show ? "60%" : "100%" }}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {addTeacher.map((field) => (
                    <FormInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      pattern={field.pattern}
                      validationMessage={field.validationMessage}
                      options={field.options}
                      inputProps={{
                        height: "45px",
                        width: "100%",
                      }}
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
                    onClick={() => nav("/university/teacher/Dashboard")}
                    variant="outline"
                    colorScheme="gray"
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

export default TeacherForm;
