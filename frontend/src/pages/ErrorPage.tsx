import { useRouteError } from "react-router";
import { isRouteErrorResponse } from "react-router";
import Error from "../components/Error";

const ErrorMangaPage = () => {
  const error = useRouteError();

  let title = "An error ocurred!";
  let status = 500;
  let message = "Something went wrong!";

  console.log(error);

  if (isRouteErrorResponse(error)) {
    status = error.status;
    title = error.statusText;
    message = JSON.parse(error.data).message;
  }

  return <Error title={title} message={message} status={status} />;
};

export default ErrorMangaPage;
