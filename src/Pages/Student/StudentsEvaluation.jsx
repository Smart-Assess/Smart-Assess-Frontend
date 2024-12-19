import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import TableofStudentsEvaluationList from "../../Components/Pages/TableofStudentsEvaluation";

const StudentsEvaluation = () => {
  

  return (
    <Flex direction="column" minH="100vh">
      <Header  />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
      <HeadingButtonSection  path="Assignment#1" showButton={false} showSearchBar={false} />
      <TableofStudentsEvaluationList />
      </Box>
      <Footer />
    </Flex>
  );
};

export default StudentsEvaluation;
