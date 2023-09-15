import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashboardPage";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedRoute from "./UnauthorizedRoute";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        element: <UnauthorizedRoute />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "/login",
                        element: <LoginPage />,
                    },
                    {
                        path: "/signup",
                        element: <SignupPage />,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    { element: <DashboardPage />, path: "/dashboard" },
                    { element: <DashboardPage />, path: "/transactions" },
                    { element: <DashboardPage />, path: "/bankaccounts" },
                    { element: <DashboardPage />, path: "/bets" },
                    { element: <DashboardPage />, path: "/passwords" },
                    { element: <DashboardPage />, path: "/configuration" },
                ],
            },
        ],
    },
    { path: "*", element: <HomePage /> },
]);

export default router;
