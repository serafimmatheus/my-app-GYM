import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "@components/loading/loading";

import { Routes } from "@routes/index";

import { AuthContextProvider } from "@contexts/AuthContext";

export default function App() {
  const [renderFontes] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {renderFontes ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
