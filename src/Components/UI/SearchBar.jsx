import React from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  return (
    <Box width="100%" maxWidth="300px">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} color="gray.400" />
        </InputLeftElement>
        <Input
          borderColor="gray.400" // Border for visibility
          type="text"
          placeholder="Search..."
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
