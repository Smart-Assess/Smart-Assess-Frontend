import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UpdateTeacherModal = ({ isOpen, onClose, fetchTeacher }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  // Fetch teacher profile and set form values
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          "https://smartassess-backend-t3l93.ondigitalocean.app/teacher/profile",
          {
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Error fetching teacher");
        const data = await response.json();
        setValue("full_name", data?.teacher?.full_name || "");
        setValue("email", data?.teacher?.email || "");
        setValue("password", "");
      } catch (err) {
        console.error("Fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    if (isOpen) {
      fetchTeacher();
    }
  }, [isOpen, setValue]);

  const [updateLoading, setupdateLaoding] = useState(false);

  const toast = useToast();
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("full_name", data.full_name);
    formData.append("email", data.email);
    if (data.password && data.password.trim() !== "") {
      formData.append("password", data.password);
    }

    setupdateLaoding(true);
    try {
      const token = localStorage.getItem("accessToken");

      const config = {
        headers: {
          // Do NOT set Content-Type here!
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        "https://smartassess-backend-t3l93.ondigitalocean.app/teacher/profile",
        formData,
        config
      );

      if (response.status === 200) {
        toast({
          title: "Profile updated.",
          description: "Your profile has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        reset();
        fetchTeacher(); // Refresh the teacher data
      }
    } catch (err) {
      console.error("Update error:", err.message);
      toast({
        title: "Update failed.",
        description: "There was an error updating your profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setupdateLaoding(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Profile</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl mb={3} isInvalid={!!errors.full_name}>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Enter your name"
                {...register("full_name", {
                  required: "Full name is required",
                })}
                isDisabled={loading}
              />
              <FormErrorMessage>
                {errors.full_name && errors.full_name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mb={3} isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                isDisabled={loading}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>
                New Password{" "}
                <span style={{ color: "#888", fontSize: "0.9em" }}>
                  (optional)
                </span>
              </FormLabel>
              <Input
                placeholder="Enter your Password"
                type="password"
                {...register("password")}
                isDisabled={loading}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => {
                onClose();
                reset();
              }}
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={updateLoading}
              type="submit"
            >
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTeacherModal;
