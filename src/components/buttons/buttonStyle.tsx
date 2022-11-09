import React from "react";
import { Button, IButtonProps, Text } from "native-base";

type IProps = IButtonProps & {
  title: string;
};

export function ButtonStyle({ title, variant, ...rest }: IProps) {
  return (
    <Button
      w="full"
      h={16}
      bg={variant === "outline" ? "transparent" : "green.700"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="green.500"
      rounded="sm"
      _pressed={{ bg: variant === "outline" ? "gray.500" : "green.500" }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? "green.500" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </Button>
  );
}
