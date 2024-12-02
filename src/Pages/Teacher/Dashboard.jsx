import React from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const nav = useNavigate();
  return (
    <Flex direction="column" height="100vh">
      <Header />

      <Flex flex="1" mx={12} my={6}>
        <Box
          h="fit-content"
          w="20%"
          bg="white"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          boxShadow="md"
        >
          <VStack align="stretch" spacing={4}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Batch 21B-SE
              </MenuButton>
              <MenuList>
                <MenuItem>Section A</MenuItem>
                <MenuItem>Section B</MenuItem>
                <MenuItem>Section C</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Batch 22B-CS
              </MenuButton>
              <MenuList>
                <MenuItem>Section A</MenuItem>
                <MenuItem>Section B</MenuItem>
              </MenuList>
            </Menu>
          </VStack>
        </Box>

        <Box flex="1" ml={8}>
          <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Heading fontSize="2xl">Welcome Back Oliver! 👋</Heading>
              <Text mt={1} color="gray.600">
                Track and Manage all your activities in one place
              </Text>
            </Box>
            <Button
              colorScheme="blue"
              onClick={() => nav("/teacher/addCourse")}
            >
              + Add New Course
            </Button>
          </Flex>

          <Box mb={4}>
            <Input placeholder="Search" size="lg" />
          </Box>

          <Box
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            overflowX="auto"
          >
            <Table variant="simple" cursor={'pointer'} onClick={()=>nav('/teacher/editCourse')}>
              <Thead bg="gray.100">
                <Tr>
                  <Th>Subject Name</Th>
                  <Th>Group</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Algebra</Td>
                  <Td>Science</Td>
                </Tr>
                <Tr>
                  <Td>World History</Td>
                  <Td>Arts</Td>
                </Tr>
                <Tr>
                  <Td>Physics</Td>
                  <Td>Economics</Td>
                </Tr>
                <Tr>
                  <Td>Chemistry</Td>
                  <Td>Science</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>

          <Flex py={2} pb={6} justifyContent={"space-between"}>
            <Button mt={4} onClick={() => alert("Previous Page")} mr={2}>
              Previous
            </Button>
            <Button mt={4} onClick={() => alert("Next Page")}>
              Next
            </Button>
          </Flex>
        </Box>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default Dashboard;
