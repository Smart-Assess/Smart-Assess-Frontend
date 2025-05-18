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
  showSearchBar = true,
  showIcon = true,
  showBulkAddButton = true, // New prop to control Bulk Add button visibility
  onBulkAddClick, // Callback for Bulk Add button
}) => {
  const nav = useNavigate();

  return (
    <Box my={6}>
      <Flex alignItems="center" gap={4} justifyContent="space-between" flexWrap={'wrap'} my={6}>
        <Box>
          <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
            {headingText}
          </Heading>
          <Text color="#546881">{bodyText}</Text>
        </Box>
        <Flex gap={4} flexWrap={'wrap'}>
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
          {showBulkAddButton && (
            <Button
              bg="#0D64C1"
              color="white"
              _hover={{ bg: "#0D64C8" }}
              onClick={onBulkAddClick} // Trigger the callback when clicked
            >
              Bulk Add {headingText}s
            </Button>
          )}
        </Flex>
      </Flex>
      {showSearchBar && (
        <Flex>{/* Add SearchBar or other content here */}</Flex>
      )}
    </Box>
  );
};

export default HeadingButtonSection;
