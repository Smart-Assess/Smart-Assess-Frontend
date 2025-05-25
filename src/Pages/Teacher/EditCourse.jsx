import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import { useNavigate, useParams } from "react-router-dom";
import EditCourseForm from "../../Components/Pages/EditCourseForm";
import { ArrowBackIcon } from "@chakra-ui/icons";

const EditCourse = () => {
  const { courseId } = useParams();
  const [coursecodeId, setCourseCodeId] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coursecodeId).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const nav = useNavigate();

  return (
    <Flex direction="column" minH="100vh">
      <Header />

      <Box flex="1" pb="80px">
        <Box
          w="100%"
          maxW={{ base: "360px", md: "100%" }} // Match Header width on mobile
          mx="auto"
          px={{ base: 4, md: 12 }}
          mb={6}
        >
          <Box mt={6}>
            <IconButton
              aria-label="Go Back"
              icon={<ArrowBackIcon />}
              onClick={() =>
              nav("/teacher/Dashboard")
              }
              mr={4}
            />
          </Box>

          <Flex
            direction={{ base: "column", md: "row" }}
            alignItems={{ base: "flex-start", md: "center" }}
            justifyContent="space-between"
            my={6}
            w="100%"
          >
            <Box mb={{ base: 4, md: 0 }}>
              <Heading
                color="#3D4C5E"
                fontSize={{ base: "24px", md: "28px", lg: "32px" }}
                fontWeight="500"
              >
                Edit Course
              </Heading>
              <Text color="#546881" fontSize={{ base: "sm", md: "md" }}>
                Add the required information below
              </Text>
            </Box>

            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={3}
              width={{ base: "100%", sm: "auto" }}
            >
              <Button
                colorScheme="blue"
                onClick={handleCopy}
                width={{ base: "100%", sm: "auto" }}
              >
                {isCopied ? "Copied!" : "Course Code"}
              </Button>

              <Button
                colorScheme="blue"
                onClick={() => nav(`/teacher/viewAssignments/${courseId}`)}
                width={{ base: "100%", sm: "auto" }}
              >
                View Assignments
              </Button>

              <Button
                colorScheme="blue"
                onClick={() => nav(`/teacher/viewRequest/${courseId}`)}
                width={{ base: "100%", sm: "auto" }}
              >
                View Request
              </Button>

              <Button
                colorScheme="blue"
                onClick={() => nav(`/teacher/createAssignment/${courseId}`)}
                width={{ base: "100%", sm: "auto" }}
              >
                Create Assignment
              </Button>
            </Stack>
          </Flex>

          <EditCourseForm
            setCourseCodeId={setCourseCodeId}
            courseId={courseId}
            showUpload={true}
          />
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
};

export default EditCourse;
