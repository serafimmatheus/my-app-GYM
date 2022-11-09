import { Text, View, StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "@components/loading/loading";
import { SignIn } from "@screens/signIn/signIn";
import { SignUp } from "@screens/signUp/signUp";
import { Routes } from "@routes/index";

export default function App() {
  const [renderFontes] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {renderFontes ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
