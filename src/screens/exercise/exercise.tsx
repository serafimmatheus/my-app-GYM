import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Heading, HStack, Icon, Image, Text, VStack } from "native-base";

import { AppNavigatinTabRoutesProps } from "@routes/app.routes";

import { Feather } from "@expo/vector-icons";

import BodySvg from "@assets/body.svg";
import RepeticaoSvg from "@assets/repetitions.svg";
import SeriesSvg from "@assets/series.svg";

import { ButtonStyle } from "@components/buttons/buttonStyle";

export function Exercise() {
  const { goBack } = useNavigation<AppNavigatinTabRoutesProps>();

  const handleGoBack = () => {
    goBack();
  };

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.800" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          alignItems="center"
          justifyContent="space-between"
          mt={4}
          mb={8}
        >
          <Heading flexShrink={1} color="gray.300" fontSize="lg">
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text ml={2} textTransform="capitalize" color="gray.300">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p={8}>
        <Image
          w="full"
          h={80}
          alt="nome do exercicio"
          source={{
            uri: "http://conteudo.imguol.com.br/c/entretenimento/35/2019/04/09/pulley-frente-1554824315336_v2_1254x837.jpg",
          }}
          rounded="lg"
          resizeMode="cover"
        />

        <Box bg="gray.800" p={4} mt={4} rounded="sm">
          <HStack justifyContent="space-around" mb={4}>
            <HStack alignItems="center">
              <SeriesSvg color="green.500" />
              <Text color="gray.400" ml={2}>
                3 seríes
              </Text>
            </HStack>

            <HStack alignItems="center">
              <RepeticaoSvg color="green.500" />
              <Text color="gray.400" ml={2}>
                12 repetições
              </Text>
            </HStack>
          </HStack>

          <ButtonStyle title="Marcar como finalizado" />
        </Box>
      </VStack>
    </VStack>
  );
}
