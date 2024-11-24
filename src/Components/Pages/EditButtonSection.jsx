// UniversitySection.js
import React from "react";
import { Box, Heading, Button, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

const EditButtonSection = ({
  heading,
  pathAdd,
  pathDelete,
  showAddButton = true,
  showDeleteButton = true,
  showIcon = true,
  buttonText,
  image,
}) => {
  const nav = useNavigate();

  return (
    <Box my={6}>
      <Flex alignItems="center" justifyContent="space-between" my={6}>
        <Flex alignItems="center" gap="4">
          <Image
            src={image}
            alt="University Logo"
            boxSize="180px" // Adjust size as needed
            borderRadius="full"
          />
          <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
            {heading}
          </Heading>
        </Flex>
        <Flex gap="4">
          {showAddButton && (
            <Button
              color="white"
              onClick={() => nav(pathAdd)}
              bg="#0D64C1"
              _hover={{ bg: "#0D64C8" }}
              leftIcon={showIcon ? <AddIcon /> : null} // Conditionally render the icon
            >
              {buttonText}
            </Button>
          )}

          {showDeleteButton && (
            <Button
              color="white"
              fontWeight="500"
              px="8"
              py="4"
              onClick={() => nav(pathDelete)}
              bg="#E53E3E"
              _hover={{ bg: "#C53030" }}
            >
              Delete
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default EditButtonSection;
