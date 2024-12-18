import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userData from "../Redux/reducer/userData";
import authReducer from "../Redux/reducer/authSlice";
import jobReducer from "../Redux/reducer/jobSlice";
import optionsAPiReducer from "../Redux/reducer/optionApiSlice";
import selectOptionReducer from "../Redux/reducer/selectOption";
import { PersistConfig } from "redux-persist";

const rootReducer = combineReducers({
  user: userData,
  auth: authReducer,
  selectOption: selectOptionReducer,
  JobDetails: jobReducer,
  optionApi: optionsAPiReducer,

});

// Define persistence configurations with correct typing
const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: "root",
  storage,
};

// Wrap root reducer with `persistReducer` and type it
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor
export const persistor = persistStore(store);

// Define RootState and AppDispatch for use in the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
