import React, { useState } from "react";
import { Box, Heading, Button, Flex, Image, Skeleton, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { FaUniversity } from "react-icons/fa"; // Import an icon for placeholder

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
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Box my={6}>
      <Flex alignItems="center" justifyContent="space-between" my={6}>
        <Flex alignItems="center" gap="4">
          {image ? (
            <Skeleton isLoaded={imageLoaded} boxSize="180px" borderRadius="full">
              <Image
                src={image}
                alt="University Logo"
                boxSize="180px"
                borderRadius="full"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)} // Ensures fallback in case of an error
              />
            </Skeleton>
          ) : (
            <Flex
              boxSize="180px"
              borderRadius="full"
              bg="gray.200"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FaUniversity} boxSize="80px" color="gray.500" />
            </Flex>
          )}
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
              leftIcon={showIcon ? <AddIcon /> : null}
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
