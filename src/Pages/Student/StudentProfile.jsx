import React from "react";
import { Box, Flex, Divider } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import EditButtonSection from "../../Components/Pages/EditButtonSection";
import Profile from "./../../assets/images/Profile.png";

const StudentProfile = () => {

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
     <EditButtonSection image={Profile} heading={"Muhammad Rayyan"} showIcon={false} showDeleteButton={false} buttonText={"Change Password"}/>
     {/* Divider line with customized thickness and width */}
     <Divider borderColor="#3D4C5E" borderWidth="1px" width="100%" marginY={4} />

      </Box>
      
      <Footer />
    </Flex>
  );
};

export default StudentProfile;
