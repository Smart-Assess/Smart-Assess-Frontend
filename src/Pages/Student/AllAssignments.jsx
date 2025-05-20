import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  Image,
  Text,
  Spinner,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Header from "../../Components/Pages/Header";
import Footer from "../../Components/Pages/Footer";
import HeadingButtonSection from "../../Components/Pages/HeadingButtonSection";
import { useNavigate, useParams } from "react-router-dom";
import Math from "./../../assets/images/Math.png";

const AllAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { course_id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!course_id) throw new Error("Invalid Course ID.");

        const response = await fetch(
          `https://134.209.110.162:8000/student/course/${course_id}/assignments`,
          {
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.success) {
          setAssignments(data.assignments || []);
        } else {
          throw new Error("Failed to fetch assignments.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch assignments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [course_id]);

  const submittedAssignments = assignments.filter(
    (assignment) => assignment.submission && assignment.submission.id
  );
  const upcomingAssignments = assignments.filter(
    (assignment) => !assignment.submission || !assignment.submission.id
  );

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box
        flex="1"
        mx={{ base: 6, lg: 12 }}
        overflowY="auto"
        paddingBottom="80px"
      >
        <HeadingButtonSection
          path="Assignments"
          content="View Assignments"
          showButton={false}
          showSearchBar={false}
        />

        {loading ? (
          <Flex justify="center" align="center" height="100%">
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : error ? (
          <Text color="red.500" fontSize="lg">
            {error}
          </Text>
        ) : (
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Forthcoming</Tab>
              <Tab>Submitted</Tab>
            </TabList>
            <TabPanels >
              {/* Upcoming Assignments */}
              <TabPanel px={0}>
                {upcomingAssignments.length === 0 ? (
                  <Text fontSize="lg" color="gray.500">
                    No upcoming assignments.
                  </Text>
                ) : (
                  <Grid py={4} gap={4}>
                    {upcomingAssignments.map((assignment) => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        course_id={course_id}
                        nav={nav}
                      />
                    ))}
                  </Grid>
                )}
              </TabPanel>
              {/* Submitted Assignments */}
              <TabPanel px={0}>
                {submittedAssignments.length === 0 ? (
                  <Text fontSize="lg" color="gray.500">
                    No submitted assignments.
                  </Text>
                ) : (
                  <Grid py={4} gap={4}>
                    {submittedAssignments.map((assignment) => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        course_id={course_id}
                        nav={nav}
                      />
                    ))}
                  </Grid>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Box>
      <Footer />
    </Flex>
  );
};

const AssignmentCard = ({ assignment, course_id, nav }) => (
  <Flex
    cursor={"pointer"}
    onClick={() =>
      nav(`/student/uploadAssignment/${assignment.id}/${course_id}`)
    }
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
        {assignment?.name?.charAt(0).toUpperCase() + assignment?.name?.slice(1)}{" "}
      </Text>
      <Badge
        borderRadius={"4px"}
        px={2}
        py={1}
        bg="#3182CE"
        color="white"
        mt={2}
      >
        Due: {assignment.deadline}
      </Badge>
      <Text>Grade: {assignment.grade}</Text>
      {assignment.submission && assignment.submission.pdf_url && (
        <Text color="blue.500" fontSize="sm">
          <a
            href={assignment.submission.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Submission
          </a>
        </Text>
      )}
    </Box>
  </Flex>
);

export default AllAssignments;
