import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const FormInput = ({
  name,
  label,
  type = "text",
  placeholder,
  options = [],
  pattern,
  validationMessage,
  defaultValue,
  min,
  max,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl key={name} isInvalid={errors[name]}>
      <FormLabel>{label}</FormLabel>
      {type === "select" ? (
        <Select
          {...register(name, {
            required: `${label} is required`,
            ...(pattern && { pattern: { value: pattern, message: validationMessage } }),
          })}
          placeholder={placeholder}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          {...register(name, {
            required: `${label} is required`,
            ...(pattern && { pattern: { value: pattern, message: validationMessage } }),
          })}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue} // Pass default value
          min={min} // Set minimum value for numeric inputs
          max={max} // Set maximum value for numeric inputs
        />
      )}
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
