import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import LogoSvg from "@assets/logo.svg";
import BackgroudImage from "@assets/background.png";

import { InputStyled } from "@components/inputs/inputStyled";
import { ButtonStyle } from "@components/buttons/buttonStyle";

type IPropsForms = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export function SignUp() {
  const { goBack } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPropsForms>();

  const handleSingUp = (data: IPropsForms) => {
    console.log(data);
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
            rules={{
              required: "Informe seu nome *",
            }}
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
            rules={{
              required: "Informe seu email *",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                message: "Formato do e-mail inválido",
              },
            }}
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
            rules={{
              required: "Informe sua senha *",
            }}
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
            rules={{
              required: "Confirme sua senha *",
            }}
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
