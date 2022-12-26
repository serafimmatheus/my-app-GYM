import React from "react";
import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { ExerciseDTO } from "@dtos/exercisesDTO";
import { api } from "@services/index";

type Iprops = TouchableOpacityProps & {
  data: ExerciseDTO;
};

export function ExerciseCard({ data, ...rest }: Iprops) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.800"
        p={2}
        alignItems="center"
        pr={4}
        rounded="sm"
        mb={3}
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt="remada unilateral"
          w={16}
          h={16}
          rounded="md"
          mr={4}
        />

        <VStack flex={1}>
          <Heading color="white" fontSize="lg">
            {data.name}
          </Heading>

          <Text color="white" fontSize="sm" numberOfLines={2}>
            {`${data.series} séries x ${data.repetitions} repetiçoes`}
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
