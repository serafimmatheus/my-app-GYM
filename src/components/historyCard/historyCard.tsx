import React from "react";
import { Heading, HStack, Text, VStack } from "native-base";
import { HistoryDTO } from "@dtos/historyDTO";

type IProps = {
  data: HistoryDTO;
};

export function HistoryCard({ data }: IProps) {
  return (
    <HStack px={8} py={4} mb={3} bg="gray.800" alignItems="center">
      <VStack flex={1}>
        <Heading fontSize="md" color="gray.200" textTransform="capitalize">
          {data.group}
        </Heading>
        <Text numberOfLines={1} fontSize="lg" color="gray.200">
          {data.name}
        </Text>
      </VStack>

      <Text color="gray.200" fontSize="md">
        {data.hour}
      </Text>
    </HStack>
  );
}
