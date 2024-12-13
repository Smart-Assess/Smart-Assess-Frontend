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
import { FiUpload } from "react-icons/fi";

import FormInput from "./../UI/FormInput";
import { createAssignment } from "../../data/UniversityData";
import { useNavigate } from "react-router-dom";
import { FiTrash } from "react-icons/fi";

function CreateAssignmentForm({ showUpload }) {
  const [uploadFileName, setUploadFileName] = useState(null);

  const methods = useForm();
  const nav = useNavigate();
  const onSubmit = (data) => {
    const { deadline, time } = data;
    const formattedDateTime = `${deadline} ${time}`;

    const updatedData = {
      ...data,
      deadline: formattedDateTime,
      question_pdf: data.question_pdf[0].name,
    };

    setUploadFileName(data.question_pdf[0].name);
    console.log("Form Data:", updatedData);
  };

  return (
    <Flex w="100%" pb={8}>
      <Box w="100%">
        <Flex align="flex-start">
          {showUpload ? (
            <VStack spacing="4" w="40%" mr="8">
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
                    setUploadFileName(e.target.files[0].name);
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

                      <Button size="sm" colorScheme="red">
                        <Icon as={FiTrash} />
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              )}
            </VStack>
          ) : null}

          {/* Form Section */}
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

                <Box display="flex" justifyContent="flex-end" mt="6">
                  <Button
                    onClick={() => nav("/teacher/dashboard")}
                    variant="outline"
                    colorScheme="gray"
                    mr="4"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" colorScheme="blue">
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

export default CreateAssignmentForm;
