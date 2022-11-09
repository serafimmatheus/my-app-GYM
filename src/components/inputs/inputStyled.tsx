import React from "react";
import { IInputProps, Input } from "native-base";

export function InputStyled({ ...rest }: IInputProps) {
  return (
    <Input
      bg="gray.700"
      h={16}
      px={4}
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      mb={4}
      placeholderTextColor="gray.500"
      _focus={{
        bg: "gray.700",
        borderWidth: 1,
        borderColor: "green.500",
      }}
      {...rest}
    />
  );
}
