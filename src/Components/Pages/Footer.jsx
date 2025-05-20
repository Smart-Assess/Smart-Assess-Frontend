import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import logo from "./../../assets/images/Logo.png";

const Footer = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={{ base: 6, lg: 12 }}
      py={4}
      position="fixed"
      bottom={0}
      left={0}
      width="100%"
      border="1px solid #e0e0e0"
      boxShadow="lg"
      bg="white"
      zIndex={1}
    >
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        gap={4}
        width={"100%"}
      >
        <Box display="flex" alignItems={"center"} gap={4}>
          <Image src={logo} />
          <Text fontSize={"24px"}>
            <span style={{ color: "#0D64C1", fontWeight: "500" }}>Smart</span>{" "}
            <span style={{ color: "#B2BBC6" }}>Assess</span>
          </Text>
        </Box>

        <Box display={"flex"} gap={2} marginLeft={"auto"}>
          <Text fontSize={"14px"} fontWeight={"450"} color="#555555">
            Terms of Service
          </Text>
          <Text fontSize={"14px"} fontWeight={"450"} color="#555555">
            Privacy Policy
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
