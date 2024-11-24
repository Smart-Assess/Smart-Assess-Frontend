import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import TeacherForm from "../../Components/Pages/TeacherForm";

const AddTeacher = () => {
  return (
    <Flex direction="column">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <Flex alignItems="center" justifyContent="space-between" my={6}>
          <Box>
            <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
              Add Teacher
            </Heading>
            <Text color="#546881">Add the required information below</Text>
          </Box>
        </Flex>

        <TeacherForm show={true} />
      </Box>
      <Footer />
    </Flex>
  );
};

export default AddTeacher;
