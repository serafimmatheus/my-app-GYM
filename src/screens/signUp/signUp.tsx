import React from "react";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";

import BackgroudImage from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { InputStyled } from "@components/inputs/inputStyled";
import { ButtonStyle } from "@components/buttons/buttonStyle";

export function SignUp() {
  const { goBack } = useNavigation();

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

        <Center mt={24} mb={8}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <InputStyled placeholder="Nome" />

          <InputStyled
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputStyled
            placeholder="Senha"
            autoCapitalize="none"
            secureTextEntry
          />
          <InputStyled
            placeholder="Confirme a Senha"
            autoCapitalize="none"
            secureTextEntry
          />

          <ButtonStyle title="Criar e acessar" />
        </Center>

        <Center mt={8}>
          <ButtonStyle
            title="Voltar para o login"
            variant="outline"
            onPress={goBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
