import React, { useState } from "react";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import CoursesGrid from "../../Components/Pages/CoursesGrid";
import UIT from "../../Components/Pages/UIT";
import JoinCourseModal from "../../Components/Pages/JoinCourseModal";

const StudentsDashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [courseCode, setCourseCode] = useState("");

  const handleOpenModal = () => {
    setCourseCode("");
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  return (
    <Flex direction="column" minH="100vh">
      <Header role={"student"} />
      <Box
        flex="1"
        mx={12}
        overflowY="auto"
        paddingBottom="80px"
        marginTop="40px"
      >
        <Flex justifyContent={"space-between"}>
          <Heading fontSize="2xl" mb={4}>
            Welcome Back, Ahsan{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </Heading>
          <Button colorScheme="blue" onClick={handleOpenModal}>
            Join Course
          </Button>
        </Flex>

        <CoursesGrid />
        <UIT />
      </Box>
      <Footer />

      <JoinCourseModal
        courseCode={courseCode}
        setCourseCode={setCourseCode}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Flex>
  );
};

export default StudentsDashboard;
