import React from "react";
import { Box, Text, Grid, GridItem, Image, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Math from"./../../assets/images/Math.png";
import Eng from"./../../assets/images/Eng.png";
import Arrow from"./../../assets/images/Arrow.png";

const CoursesGrid = () => {
  const nav = useNavigate();

  const courses = [
    { name: "Marketing", path: "/marketing", icon: Math },
    { name: "English", path: "/english", icon: Math },
    { name: "Pak-Studies", path: "/pak-studies", icon: Eng },
    { name: "Oral Communication", path: "/oral-communication", icon: Eng },
    { name: "E-commerce", path: "/ecommerce", icon: Math },
    // Add more courses with unique icons as needed
  ];

  return (
    <Box my={6}>
      <Flex alignItems="center" justifyContent="space-between" my={6}>
        <Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={8} mb={8}>
            {courses.map((course, index) => (
              <GridItem
                key={index}
                p={6}
                minWidth="580px"
                minHeight="180px"
                bg="blue.50"
                borderRadius="15px"
                boxShadow="lg"
                cursor="pointer"
                position="relative"  // Enable absolute positioning for children
                onClick={() => nav(course.path)}
              >
                <Flex justify="space-between">
                  {/* Left Image at Top */}
                  <Image
                    src={course.icon}
                    padding={1}
                    bg="white"
                    borderRadius="full"
                    boxSize={14}
                    alt={`${course.name} icon`}
                  />
                  
                  {/* Right Icon at Top (Optional - You could also add another image here) */}
                  <Image
                    src={Arrow}  // Optional second icon
                    padding={1}
                    bg="white"
                    borderRadius="full"
                    boxSize={14}
                    alt="Forward Arrow"
                  />
                </Flex>
                
                {/* Course Name at Bottom Left */}
                <Text
                  marginLeft={4}
                  fontSize="25px"
                  fontWeight="bold"
                  position="absolute"
                  bottom={4}
                  left={4}
                >
                  {course.name}
                </Text>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
};

export default CoursesGrid;
