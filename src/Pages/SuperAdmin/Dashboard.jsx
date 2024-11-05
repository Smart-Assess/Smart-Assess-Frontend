import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import ShowTable from "../../Components/Pages/ShowTable";

const Dashboard = () => {
  

  return (
    <Flex direction="column">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <HeadingButtonSection path="/superadmin/addUniversity" content="Add new University" />
        <ShowTable></ShowTable>
      </Box>
      <Footer />
    </Flex>
  );
};

export default Dashboard;
