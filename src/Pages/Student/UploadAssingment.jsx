import React, { useState, useRef } from "react";
import { Box, Flex, Button, Text, Heading, Input } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";

const UploadAssignments = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Flex direction="column" minH="100vh">
      <Header role={"student"} />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <Flex alignItems={"center"} mt={6} justifyContent={"space-between"}>
          <Box>
            <Heading color="#3D4C5E" fontSize="32px" fontWeight="500">
              Assignment#1
            </Heading>
            <Text color="#546881" mt={2}>
              Due 10 Nov 2024 23:59
            </Text>
          </Box>
          <Box display="flex" gap={8} alignItems={"center"}>
            <Box>
              <Text fontSize={"lg"}>Points</Text>
              <Text color="#546881">0/10</Text>
            </Box>
            <Box>
              <Button colorScheme="blue" type="submit">
                Hands In
              </Button>
            </Box>
          </Box>
        </Flex>

        <Box mt={6}>
          <Flex direction="column" alignItems="flex-start">
            <Box></Box>
            <Text mb={2} fontSize="lg">
              My work:
            </Text>

            <Button colorScheme="blue" onClick={triggerFileInput}>
              Upload Documents
            </Button>

            <Input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              accept=".pdf, .docx, .txt"
              display="none"
            />

            {files.length > 0 && (
              <Box mt={4}>
                <Text fontSize="md"> Selected files:</Text>
                <ul>
                  {files.map((file, index) => (
                    <Text
                      border="1px solid #AACCFF"
                      p={2}
                      borderRadius={"8px"}
                      mt={3}
                      key={index}
                    >
                      {file.name}
                    </Text>
                  ))}
                </ul>
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
};

export default UploadAssignments;
