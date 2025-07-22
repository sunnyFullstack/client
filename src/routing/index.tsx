import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./private.routes";
import { PublicRoutes } from "./public.routes";

export const routers = createBrowserRouter([...PublicRoutes, ...PrivateRoutes]);
