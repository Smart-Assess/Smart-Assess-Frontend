import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import TableofAssignmentsList from "../../Components/Pages/TableofAssignmentsList";
import axios from "axios";
import { useParams } from "react-router-dom";

const Reesults = () => {
  const [resultData, setResultData] = useState([]);
  const { assignment_id } = useParams();

  console.log(assignment_id);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get(
        `http://127.0.0.1:8000/student/assignment/${assignment_id}/result`,
        config
      );

      if (response.status === 200) {
        setResultData(response.data.result);
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(resultData);
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <HeadingButtonSection
          path="Results"
          content="Marketing"
          showButton={false}
        />

        <TableContainer
          mb={12}
          height="100%"
          width={"100%"}
          border="1px solid #e0e0e0"
          boxShadow="lg"
          borderRadius="xl"
        >
          {loading ? (
            <Flex height="300px" justifyContent="center" alignItems="center">
              <Spinner
                size="lg"
                thickness="4px"
                speed="0.65s"
                color="blue.500"
              />
            </Flex>
          ) : (
            <>
              <Table variant="simple">
                <Thead backgroundColor={"#EAEEF0"}>
                  <Tr>
                    <Th>Question</Th>
                    <Th>Score</Th>
                    <Th>Context Score</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {resultData?.questions?.map((assignment, index) => (
                    <Tr key={index}>
                      <Td>{assignment.question_number}</Td>
                      <Td>{assignment.score}</Td>



                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Flex px={6} py={2} pb={6} justifyContent={"space-between"}>
                <Button mt={4} onClick={() => alert("Previous Page")} mr={2}>
                  Previous
                </Button>
                <Button mt={4} onClick={() => alert("Next Page")}>
                  Next
                </Button>
              </Flex>
            </>
          )}
        </TableContainer>
      </Box>
      <Footer />
    </Flex>
  );
};

export default Reesults;
