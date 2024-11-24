import React from "react";
import { Box, Flex, Heading, Divider } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import EditButtonSection from "../../Components/Pages/EditButtonSection";
import AddUniversityForm from "../../Components/Pages/AddUniversityForm";
import Uni from "./../../assets/images/Uni.png";
import StudentForm from "../../Components/Pages/StudentForm";

const EditStudent = () => {
  return (
    <Flex direction="column">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <Flex alignItems="center" justifyContent="space-between" my={6}></Flex>
        <EditButtonSection
          image={Uni}
          heading={"Ahsan Sajid"}
          showAddButton={false}
        />

        <Divider
          borderColor="#3D4C5E"
          borderWidth="1px"
          width="100%"
          marginY={4}
        />

        <Heading
          color="#3D4C5E"
          fontSize="24px"
          fontWeight="500"
          paddingBottom="20px"
        >
          Student Information
        </Heading>

        <StudentForm show={false} />
      </Box>
      <Footer />
    </Flex>
  );
};

export default EditStudent;
