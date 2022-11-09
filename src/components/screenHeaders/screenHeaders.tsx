import React from "react";
import { Center, Heading } from "native-base";

type Iprops = {
  title: string;
};

export function ScreenHeaders({ title }: Iprops) {
  return (
    <Center bg="gray.800" pt={16} pb={6}>
      <Heading color="gray.400" fontSize="xl">
        {title}
      </Heading>
    </Center>
  );
}
