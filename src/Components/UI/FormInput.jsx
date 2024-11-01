// src/components/common/FormInput.js

import React from "react";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const FormInput = ({ name, label, type = "text", placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext(); 
  return (
    <FormControl key={name} isInvalid={errors[name]}>
      <FormLabel>{label}</FormLabel>
      <Input
        {...register(name, { required: `${label} is required` })}
        type={type}
        placeholder={placeholder}
      />
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
