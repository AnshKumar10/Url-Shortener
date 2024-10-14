import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layouts/app-layout";
import Landing from "@/pages/landing";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import { RouteUrls } from "@/lib/constant";
import UrlContextProvider from "@/lib/context/urlContext";
import RequireAuth from "@/layouts/required-auth";
import RedirectLink from "@/pages/redirect";

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
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  return (
    <UrlContextProvider>
      <RouterProvider router={router} />
    </UrlContextProvider>
  );
}

export default App;
