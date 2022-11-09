import React, { useState } from "react";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { ScreenHeaders } from "@components/screenHeaders/screenHeaders";
import { UserPhoto } from "@components/userPhoto/userPhoto";
import { TouchableOpacity } from "react-native";
import { InputStyled } from "@components/inputs/inputStyled";
import { ButtonStyle } from "@components/buttons/buttonStyle";

const PHOTO_SIZE = 133;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  return (
    <VStack flex={1}>
      <ScreenHeaders title="Perfil" />

      <ScrollView>
        <Center px={10} mt={6} pb={8}>
          {photoIsLoading ? (
            <Skeleton
              startColor="gray.700"
              endColor="gray.800"
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
            />
          ) : (
            <UserPhoto
              size={PHOTO_SIZE}
              alt="foto de perfil"
              source={{
                uri: "https://github.com/serafimmatheus.png",
              }}
            />
          )}

          <TouchableOpacity>
            <Text color="green.500" mb={8} mt={3} fontSize="md">
              Alterar foto
            </Text>
          </TouchableOpacity>

          <InputStyled placeholder="Nome" />

          <InputStyled value="matheus18serafim@gmail.com" isDisabled />

          <Heading
            color="gray.200"
            fontSize="xl"
            mt={12}
            mb={3}
            alignSelf="flex-start"
          >
            Alterar senha
          </Heading>
          <InputStyled placeholder="Senha antiga" secureTextEntry />
          <InputStyled placeholder="Nova senha" secureTextEntry />

          <ButtonStyle title="Atualizar" isLoading={false} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
