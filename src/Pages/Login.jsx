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
import React from "react";
import { useForm } from "react-hook-form";
import logo from "./../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const nav=useNavigate()
  
  return (
    <>
      <Flex p={8} gap={4} alignItems={"center"}>
        <Image src={logo} />
        <Text fontSize={"24px"}>
          <span style={{ color: "#0D64C1" }}>Smart</span>{" "}
          <span style={{ color: "#B2BBC6" }}>Assess</span>
        </Text>
      </Flex>

      <Box maxW="500px" mx="auto" mt="60px">
        <Heading
          fontSize="32px"
          color="3D4C5E"
          textAlign="center"
          mb="4"
          fontWeight={"500"}
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

          <Button onClick={()=>nav('/superadmin/Dashboard')} mt="6" colorScheme="blue" type="submit" width="full">
            Login
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Login;
