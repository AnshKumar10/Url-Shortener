import "./App.css";
import { Analytics } from '@vercel/analytics/react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layouts/app-layout";
import Landing from "@/pages/landing";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import { RouteUrls } from "@/lib/constant";
import UrlContextProvider from "@/lib/context/urlContext";
import RequireAuth from "@/layouts/required-auth";
import RedirectLink from "@/pages/redirect";
import Stats from "@/pages/stats";
import { Toaster } from "react-hot-toast";
import Profile from "@/pages/profile";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: RouteUrls.ROOT,
        element: <Landing />,
      },
      {
        path: RouteUrls.AUTH,
        element: <Auth />,
      },
      {
        path: RouteUrls.DASHBOARD,
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "redirect/:id",
        element: <RedirectLink />,
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Stats />
          </RequireAuth>
        ),
      },
      {
        path: RouteUrls.SETTING_PROFILE,
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <UrlContextProvider>
      <Analytics />
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </UrlContextProvider>
  );
};

export default App;
