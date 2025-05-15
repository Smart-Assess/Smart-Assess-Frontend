import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useToast,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FiUploadCloud } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import * as XLSX from "xlsx"; // Library for Excel file parsing
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import { studentData } from "../../data/studentsData";
import { teacherData } from "../../data/TeacherData";
import StudentTable from "../../Components/Pages/StudentTable";
import TeacherTable from "../../Components/Pages/TeacherTable";
import axios from "axios"; // For API requests

const Dashboard = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const toast = useToast();

  // Manage active tab
  const [activeTab, setActiveTab] = useState(type === "teacher" ? 1 : 0);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state
  const [file, setFile] = useState(null); // State to store the uploaded file
  const [loading, setLoading] = useState(false); // State to manage spinner

  useEffect(() => {
    setActiveTab(type === "teacher" ? 1 : 0);
  }, [type]);

  const isStudentPage = activeTab === 0;
  const data = isStudentPage ? studentData : teacherData;
  const headingText = isStudentPage ? "Student" : "Teacher";
  const bodyText = isStudentPage
    ? "View and Manage students here"
    : "View and Manage teachers here";
  const buttonPath = isStudentPage
    ? "/university/addStudent"
    : "/university/addTeacher";

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Validate file size (limit to 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast({
        title: "File Too Large",
        description: "File size exceeds the 5MB limit.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validate file type
    const validExtensions = [".xlsx", ".xls", ".csv"];
    const fileExtension = selectedFile.name
      .toLowerCase()
      .substring(selectedFile.name.lastIndexOf("."));
    if (!validExtensions.includes(fileExtension)) {
      toast({
        title: "Invalid File Type",
        description: "Only .xlsx, .xls, and .csv files are supported.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const token = localStorage.getItem("accessToken"); // Retrieve the token
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true); // Start spinner

    try {
      const baseURL = "http://127.0.0.1:8000"; // Set the base URL here
      const endpoint = isStudentPage
        ? `${baseURL}/universityadmin/students/bulk-import`
        : `${baseURL}/universityadmin/teachers/bulk-import`;

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });

      toast({
        title: "Upload Successful",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Close the modal and reset the file input
      onClose();
      setFile(null);
    } catch (error) {
      if (error.response) {
        const { detail, errors } = error.response.data;

        // Show the main error message
        if (detail) {
          toast({
            title: "Upload Failed",
            description: detail,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }

        // Show individual row errors if available
        if (errors && Array.isArray(errors)) {
          errors.forEach((err) => {
            toast({
              title: `Error in Row ${err.row}`,
              description: `${err.email ? `Email: ${err.email} - ` : ""}${
                err.error
              }`,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
        }
      } else {
        // Handle other errors (e.g., network issues)
        toast({
          title: "Upload Failed",
          description: "An unexpected error occurred. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <Flex direction="column">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" mt={8}>
        {/* Tabs for Navigation */}
        <Tabs
          variant="soft-rounded"
          colorScheme="blue"
          index={activeTab}
          onChange={(index) => {
            setActiveTab(index);
            navigate(
              index === 0
                ? "/university/student/Dashboard"
                : "/university/teacher/Dashboard"
            );
          }}
        >
          <TabList>
            <Tab>Students</Tab>
            <Tab>Teachers</Tab>
          </TabList>
        </Tabs>

        <HeadingButtonSection
          path={buttonPath}
          headingText={headingText}
          bodyText={bodyText}
          buttonText={`Add ${headingText}`}
          onBulkAddClick={onOpen} // Open modal on Bulk Add click
        />

        {isStudentPage ? (
          <StudentTable data={data} />
        ) : (
          <TeacherTable data={data} />
        )}
      </Box>
      <Footer />

      {/* Modal for Bulk Add */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bulk Add {headingText}s</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              border="2px dashed"
              borderColor="gray.300"
              borderRadius="md"
              p={6}
              textAlign="center"
              cursor="pointer"
              _hover={{ borderColor: "blue.500" }}
            >
              <Icon as={FiUploadCloud} boxSize={12} color="gray.400" />
              <Text mt={4} fontSize="lg" color="gray.600">
                Drag and drop your file here, or click to select a file
              </Text>
              <Input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileChange}
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                opacity="0"
                cursor="pointer"
              />
            </Box>
            {file && (
              <Text mt={4} fontSize="md" color="green.600">
                Selected File: {file.name}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={loading}
              onClick={handleFileUpload}
            >
              Upload
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Dashboard;
