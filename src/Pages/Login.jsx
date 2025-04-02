import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "./../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const urlEncodedData = new URLSearchParams({
        grant_type: "password",
        username: data.email,
        password: data.password,
        scope: "",
        client_id: "",
        client_secret: "",
      }).toString();

      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncodedData,
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", result.access_token);
        localStorage.setItem("role", result.user.role);

        if (result.user.role === "superadmin") {
          navigate("/superadmin/dashboard");
        } else if (result.user.role === "student") {
          navigate("/student/Dashboard");
        } else if (result.user.role === "universityadmin") {
          navigate("/university/student/Dashboard");
        } else if (result.user.role === "teacher") {
          navigate("/teacher/Dashboard");
        }
        localStorage.setItem("name", result?.user?.name);

      } else {
        if (result.detail) {
          setError("email", {
            type: "manual",
            message: result.detail,
          });
          setError("password", {
            type: "manual",
            message: result.detail,
          });
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Flex
        p={{ base: 4, md: 8 }}
        gap={4}
        alignItems="center"
        justifyContent={{ base: "center", md: "flex-start" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Image src={logo} />
        <Text fontSize={{ base: "20px", md: "24px" }} textAlign="center">
          <span style={{ color: "#0D64C1" }}>Smart</span>{" "}
          <span style={{ color: "#B2BBC6" }}>Assess</span>
        </Text>
      </Flex>

      <Box
        width={{ base: "90%", sm: "80%", md: "500px" }}
        mx="auto"
        mt={{ base: "40px", md: "60px" }}
        p={{ base: 4, md: 0 }}
      >
        <Heading
          fontSize={{ base: "28px", md: "32px" }}
          color="#3D4C5E"
          textAlign="center"
          mb="4"
          fontWeight="500"
        >
          Welcome Back!!
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password} mt="4">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            mt="6"
            colorScheme="blue"
            type="submit"
            width="full"
            isLoading={loading}
          >
            Login
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Login;
