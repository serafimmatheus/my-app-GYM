import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Box } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/loading/loading";

export function Routes() {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[900];

  const { user, isLoadingUserStorage } = useAuth();

  if (isLoadingUserStorage) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
