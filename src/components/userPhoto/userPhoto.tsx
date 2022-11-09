import React from "react";
import { Image, IImageProps } from "native-base";

type Props = IImageProps & {
  size: number;
};

export function UserPhoto({ size, ...rest }: Props) {
  return (
    <Image
      w={size}
      h={size}
      {...rest}
      rounded="full"
      borderWidth={2}
      borderColor="gray.600"
    />
  );
}
