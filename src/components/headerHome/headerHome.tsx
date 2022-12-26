import React from "react";
import { TouchableOpacity } from "react-native";
import { Heading, HStack, Text, VStack, Icon } from "native-base";

import { MaterialIcons } from "@expo/vector-icons";

import { UserPhoto } from "@components/userPhoto/userPhoto";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatinTabRoutesProps } from "@routes/app.routes";

import userPhotoDefault from "@assets/userPhotoDefault.png";
import { api } from "@services/index";

export function HeaderHome() {
  const { user, logout } = useAuth();

  return (
    <HStack bg="gray.800" pt={16} pb={4} px={8} alignItems="center">
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : userPhotoDefault
        }
        size={16}
        alt="imagem do user"
        mr={6}
      />
      <VStack flex={1}>
        <Text color="white" fontSize="md">
          Ola,
        </Text>
        <Heading color="white" fontSize="md">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={logout}>
        <Icon as={MaterialIcons} name="logout" color="gray.400" size={8} />
      </TouchableOpacity>
    </HStack>
  );
}
