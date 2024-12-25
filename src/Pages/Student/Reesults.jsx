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
  Text,
  Badge,
} from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import TableofAssignmentsList from "../../Components/Pages/TableofAssignmentsList";
import axios from "axios";
import { useParams } from "react-router-dom";
import { studentData } from "../../data/studentsData";

const Reesults = () => {
  const [resultData, setResultData] = useState([]);
  const { assignment_id } = useParams();

  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get(
        `http://127.0.0.1:8000/student/assignment/${assignment_id}/result`,
        config
      );

      console.log(response);

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

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" mx={12} overflowY="auto" paddingBottom="80px">
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <HeadingButtonSection
              path="Results"
              content="Marketing"
              showButton={false}
            />
          </Box>

          <Box mt={"12px"}>
            <Badge color="white" bg="blue.500">
              Total Score {resultData.total_score}
            </Badge>
          </Box>
        </Flex>

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
                    <Th>Student Answer</Th>
                    <Th>Context Score</Th>
                    <Th>Grammar Score</Th>
                    <Th>Plagirism Score</Th>

                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {resultData?.questions?.map((assignment, index) => (
                    <Tr key={index}>
                      <Td
                        isTruncated
                        maxW="300px"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                      >
                        Q#{assignment.question_number}{" "}
                        {assignment.question_text}
                      </Td>

                      <Td
                        onClick={() => toggleExpand(index)}
                        maxW="300px"
                        overflow="hidden"
                        whiteSpace={
                          expandedIndex === index ? "normal" : "nowrap"
                        }
                        textOverflow="ellipsis"
                        cursor="pointer"
                        title={assignment.student_answer}
                      >
                        {assignment.student_answer}
                      </Td>
                      <Td>{assignment.context_score}</Td>
                      <Td>{assignment.grammar_score}</Td>
                      <Td>{assignment.plagiarism_score}</Td>
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
