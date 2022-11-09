import React from "react";
import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Entypo } from "@expo/vector-icons";

type Iprops = TouchableOpacityProps & {};

export function ExerciseCard({ ...rest }: Iprops) {
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
            uri: "https://www.origym.com.br/upload/remada-unilateral-3.png",
          }}
          alt="remada unilateral"
          w={16}
          h={16}
          rounded="md"
          mr={4}
        />

        <VStack flex={1}>
          <Heading color="white" fontSize="lg">
            Remada unilateral
          </Heading>

          <Text color="white" fontSize="sm" numberOfLines={2}>
            4 séries x 12 repetiçoes
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
