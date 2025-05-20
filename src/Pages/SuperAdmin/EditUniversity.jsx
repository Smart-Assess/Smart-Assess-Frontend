import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Divider } from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import EditButtonSection from "../../Components/Pages/EditButtonSection";
import Uni from "./../../assets/images/Uni.png";
import EditUniversityForm from "../../Components/Pages/EditUniversityForm";
import { useParams } from "react-router-dom";

const EditUniversity = () => {
  const { id } = useParams();

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [university, setUniversity] = useState({});
  const fetchUniversity = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://134.209.110.162:8000/superadmin/university/${id}`,
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
      setUniversity(data || []);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversity();
  }, []);

  return (
    <Flex direction="column">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <Flex alignItems="center" justifyContent="space-between" my={6}></Flex>
        <EditButtonSection
          image={university?.university?.image_url}
          heading={university?.university?.name}
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
          University Information
        </Heading>

        <EditUniversityForm
          university={university}
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

export default EditUniversity;
