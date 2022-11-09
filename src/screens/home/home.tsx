import React, { useState } from "react";
import { FlatList, Heading, HStack, Text, VStack } from "native-base";

import { Group } from "@components/group/group";
import { HeaderHome } from "@components/headerHome/headerHome";
import { ExerciseCard } from "@components/exerciseCard/exerciseCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatinTabRoutesProps } from "@routes/app.routes";

export function Home() {
  const [groups, setGroups] = useState([
    "costa",
    "bíceps",
    "tríceps",
    "ombro",
    "peito",
  ]);

  const [exercises, setExercises] = useState([
    "costa",
    "bíceps",
    "tríceps",
    "ombro",
    "peito",
  ]);

  const [groupSelected, setGroupSelected] = useState("costa");
  const { navigate } = useNavigation<AppNavigatinTabRoutesProps>();

  const handleOpenExercisesDetails = () => {
    navigate("exercise");
  };

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
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExercisesDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 20 }}
        />
      </VStack>
    </VStack>
  );
}
