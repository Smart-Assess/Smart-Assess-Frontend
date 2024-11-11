import React from "react";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import SearchBar from "../../Components/UI/SearchBar";
import { useNavigate } from "react-router-dom";

const HeadingButtonSection = ({ path, headingText,bodyText,buttonText, showButton = true, showSearchBar = true, showIcon = true}) => {
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
        {showButton && (
  <Button
    color="white"
    onClick={() => nav(path)}
    bg="#0D64C1"
    _hover={{ bg: "#0D64C8" }}
    leftIcon={showIcon ? <AddIcon /> : null} // Conditionally render the icon
  >
    {buttonText}
  </Button>
)}

      </Flex>
      {showSearchBar && (
        <Flex>
          <SearchBar />
        </Flex>
      )}
    </Box>
  );
};

export default HeadingButtonSection;
