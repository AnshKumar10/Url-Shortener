import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layouts/app-layout";
import Landing from "@/pages/landing";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import { RouteUrls } from "@/lib/constant";
import UrlProvider from "@/context";
import RequireAuth from "@/layouts/required-auth";

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
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
