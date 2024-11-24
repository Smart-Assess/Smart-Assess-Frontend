import React from "react";
import { Box, Flex, Heading} from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import CoursesGrid from "../../Components/Pages/CoursesGrid";
import UIT from "../../Components/Pages/UIT";

const StudentsDashboard = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px" marginTop="40px">
      {/* Welcome Message */}
      <Heading fontSize="2xl" mb={4}>
          Welcome Back, Ahsan <span role="img" aria-label="wave">👋</span>
        </Heading>

        <CoursesGrid />
        <UIT />
      </Box>
      <Footer />
    </Flex>
  );
};

export default StudentsDashboard;
