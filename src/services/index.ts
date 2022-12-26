import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/StorageAuthToken";
import { AppError } from "@utils/AppError";
import axios, { AxiosInstance } from "axios";

type PromiseType = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

type ProcessQueueParams = {
  error: Error | null;
  token: string | null;
};

type RegisterInterceptTokenManegerProps = {
  signOut: () => void;
  refreshTokenUpdated: (newToken: string) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManeger: ({
    signOut,
    refreshTokenUpdated,
  }: RegisterInterceptTokenManegerProps) => () => void;
};

const api = axios.create({
  baseURL: "http://192.168.100.5:3333",
}) as APIInstanceProps;

let isRefreshing = false;
let failedQueue: Array<PromiseType> = [];

const processQueue = ({ error, token = null }: ProcessQueueParams): void => {
  failedQueue.forEach((req) => {
    if (error) {
      req.reject(error);
    } else {
      req.resolve(token);
    }
  });
  failedQueue = [];
};

api.registerInterceptTokenManeger = ({ signOut, refreshTokenUpdated }) => {
  const interceptTokenManeger = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          const currentToken = await storageAuthTokenGet();

          if (!currentToken) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequest = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
              })
              .catch((error) => {
                throw error;
              });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("/sessions/refresh-token", {
                token: currentToken,
              });

              await storageAuthTokenSave(data.token);

              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`;

              originalRequest.headers.Authorization = `Bearer ${data.token}`;
              refreshTokenUpdated(data.token);

              processQueue({ error: null, token: data.token });
              resolve(originalRequest);
            } catch (error: any) {
              processQueue({ error, token: null });
            } finally {
              isRefreshing = false;
            }
          });
        }

        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.request.eject(interceptTokenManeger);
  };
};

export { api };
