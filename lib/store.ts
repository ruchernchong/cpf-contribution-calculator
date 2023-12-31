import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dataReducer from "./features/data/dataSlice";

const reducers = combineReducers({
  data: dataReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["data"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

// Infer the type of makeStore
// export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
