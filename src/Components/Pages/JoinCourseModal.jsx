import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const JoinCourseModal = ({ isOpen, onClose,setCourseCode,courseCode}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    if (!courseCode.trim()) {
      setError("Course code is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = new FormData();
      formData.append("course_code", courseCode);

      const response = await axios.post(
        "https://smartassess-backend-t3l93.ondigitalocean.app/student/course/join",
        formData,
        config
      );

      if (response.status === 200) {
        onClose();
      }
    } catch (err) {
      if (err.response) {
        console.error("Error Response Data:", err.response.data);
        if (err.response.status === 404) {
          setError("Course not found.");
        } else if (err.response.status === 403) {
          setError("You can only join courses from your university.");
        } else if (err.response.status === 400) {
          setError(err.response.data.detail || "Invalid request.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        console.error("Error:", err.message);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join a Course</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Enter Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
          {error && (
            <Text color="red.500" mt={2}>
              {error}
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            isLoading={loading}
            onClick={onSubmit}
          >
            Request
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinCourseModal;
