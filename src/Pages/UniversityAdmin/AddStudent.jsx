import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import StudentForm from "../../Components/Pages/StudentForm";

const AddStudent = () => {
  return (
    <Flex direction="column">
      <Header />
      <Box mb={6} flex="1" mx={{base:6,lg:12}} overflowY="auto" paddingBottom="80px">
        <Flex alignItems="center" justifyContent="space-between" my={6}>
          <Box>
            <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
              Add Student
            </Heading>
            <Text color="#546881">Add the required information below</Text>
          </Box>
        </Flex>

        <StudentForm show={true} />
      </Box>
      <Footer />
    </Flex>
  );
};

export default AddStudent;
