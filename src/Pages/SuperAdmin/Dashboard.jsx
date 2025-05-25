import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import AdminTable from "../../Components/Pages/AdminTable";
import { universityData } from "./../../data/UniversityData";

const Dashboard = () => {
  

  return (
    <Flex direction="column">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <HeadingButtonSection  showBulkAddButton={false} path="/superadmin/addUniversity" headingText="Universities" bodyText="View and Manage Universities" buttonText="Add University" />
        <AdminTable data={universityData}></AdminTable>
      </Box>
      <Footer />
    </Flex>
  );
};

export default Dashboard;
