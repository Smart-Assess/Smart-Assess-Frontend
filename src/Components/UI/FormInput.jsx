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
  isDisabled = false, // Add isDisabled prop
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={errors[name]} isDisabled={isDisabled}>
      <FormLabel>{label}</FormLabel>
      {type === "select" ? (
        <Select
          {...register(name, {
            required: `${label} is required`,
            ...(pattern && {
              pattern: { value: pattern, message: validationMessage },
            }),
          })}
          placeholder={placeholder}
          isDisabled={isDisabled} // Disable select
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
          isDisabled={isDisabled} // Disable input
        />
      )}
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
