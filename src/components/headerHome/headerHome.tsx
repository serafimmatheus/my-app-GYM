import React from "react";
import { TouchableOpacity } from "react-native";
import { Heading, HStack, Text, VStack, Icon } from "native-base";

import { MaterialIcons } from "@expo/vector-icons";

import { UserPhoto } from "@components/userPhoto/userPhoto";

export function HeaderHome() {
  return (
    <HStack bg="gray.800" pt={16} pb={4} px={8} alignItems="center">
      <UserPhoto
        source={{ uri: "https://github.com/serafimmatheus.png" }}
        size={16}
        alt="imagem do user"
        mr={6}
      />
      <VStack flex={1}>
        <Text color="white" fontSize="md">
          Ola,
        </Text>
        <Heading color="white" fontSize="md">
          Matheus
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.400" size={8} />
      </TouchableOpacity>
    </HStack>
  );
}
