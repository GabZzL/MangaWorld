import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
// import MangaForm from "./components/MangaForm";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import StoragePage from "./pages/StoragePage";
import MangaList from "./pages/MangaList";
import MangaDetailPage from "./pages/MangaDetailPage";
import NewManga from "./pages/NewMange";
import ErrorMangaPage from "./pages/ErrorPage";
import { Loader as SearchLoader } from "./pages/StoragePage";
import { Loader as SearchSingleMangaLoader } from "./pages/MangaDetailPage";

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
      {
        path: "manga/:id",
        element: <MangaDetailPage />,
        loader: SearchSingleMangaLoader,
      },
      { path: "new-manga", element: <NewManga /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
