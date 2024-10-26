import React from "react";

import { Box, Flex, Image, Text } from "@chakra-ui/react";
import logo from "./../../assets/images/Logo.png";
import Profile from "./../../assets/images/Profile.png";

const Header = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      position="sticky"
      top={8}
      zIndex={1}
      alignItems={"center"}
      mx={12}
      p={3}
      mt={8}
      border="1px solid #e0e0e0"
      boxShadow="lg"
      borderRadius="xl"
      bg="white"
    >
      <Box display="flex" alignItems={"center"} gap={4}>
        <Image src={logo} />
        <Text fontSize={"24px"}>
          <span style={{ color: "#0D64C1", fontWeight: "500" }}>Smart</span>{" "}
          <span style={{ color: "#B2BBC6" }}>Assess</span>
        </Text>
      </Box>
      <Box>
        <Image w="52px" h="52px" src={Profile}></Image>
      </Box>
    </Box>
  );
};

export default Header;
