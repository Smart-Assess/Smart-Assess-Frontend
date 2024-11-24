import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  SimpleGrid,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";

import FormInput from "./../UI/FormInput";
import { addTeacher } from "../../data/TeacherData";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
function StudentForm({ show }) {
  const methods = useForm();
  const nav = useNavigate();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Flex w="100%" pb={8}>
      <Box w="100%">
        <Flex align="flex-start">
          {show ? (
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
                  Upload Teacher Profile
                </Text>
                <input
                  type="file"
                  accept="image/*"
                  {...methods.register("universityLogo")}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
              </Box>
            </VStack>
          ) : null}

          <Box w="100%" ml={4}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <SimpleGrid columns={[1, null, 3]} spacing="8">
                  {addTeacher.map((field) => (
                    <FormInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                    />
                  ))}
                </SimpleGrid>

                <Box display="flex" justifyContent="flex-end" mt="6">
                  <Button
                    onClick={() => nav("/university/teacher/Dashboard")}
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

export default StudentForm;
