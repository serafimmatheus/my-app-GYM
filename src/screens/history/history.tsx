import React, { useState } from "react";
import {
  Heading,
  VStack,
  SectionList,
  Text,
  HStack,
  Center,
} from "native-base";

import { HistoryCard } from "@components/historyCard/historyCard";
import { ScreenHeaders } from "@components/screenHeaders/screenHeaders";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "07.11.2022",
      data: ["Peito", "Ombro", "Tríceps"],
    },
    {
      title: "08.11.2022",
      data: ["Peito", "Ombro", "Tríceps"],
    },
    {
      title: "09.11.2022",
      data: ["Peito", "Ombro", "Tríceps"],
    },
  ]);
  return (
    <VStack flex={1}>
      <ScreenHeaders title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading fontSize="md" color="white" px={4} mt={8} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
        ListEmptyComponent={() => (
          <Center flex={1}>
            <VStack flex={1}>
              <Text color="gray.100">Não há exercícios registrados ainda.</Text>
              <Text color="gray.100">Vamos fazer exercícios hoje?</Text>
            </VStack>
          </Center>
        )}
      />
    </VStack>
  );
}
