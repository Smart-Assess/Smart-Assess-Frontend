import React from "react";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const HeadingButtonSection = ({
  path,
  bodyText,
  buttonText,
  headingText,
  showButton = true,
  onBulkAddClick, // New prop for Bulk Add button
  showSearchBar = true,
  showIcon = true,
}) => {
  const nav = useNavigate();

  return (
    <Box my={6}>
      <Flex alignItems="center" justifyContent="space-between" my={6}>
        <Box>
          <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
            {headingText}
          </Heading>
          <Text color="#546881">{bodyText}</Text>
        </Box>
        <Flex gap={4}>
          {showButton && (
            <Button
              color="white"
              onClick={() => nav(path)}
              bg="#0D64C1"
              _hover={{ bg: "#0D64C8" }}
              leftIcon={showIcon ? <AddIcon /> : null}
            >
              {buttonText}
            </Button>
          )}
          <Button
            color="white"
            onClick={onBulkAddClick} // Trigger the modal
            bg="#0D64C1"
            _hover={{ bg: "#0D64C8" }}
          >
            Bulk Add
          </Button>
        </Flex>
      </Flex>
      {showSearchBar && (
        <Flex>
          {/* Add SearchBar or other content here */}
        </Flex>
      )}
    </Box>
  );
};

export default HeadingButtonSection;