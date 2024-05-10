import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Modal from "react-modal";

import "./index.css";

import ContextProvider from "./context/ContextProvider";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

import {
  AdminDashboard,
  AdminLogin,
  AdminMainDashboard,
  AdminListeBebes,
  AdminAddBaby,
  AdminBabyDetails,
  AdminHistory,
  AdminRoomControl,
} from "./pages/admin";

const router = createBrowserRouter([
  //admin routes
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        path: "/admin-dashboard",
        element: <AdminMainDashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <AdminLogin />,
  },
  {
    path: "/admin-babies",
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        path: "/admin-babies",
        element: <AdminListeBebes />,
      },
    ],
  },
  {
    path: "/admin-add-baby",
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        path: "/admin-add-baby",
        element: <AdminAddBaby />,
      },
    ],
  },
  {
    path: "/admin-babies/baby/:id",
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        path: "/admin-babies/baby/:id",
        element: <AdminBabyDetails />,
      },
    ],
  },
  {
    path: "/admin-history",
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        path: "/admin-history",
        element: <AdminHistory />,
      },
    ],
  },
  {
    path: "/admin-room-control",
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        path: "/admin-room-control",
        element: <AdminRoomControl />,
      },
    ],
  },
]);
Modal.setAppElement("#root");
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </ContextProvider>
);
