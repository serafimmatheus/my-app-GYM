import React from "react";
import { Heading, HStack, Text, VStack } from "native-base";

export function HistoryCard() {
  return (
    <HStack px={8} py={4} mb={3} bg="gray.800" alignItems="center">
      <VStack flex={1}>
        <Heading fontSize="md" color="gray.200" textTransform="capitalize">
          Costas
        </Heading>
        <Text numberOfLines={1} fontSize="lg" color="gray.200">
          Puxada fronta
        </Text>
      </VStack>

      <Text color="gray.200" fontSize="md">
        08:33
      </Text>
    </HStack>
  );
}
