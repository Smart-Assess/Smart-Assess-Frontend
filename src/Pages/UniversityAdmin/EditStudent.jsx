import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Divider, Spinner, Center } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import EditButtonSection from "../../Components/Pages/EditButtonSection";

import { useParams } from "react-router-dom";
import EditStudentForm from "../../Components/Pages/EditStudentForm";

const EditStudent = () => {
  const { id } = useParams();

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState({});
  console.log(student);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://smartassess-backend-t3l93.ondigitalocean.app/universityadmin/student/${id}`,

        {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching universities");
      }

      const data = await response.json();
      setStudent(data?.student || []);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <Flex direction="column">
      <Header />
      <Box flex="1" mx={{base:6,lg:12}} overflowY="auto" paddingBottom="80px">
        <Flex alignItems="center" justifyContent="space-between" my={6}></Flex>
        <EditButtonSection
          image={student?.image_url}
          heading={student?.full_name}
          showDeleteButton={false}
          showAddButton={false}
        />

        <Divider
          borderColor="#3D4C5E"
          borderWidth="1px"
          width="100%"
          marginY={4}
        />

        <Heading
          color="#3D4C5E"
          fontSize="24px"
          fontWeight="500"
          paddingBottom="20px"
        >
          Student Information
        </Heading>

        <EditStudentForm
          student={student}
          file={file}
          setFile={setFile}
          fileName={fileName}
          setFileName={setFileName}
          showUpload={false}
        />
      </Box>
      <Footer />
    </Flex>
  );
};

export default EditStudent;
