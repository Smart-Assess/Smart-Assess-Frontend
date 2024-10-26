// UniversitySection.js
import React from "react";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import SearchBar from "../../Components/UI/SearchBar";

const HeadingButtonSection = () => {
  return (
    <Box my={6}>
      <Flex alignItems="center" justifyContent="space-between" my={6}>
        <Box>
          <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
            Universities
          </Heading>
          <Text color="#546881">View and Manage students here</Text>
        </Box>
        <Button color="white" bg="#0D64C1" leftIcon={<AddIcon />}>
          Add New University
        </Button>
      </Flex>
      <Flex>
        <SearchBar />
      </Flex>
    </Box>
  );
};

export default HeadingButtonSection;
