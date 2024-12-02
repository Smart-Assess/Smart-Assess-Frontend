import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import { createAssignment } from "../../data/UniversityData";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../../Components/UI/FormInput";
import uni from "../../assets/images/Uni.png";
const EvaluateAssignment = () => {
  const methods = useForm();
  const nav = useNavigate();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <Flex direction="column">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <Flex alignItems="center" justifyContent="space-between" my={6}>
          <Box>
            <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
              Evaluate Assignment
            </Heading>
            <Text color="#546881">Add the required information below</Text>
          </Box>
        </Flex>
        <Box w="100%">
          <Flex align="flex-start">
            <VStack spacing="4" w="40%" mr="8">
              <Image src={uni}></Image>
              <Button colorScheme="blue" w="100%">
                Download
              </Button>
            </VStack>

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
                      />
                    ))}
                  </SimpleGrid>

                  <Box display="flex" justifyContent="flex-end" mt="6">
                    <Button
                      onClick={() => nav("/teacher/editCourse")}
                      variant="outline"
                      colorScheme="gray"
                      mr="4"
                    >
                      Edit
                    </Button>
                    <Button type="submit" colorScheme="blue">
                      Evaluate
                    </Button>
                  </Box>
                </form>
              </FormProvider>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
};

export default EvaluateAssignment;
