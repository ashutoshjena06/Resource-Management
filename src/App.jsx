import React from "react";
import { Home } from "./pages/Home";
import "./App.css";
import AppLayout from "./components/layouts/AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { UserPage } from "./pages/dashboard";
import { AdminPage } from "./pages/admindashboard";
import { ResetPassword } from "./pages/resetPassword";
import { ProtectedRoute } from "./components/protectedRoute";
import { Header } from "./components/layouts/Header";
import { Profile } from "./components/UI/profile";
import { AdminDash } from "./components/UI/admindashboard";
import { UserDash } from "./components/UI/userdashboard";
import { ManageEmployee } from "./components/UI/manageEmpoyee";
import { Category } from "./components/UI/category";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      path: "/api",
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "resetPassword",
          element: <ResetPassword />,
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true, // <-- This means default for /dashboard
              element: <UserDash />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "userdashboard",
              element: <UserDash />,
            },
            {
              path: "allusers",
              element: <ManageEmployee />,
            },
          ],
        },
        {
          path: "admindashboard",
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "profile", // this becomes /api/admindashboard/profile
              element: <Profile />,
            },
            {
              index: true, // this becomes /api/admindashboard/profile
              element: <AdminDash />,
            },
            {
              path: "manageemployee",
              element: <ManageEmployee />,
            },
            {
              path: "category",
              element: <Category />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;
