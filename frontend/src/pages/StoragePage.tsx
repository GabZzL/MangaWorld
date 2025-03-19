import { Outlet, LoaderFunctionArgs } from "react-router";
import SearchManga from "../components/SearchManga";
import FilterManga from "../components/FilterManga";
import { LoaderSearchParams } from "../types/manga-types";
import createError from "../utils/create-error";
import { ValidOperations } from "../types/manga-types";
import { handleApiRequest } from "../utils/api-handlers";

const StoragePage = () => {
  return (
    <>
      <SearchManga />
      <FilterManga />
      <Outlet />
    </>
  );
};

export default StoragePage;

export const Loader = async ({
  params,
  request,
}: LoaderFunctionArgs<LoaderSearchParams>) => {
  const operation = params.operation as ValidOperations | undefined;
  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());

  if (
    !operation ||
    !["search", "filter-genre", "filter-year", "filter-language"].includes(
      operation
    )
  ) {
    createError({
      status: 400,
      message: "Invalid Operation Type",
      statusText: "Bad Request",
    });
  }

  const response = await handleApiRequest(operation, queryParams.query);
  return response;
};
