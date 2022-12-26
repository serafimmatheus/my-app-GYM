import React, { useCallback, useEffect, useState } from "react";
import {
  Heading,
  VStack,
  SectionList,
  Text,
  HStack,
  Center,
  useToast,
} from "native-base";

import { HistoryCard } from "@components/historyCard/historyCard";
import { ScreenHeaders } from "@components/screenHeaders/screenHeaders";
import { AppError } from "@utils/AppError";
import { api } from "@services/index";
import { useFocusEffect } from "@react-navigation/native";
import { HistoryByDayDTO } from "@dtos/historyDTO";
import { Loading } from "@components/loading/loading";
import { useAuth } from "@hooks/useAuth";

export function History() {
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const { show } = useToast();

  const { refreshToken } = useAuth();

  async function fetchHistory() {
    try {
      setIsLoading(true);

      const { data } = await api.get("/history");

      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico dos exercícios.";

      show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [refreshToken])
  );

  return (
    <VStack flex={1}>
      <ScreenHeaders title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : exercises?.length > 0 ? (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading fontSize="md" color="white" px={4} mt={8} mb={3}>
              {section.title}
            </Heading>
          )}
          px={8}
        />
      ) : (
        <Center flex={1}>
          <VStack flex={1}>
            <Text color="gray.100">Não há exercícios registrados ainda.</Text>
            <Text color="gray.100">Vamos fazer exercícios hoje?</Text>
          </VStack>
        </Center>
      )}
    </VStack>
  );
}
