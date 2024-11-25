import React from "react";
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
} from "@chakra-ui/react";

const JoinCourseModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join a Course</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="Enter Course Code" />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Request
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinCourseModal;
