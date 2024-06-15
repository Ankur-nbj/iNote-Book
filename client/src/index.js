import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import stateReducer from './context/state';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// Configure persist settings
const persistConfig = { key: "root", storage, version: 1 };

// Apply persistReducer to your stateReducer
const persistedReducer = persistReducer(persistConfig, stateReducer);

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: persistedReducer, // Match this key with the name in the slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Render the application with Redux Provider and PersistGate
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
