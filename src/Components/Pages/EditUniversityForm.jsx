import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, useToast, SimpleGrid, Flex } from "@chakra-ui/react";

import FormInput from "./../UI/FormInput";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { editUniversity } from "../../data/UniversityData";
function EditUniversityForm({
  university,
  fileName,
  file,
  setFile,
  setFileName,
}) {
  const methods = useForm();
  const { handleSubmit } = methods;
  const nav = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (university) {
      methods.setValue("city", university?.university?.city);
      methods.setValue("email", university?.university?.email);
      methods.setValue("universityName", university?.university?.name);
      methods.setValue("universityAdminEmail", university?.admin?.email);
      methods.setValue("universityAdmin", university?.admin?.name);
      methods.setValue("phoneNumber", university?.university?.phone_number);
      methods.setValue("streetAddress", university?.university?.street_address);
      methods.setValue("state", university?.university?.state);
      methods.setValue("zipcode", university?.university?.zipcode);
      if (university.university) {
        setFileName(university.university.image_url);
      }
    }
  }, [university, methods.setValue]);

  const [updateLoading, setupdateLaoding] = useState();
  const { id } = useParams();

  const onSubmit = async (data) => {
    try {
      setupdateLaoding(true);
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();

      formData.append("city", data.city);
      formData.append("university_email", data.email);
      formData.append("admin_password", data.password);
      formData.append("phone_number", data.phoneNumber);
      formData.append("state", data.state);
      formData.append("street_address", data.streetAddress);
      formData.append("admin_name", data.universityAdmin);
      formData.append("admin_email", data.universityAdminEmail);
      formData.append("university_name", data.universityName);
      formData.append("zipcode", data.zipcode);
      if (file) {
        formData.append("image", file);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/superadmin/university/${id}`,
        formData,
        config
      );

      if (response.status === 200 || response.status === 201) {
        setupdateLaoding(false);
        toast({
          title: "University updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        nav("/superadmin/dashboard");
      }
    } catch (err) {
      console.error("Error updating university:", err);
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
                  {editUniversity.map((field) => (
                    <FormInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                    />
                  ))}
                </SimpleGrid>

                <Box display="flex" justifyContent="flex-end" mt="6">
                  <Button
                    onClick={() => nav("/superadmin/Dashboard")}
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
                    Save
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

export default EditUniversityForm;
