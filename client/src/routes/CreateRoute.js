import { Home } from "../pages/Home/Home";
import { SignIn } from "../pages/auth/signIn/SignIn";
import { SignUp } from "../pages/auth/signup/SignUp";

import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const MapRoutes = [
    {
        path: "/",
        privateRoutes: PrivateRoutes,
        // publicRoutes: PublicRoutes,
        component: Home
    },
    {
        path: "/signin",
        privateRoutes: PublicRoutes,
        // publicRoutes: PublicRoutes,
        component: SignIn
    },
    {
        path: "/signup",
        privateRoutes: PublicRoutes,
        // publicRoutes: PublicRoutes,
        component: SignUp
    },
] 