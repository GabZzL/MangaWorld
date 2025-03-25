import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import StoragePage from "./pages/StoragePage";
import MangaList from "./pages/MangaList";
import MangaDetailPage from "./pages/MangaDetailPage";
import NewManga from "./pages/NewManga";
import EditManga from "./pages/EditManga";
import ErrorMangaPage from "./pages/ErrorPage";
import { Loader as SearchLoader } from "./pages/StoragePage";
import {
  Loader as SearchSingleMangaLoader,
  Action as DeleteManga,
} from "./pages/MangaDetailPage";
import { FormAction as FormMangaAction } from "./components/MangaForm";

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
        id: "manga-details",
        path: "manga/:id",
        loader: SearchSingleMangaLoader,
        children: [
          { index: true, element: <MangaDetailPage />, action: DeleteManga },
          { path: "edit", element: <EditManga />, action: FormMangaAction },
        ],
      },
      { path: "new-manga", element: <NewManga />, action: FormMangaAction },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
