import React, { useState } from "react";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  VStack,
} from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";

import { ScreenHeaders } from "@components/screenHeaders/screenHeaders";
import { UserPhoto } from "@components/userPhoto/userPhoto";
import { Alert, TouchableOpacity } from "react-native";
import { InputStyled } from "@components/inputs/inputStyled";
import { ButtonStyle } from "@components/buttons/buttonStyle";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/index";
import { AppError } from "@utils/AppError";
import userPhotoDefault from "@assets/userPhotoDefault.png";

const PHOTO_SIZE = 133;

type FormDataProps = {
  name: string;
  password: string;
  old_password: string;
  confirm_password: string;
  email?: string;
};

const profileSchema = yup.object({
  name: yup.string().required("informe o nome."),
  password: yup
    .string()
    .min(6, "minimo de 6 caracteres.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password"), null], "Senhas não conferem.")
    .when("password", {
      is: (Field: any) => Field,
      then: yup
        .string()
        .nullable()
        .required("confirme a nova senha.")
        .transform((value) => (!!value ? value : null)),
    }),
});

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [photoSelected, setPhotoSelected] = useState(
    "https://github.com/serafimmatheus.png"
  );

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const { user, updatedUserProfile } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  const handleUserPhotoSelected = async () => {
    setPhotoIsLoading(true);
    try {
      const photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photo.cancelled) {
        return;
      }

      if (photo.uri) {
        const photoInfor = await FileSystem.getInfoAsync(photo.uri);

        if (photoInfor.size && photoInfor.size / 1024 / 1024 > 2) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de ate 5MG.",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = photo.uri.split(".").pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLocaleLowerCase(),
          uri: photo.uri,
          type: `${photo.type}/${fileExtension}`,
        } as any;

        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append("avatar", photoFile);

        const avatarResponse = await api.patch(
          "/users/avatar",
          userPhotoUploadForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const updatedAvatar = user;
        updatedAvatar.avatar = avatarResponse.data.avatar;
        updatedUserProfile(updatedAvatar);

        toast.show({
          title: "Foto atualizada.",
          placement: "top",
          bgColor: "green.700",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  async function handleProfileUpdated(data: FormDataProps) {
    try {
      setIsLoading(true);
      await api.put("/users", data);

      const userUpdated = user;
      userUpdated.name = data.name;

      updatedUserProfile(userUpdated);

      toast.show({
        title: "Dados do usuário atualizados.",
        placement: "top",
        bgColor: "green.700",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar as informações do usuário.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

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
              source={
                user.avatar
                  ? {
                      uri: `${api.defaults.baseURL}/avatar/${user.avatar}`,
                    }
                  : userPhotoDefault
              }
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelected}>
            <Text color="green.500" mb={8} mt={3} fontSize="md">
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <InputStyled
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <InputStyled isDisabled value={value} onChangeText={onChange} />
            )}
          />

          <Heading
            color="gray.200"
            fontSize="xl"
            mt={12}
            mb={3}
            alignSelf="flex-start"
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <InputStyled
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.old_password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <InputStyled
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <InputStyled
                placeholder="Confirme sua senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <ButtonStyle
            title="Atualizar"
            isLoading={false}
            onPress={handleSubmit(handleProfileUpdated)}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
