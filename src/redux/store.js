import {
  configureStore,
  combineReducers,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { env } from "process";
import userSlice from "../slices/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
});

const persistConfig = {
  key: "app",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const listenerMiddleware = createListenerMiddleware();

// listenerMiddleware.startListening({
//   actionCreator: initSignUp,
//   effect: async (action, listenerApi) => {
//     listenerApi
//       .dispatch(userRegisterInit({ body: action.payload }))
//       .then(async (data) => {
//         listenerApi.dispatch(setUserData({ ...action.payload }));
//         if (
//           !isEmpty(listenerApi.getState().register.userId) &&
//           data.payload?.data
//         ) {
//           listenerApi.dispatch(
//             sendRegisterOtp({
//               body: {
//                 userId: listenerApi.getState().register.userId,
//                 type: listenerApi.getState().register.otpMedium,
//                 data: action.payload.phone,
//               },
//             })
//           );
//           listenerApi.cancelActiveListeners(); // <- pay attention
//         }
//       });
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
  devTools: env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(listenerMiddleware.middleware);
  },
});

export const persistor = persistStore(store);
