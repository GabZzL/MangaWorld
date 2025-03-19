import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
// import MangaForm from "./components/MangaForm";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import StoragePage from "./pages/StoragePage";
import MangaList from "./pages/MangaList";
import ErrorMangaPage from "./pages/ErrorPage";
import { Loader as SearchLoader } from "./pages/StoragePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorMangaPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "storage",
        element: <StoragePage />,
        children: [
          {
            path: ":operation/*",
            element: <MangaList />,
            loader: SearchLoader,
          },
        ],
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
