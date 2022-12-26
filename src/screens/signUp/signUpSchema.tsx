import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import LogoSvg from "@assets/logo.svg";
import BackgroudImage from "@assets/background.png";

import { InputStyled } from "@components/inputs/inputStyled";
import { ButtonStyle } from "@components/buttons/buttonStyle";
import { Alert } from "react-native";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/index";
import { AppError } from "@utils/AppError";

type IPropsForms = {
  name: string;
  email: string;
  password: string;
};

const schema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o email.").email("Email inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter no mini 6 caracteres."),
  passwordConfirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password"), null], "As senhas não conferem."),
});

export function SignUp() {
  const { goBack } = useNavigation();
  const { singIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { show } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPropsForms>({
    resolver: yupResolver(schema),
  });

  const handleSingUp = async ({ name, email, password }: IPropsForms) => {
    try {
      setIsLoading(true);
      await api.post("/users", { name, email, password });
      singIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel criar a conta, tente novamente mais tarde";

      show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <InputStyled
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <InputStyled
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <InputStyled
                placeholder="Digite uma senha"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                autoCapitalize="none"
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange, value } }) => (
              <InputStyled
                placeholder="Confirme sua senha"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                autoCapitalize="none"
                onSubmitEditing={handleSubmit(handleSingUp)}
                returnKeyType="send"
                errorMessage={errors.passwordConfirm?.message}
              />
            )}
          />

          <ButtonStyle
            title="Criar e acessar"
            onPress={handleSubmit(handleSingUp)}
          />
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
