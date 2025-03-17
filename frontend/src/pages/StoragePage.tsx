import { Outlet } from "react-router";
import { searchManga } from "../assets/services/manga-crud";
import SearchManga from "../components/SearchManga";

const StoragePage = () => {
  return (
    <>
      <SearchManga />
      <Outlet />
    </>
  );
};

export default StoragePage;

export const Loader = async ({ params }) => {
  const { userQuery } = params;
  const response = await searchManga(userQuery);

  return response;
};
