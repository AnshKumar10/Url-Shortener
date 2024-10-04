import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "@/layouts/app-layout";
import Landing from "@/pages/landing";
import Auth from "@/pages/auth";
import { RouteUrls } from "@/lib/constant";

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
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
