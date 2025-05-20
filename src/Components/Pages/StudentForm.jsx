import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  SimpleGrid,
  Flex,
  Icon,
  Text,
  HStack,
  VStack,
  useToast,
} from "@chakra-ui/react";

import FormInput from "./../UI/FormInput";
import { addStudent } from "../../data/studentsData";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import axios from "axios";

function StudentForm({ show }) {
  const methods = useForm();
  const {
    register,
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

      formData.append("full_name", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("section", data.section);
      formData.append("batch", data.batch);
      formData.append("department", data.studentDepartment);

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
        "http://134.209.110.162:8000/universityadmin/student",
        formData,
        config
      );

      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast({
          title: "Student added successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        nav("/university/student/Dashboard");
      }
    } catch (err) {
      console.error("Error adding student:", err);
      setLoading(false);

      toast({
        title: "Error adding student",
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
          align="flex-start"
          direction={["column", "column", "row"]}
          gap={[6, 6, 0]}
        >
          {show ? (
            <VStack spacing="4" w={["100%", "100%", "40%"]} mr={[0, 0, 8]}>
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
                  Upload Student Image
                </Text>
                <input
                  type="file"
                  accept="image/*"
                  {...register("studentImage")}
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
          ) : null}

          <Box w={["100%", "100%", "100%"]} ml={[0, 0, 4]}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <SimpleGrid columns={[1, 1, 3]} spacing="8">
                  {addStudent.map((field) => (
                    <FormInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      pattern={field.pattern}
                      validationMessage={field.validationMessage}
                      options={field.options}
                    />
                  ))}
                </SimpleGrid>

                <Box display="flex" justifyContent="flex-end" mt="6">
                  <Button
                    onClick={() => nav("/university/student/Dashboard")}
                    variant="outline"
                    colorScheme="gray"
                    mr="4"
                  >
                    Cancel
                  </Button>
                  <Button isLoading={loading} type="submit" colorScheme="blue">
                    Save
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default StudentForm;
