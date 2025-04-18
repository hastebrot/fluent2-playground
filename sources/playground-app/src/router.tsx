import { createHashRouter } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";

export const router = createHashRouter([
  /* wrap. */
  { path: "/", element: <IndexPage /> },
]);
