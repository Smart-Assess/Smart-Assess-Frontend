import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  SimpleGrid,
  Flex
} from "@chakra-ui/react";

import FormInput from "./../UI/FormInput";
import { addUniversity } from "../../data/UniversityData";
import { useNavigate } from "react-router-dom";

function EditUniversityForm() {
  const methods = useForm();
  const nav = useNavigate();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Flex w="100%" pb={8}>
      <Box w="100%">
        <Flex align="flex-start">  
          {/* Form Section */}
          <Box w="100%">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <SimpleGrid columns={[1, null, 3]} spacing="8">
                  {addUniversity.map((field) => (
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
                  <Button onClick={()=>nav('/superadmin/Dashboard')} variant="outline" colorScheme="gray" mr="4">
                    Cancel
                  </Button>
                  <Button type="submit" colorScheme="blue">
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
