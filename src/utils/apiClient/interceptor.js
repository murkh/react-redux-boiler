import { client } from "./index";
import { nanoid } from "@reduxjs/toolkit";
import { persistor } from "../../redux/store";

const setUpInterceptor = (accessToken) => {
  const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

  const logout = () => {
    persistor.purge().then(() => {
      persistor.flush().then(() => {
        localStorage.clear();
        delay(5000);
        window.location.replace("/");
      });
    });
  };

  // Function to set up request interceptors
  const setupRequestInterceptor = (client) => {
    client.interceptors.request.use(
      async (config) => {
        const correlationId = nanoid();
        config.headers["x-correlation-id"] = correlationId;

        if (config.authorization !== false) {
          if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            config.headers["x-user-id"] = `${correlationId}-getUserIDFromStore`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  };

  // Function to set up response interceptors
  const setupResponseInterceptor = (client) => {
    client.interceptors.response.use(
      (response) => {
        if (
          response.data.response &&
          typeof response.data.response.data === "string"
        ) {
          response.data.response = response.data.response.data;
        } else {
          // Handle unexpected data format
        }
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );
  };

  [client].forEach((clientInstance) => {
    setupRequestInterceptor(clientInstance);
    setupResponseInterceptor(clientInstance);
  });
};

export default setUpInterceptor;
