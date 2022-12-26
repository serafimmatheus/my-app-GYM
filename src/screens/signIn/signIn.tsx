import React, { useState } from "react";
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import { AuthNavigationRoutesProps } from "@routes/auth.routes";

import BackgroudImage from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { InputStyled } from "@components/inputs/inputStyled";
import { ButtonStyle } from "@components/buttons/buttonStyle";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNavigation<AuthNavigationRoutesProps>();

  const { singIn } = useAuth();

  const { show } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  async function handleSingIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await singIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possivel entrar. Tente novamente mais tarde.";

      show({
        title,
        placement: "top",
        bgColor: "red.500",
      });

      setIsLoading(false);
    }
  }

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

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <InputStyled
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <InputStyled
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <ButtonStyle
            title="Acessar"
            onPress={handleSubmit(handleSingIn)}
            isLoading={isLoading}
          />
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
