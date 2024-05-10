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
import { adminReducer } from "./features/admin/adminSlice";

// Configuration for adminReducer (persisted)
const persistAdminConfig = {
  key: "currentAdmin",
  storage,
};

const persistedAdminReducer = persistReducer(persistAdminConfig, adminReducer);

const rootReducer = combineReducers({
  admin: persistedAdminReducer,
  /*other: otherReducer,*/
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
