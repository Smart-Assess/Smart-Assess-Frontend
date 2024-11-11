import React from "react";
import { Box, Text, Heading, Image } from "@chakra-ui/react";
import Logo from "./../../assets/images/Logo.png"
import UitBackground from "./../../assets/images/Uit.png"; // Replace this with the path to the background image

const UIT = () => {
  return (
    <Box
      p={8}
      minHeight="497px"
      boxShadow="lg"
      borderRadius="15px"
      backgroundImage={`url(${UitBackground})`} // Use the background image with design elements
      backgroundSize="auto"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      display="flex"
      alignItems="center"
      width="100%"
    >
      <Box marginLeft="350px" color="blue.600" maxWidth="50%"> 
        <Image src={Logo} boxSize="50px" color="blue.600" mb={2} />
        <Heading fontSize="32px">
          Usman Institute of <br /> Technology University
        </Heading>
        <Text fontSize="20px" mt={2} color="gray.700">
          Final Year Project
        </Text>
      </Box>
    </Box>
  );
};

export default UIT;
