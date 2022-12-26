import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useToast,
  VStack,
} from "native-base";

import { AppNavigatinTabRoutesProps } from "@routes/app.routes";

import { Feather } from "@expo/vector-icons";

import BodySvg from "@assets/body.svg";
import RepeticaoSvg from "@assets/repetitions.svg";
import SeriesSvg from "@assets/series.svg";

import { ButtonStyle } from "@components/buttons/buttonStyle";
import { AppError } from "@utils/AppError";
import { api } from "@services/index";
import { ExerciseDTO } from "@dtos/exercisesDTO";
import { Loading } from "@components/loading/loading";

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const { goBack, navigate } = useNavigation<AppNavigatinTabRoutesProps>();
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  const [exercises, setExercises] = useState<ExerciseDTO>({} as ExerciseDTO);

  const { exerciseId } = route.params as RouteParamsProps;

  const { show } = useToast();

  const handleGoBack = () => {
    goBack();
  };

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício.";

      show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setIsLoadingRegister(true);

      await api.post("/history", { exercise_id: exerciseId });

      show({
        title: "Exercício registrado com sucesso.",
        placement: "top",
        bgColor: "green.700",
      });

      navigate("histoty");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registar o exercício.";

      show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.800" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          alignItems="center"
          justifyContent="space-between"
          mt={4}
          mb={8}
        >
          <Heading flexShrink={1} color="gray.300" fontSize="lg">
            {exercises.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text ml={2} textTransform="capitalize" color="gray.300">
              {exercises.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <VStack p={8}>
          <Box rounded="lg" overflow="hidden" mb={1}>
            <Image
              w="full"
              h={80}
              alt="nome do exercicio"
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercises.demo}`,
              }}
              resizeMode="cover"
              rounded="lg"
            />
          </Box>

          <Box bg="gray.800" p={4} mt={4} rounded="sm">
            <HStack justifyContent="space-around" mb={4}>
              <HStack alignItems="center">
                <SeriesSvg color="green.500" />
                <Text color="gray.400" ml={2}>
                  {exercises.series} seríes
                </Text>
              </HStack>

              <HStack alignItems="center">
                <RepeticaoSvg color="green.500" />
                <Text color="gray.400" ml={2}>
                  {exercises.repetitions} repetições
                </Text>
              </HStack>
            </HStack>

            <ButtonStyle
              title="Marcar como finalizado"
              isLoading={isLoadingRegister}
              onPress={handleExerciseHistoryRegister}
            />
          </Box>
        </VStack>
      )}
    </VStack>
  );
}
