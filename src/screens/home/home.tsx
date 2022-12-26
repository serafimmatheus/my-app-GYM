import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Heading, HStack, Text, useToast, VStack } from "native-base";

import { Group } from "@components/group/group";
import { HeaderHome } from "@components/headerHome/headerHome";
import { ExerciseCard } from "@components/exerciseCard/exerciseCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatinTabRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/index";
import { ExerciseDTO } from "@dtos/exercisesDTO";
import { Loading } from "@components/loading/loading";

export function Home() {
  const [groups, setGroups] = useState<string[]>([]);

  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const { show } = useToast();

  const [groupSelected, setGroupSelected] = useState("antebraço");
  const { navigate } = useNavigation<AppNavigatinTabRoutesProps>();

  const handleOpenExercisesDetails = (exerciseId: string) => {
    navigate("exercise", { exerciseId });
  };

  async function fetchGroups() {
    try {
      const resposne = await api.get("/groups");
      setGroups(resposne.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares.";

      show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios.";

      show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HeaderHome />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              String(groupSelected).toLowerCase() === String(item).toLowerCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={4}>
            <Heading color="gray.300" fontSize="md">
              Exercícios:
            </Heading>

            <Text color="gray.300" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleOpenExercisesDetails(item.id)}
                data={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 20 }}
          />
        </VStack>
      )}
    </VStack>
  );
}
