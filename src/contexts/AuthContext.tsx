import { UserDTO } from "@dtos/UserDTOS";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "@services/index";
import {
  logoutUserStorage,
  storageUserGet,
  storageUserSave,
} from "@storage/StorageUser";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/StorageAuthToken";

export type AuthContextDataProps = {
  user: UserDTO;
  singIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorage: boolean;
  logout: () => Promise<void>;
  updatedUserProfile: (user: UserDTO) => Promise<void>;
  refreshToken: string;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type ChildrenProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true);

  const [refreshToken, setRefreshToken] = useState("");

  async function userAndToken(userData: UserDTO, token: string) {
    try {
      setUser(userData);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      throw error;
    }
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorage(true);
      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function singIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token) {
        setIsLoadingUserStorage(true);
        await storageUserAndTokenSave(data.user, data.token);
        await userAndToken(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorage(true);
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (userLogged && token) {
        await userAndToken(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function logout() {
    try {
      setIsLoadingUserStorage(true);
      setUser({} as UserDTO);
      await logoutUserStorage();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function updatedUserProfile(user: UserDTO) {
    try {
      setUser(user);
      await storageUserSave(user);
    } catch (error) {
      throw error;
    }
  }

  function refreshTokenUpdated(newToken: string) {
    setRefreshToken(newToken);
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManeger({
      logout,
      refreshTokenUpdated,
    });

    return () => {
      subscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        singIn,
        isLoadingUserStorage,
        logout,
        updatedUserProfile,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
