import React from 'react';
import { Box, Flex, Heading, Text, Divider } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import EditButtonSection from "../../Components/Pages/EditButtonSection";
import EditUniversityForm from '../../Components/Pages/EditUniversityForm';

const EditUniversity = () => {
  return (
    <Flex direction="column">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <Flex alignItems="center" justifyContent="space-between" my={6}>
          {/* <Box>
            <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
              Add University
            </Heading>
            <Text color="#546881">Add the required information below</Text>
          </Box> */}
        </Flex>
        <EditButtonSection />
        
        {/* Divider line with customized thickness and width */}
        <Divider borderColor="#3D4C5E" borderWidth="1px" width="100%" marginY={4} />

        <Heading color="#3D4C5E" fontSize="24px" fontWeight="500" paddingBottom="20px">
          University Information
        </Heading>
        
        <EditUniversityForm />
      </Box>
      <Footer />
    </Flex>
  );
}

export default EditUniversity;
