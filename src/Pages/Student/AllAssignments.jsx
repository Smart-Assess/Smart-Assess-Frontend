import React from "react";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import { assignments } from "../../data/AssignmentsListData";
import Math from "./../../assets/images/Math.png";
import { useNavigate } from "react-router-dom";

const AllAssignments = () => {
  const nav = useNavigate();
  return (
    <Flex direction="column" minH="100vh">
      <Header role={'student'} />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <HeadingButtonSection
          path="Assignments"
          content="View Assignments"
          showButton={false}
          showSearchBar={false}
        />
        <Grid py={4} gap={4}>
          {assignments.map((assignment) => (
            <Flex
              cursor={"pointer"}
              onClick={() => nav("/student/uploadAssingment")}
              key={assignment.id}
              gap={4}
              align="start"
              border="1px solid "
              borderColor="gray.300"
              borderRadius="md"
              p={4}
              shadow="sm"
            >
              <Box>
                <Image src={Math} alt="Assignment Image" />
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  {assignment.title}
                </Text>
                <Text>Due at {assignment.dueTime}</Text>
                <Text>{assignment.course}</Text>
              </Box>
            </Flex>
          ))}
        </Grid>
      </Box>
      <Footer />
    </Flex>
  );
};

export default AllAssignments;
