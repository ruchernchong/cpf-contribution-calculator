import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import incomeCeilingReducer from "./features/incomeCeiling/incomeCeilingSlice";
import resultReducer from "./features/result/resultSlice";
import settingReducer from "./features/setting/settingSlice";
import userInfoReducer from "./features/userInfo/userInfoSlice";

const reducers = combineReducers({
  incomeCeiling: incomeCeilingReducer,
  result: resultReducer,
  setting: settingReducer,
  userInfo: userInfoReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["setting"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = createStore(persistedReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
