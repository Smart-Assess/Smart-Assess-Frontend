import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, useToast, SimpleGrid, Flex } from "@chakra-ui/react";

import FormInput from "./../UI/FormInput";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { editTeacher } from "../../data/TeacherData";
function EditTeacherForm({ teacher }) {
  const methods = useForm();
  const { handleSubmit } = methods;
  const nav = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (teacher) {
      methods.setValue("teacherName", teacher?.full_name);
      methods.setValue("department", teacher?.department);
      methods.setValue("email", teacher?.email);
    }
  }, [teacher, methods.setValue]);

  const [updateLoading, setupdateLaoding] = useState();
  const { id } = useParams();

  const onSubmit = async (data) => {
    try {
      setupdateLaoding(true);
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("full_name", data.teacherName);
      formData.append("department", data.department);
      formData.append("email", data.email);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `https://134.209.110.162:8000/universityadmin/teacher/${id}`,
        formData,
        config
      );

      if (response.status === 200 || response.status === 201) {
        setupdateLaoding(false);
        toast({
          title: "Teacher updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        nav("/university/teacher/Dashboard");
      }
    } catch (err) {
      console.error("Error updating Teacher:", err);
      setupdateLaoding(false);
    }
  };

  return (
    <Flex w="100%" pb={8}>
      <Box w="100%">
        <Flex align="flex-start">
          {/* Form Section */}
          <Box w="100%">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={[1, null, 3]} spacing="8">
                  {editTeacher.map((field) => (
                    <FormInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      pattern={field.pattern}
                      validationMessage={field.validationMessage}
                    />
                  ))}
                </SimpleGrid>

                <Box display="flex" justifyContent="flex-end" mt="6">
                  <Button
                    onClick={() => nav("/university/teacher/Dashboard")}
                    variant="outline"
                    colorScheme="gray"
                    mr="4"
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={updateLoading}
                    type="submit"
                    colorScheme="blue"
                  >
                    Update
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default EditTeacherForm;
