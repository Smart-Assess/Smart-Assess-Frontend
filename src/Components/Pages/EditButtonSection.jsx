// UniversitySection.js
import React from "react";
import { Box, Heading, Button, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Uni from "./../../assets/images/Uni.png";


const EditButtonSection = ({path}) => {
  const nav = useNavigate();

  return (
    <Box my={6}>
      <Flex alignItems="center" justifyContent="space-between" my={6}>
        <Flex alignItems="center" gap="4">
          <Image
            src={Uni}
            alt="University Logo"
            boxSize="180px" // Adjust size as needed
            borderRadius="full"
          />
          <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
            International University
          </Heading>
        </Flex>
        <Flex gap="4">
          
          <Button
            color="white"
            fontWeight="500"
            px="8"
            py="4"
            onClick={() => nav(path)}
            bg="#E53E3E"
            _hover={{ bg: "#C53030" }}
            
          >
            Delete
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default EditButtonSection;
