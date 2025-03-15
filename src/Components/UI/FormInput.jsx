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
    <FormControl isInvalid={errors[name]}>
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
            pattern: pattern
              ? { value: pattern, message: validationMessage }
              : undefined,
          })}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          min={min}
          max={max}
        />
      )}
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
