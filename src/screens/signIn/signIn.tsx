import React from "react";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { AuthNavigationRoutesProps } from "@routes/auth.routes";

import BackgroudImage from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { InputStyled } from "@components/inputs/inputStyled";
import { ButtonStyle } from "@components/buttons/buttonStyle";

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigationRoutesProps>();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <VStack flex={1} bg="gray.700" px={10} pb={8}>
        <Image
          source={BackgroudImage}
          defaultSource={BackgroudImage}
          alt="Bg aplicação"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <InputStyled
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputStyled placeholder="Senha" secureTextEntry />

          <ButtonStyle title="Acessar" />
        </Center>

        <Center mt={24}>
          <Text color="white" fontFamily="body" fontSize="sm" mb={3}>
            Ainda não tem acesso?
          </Text>

          <ButtonStyle
            title="Criar conta"
            variant="outline"
            onPress={() => navigate("signUp")}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
