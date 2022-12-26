import React from "react";
import { IInputProps, Input, FormControl } from "native-base";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type IProps = IInputProps & {
  errorMessage?: string | null;
};

export function InputStyledSchema({
  errorMessage = null,
  isInvalid,
  ...rest
}: IProps) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid}>
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      <Input
        bg="gray.700"
        h={16}
        px={4}
        borderWidth={0}
        fontSize="md"
        fontFamily="body"
        color={invalid ? "red.500" : "white"}
        mb={4}
        placeholderTextColor="gray.500"
        _focus={{
          bg: "gray.700",
          borderWidth: 1,
          borderColor: invalid ? "red.500" : "green.500",
        }}
        // isInvalid={invalid}
        // _invalid={{
        //   borderWidth: 1,
        //   borderColor: "red.500",
        // }}
        {...rest}
      />
    </FormControl>
  );
}
