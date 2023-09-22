import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashboardPage";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedRoute from "./UnauthorizedRoute";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AccountsPage from "../pages/AccountsPage";
import AccountDetails from "../components/accounts/AccountDetails";
import TransactionsPage from "../pages/TransactionsPage";

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
                    { element: <AccountsPage />, path: "/bankaccounts" },
                    {
                        element: <AccountDetails />,
                        path: "/bankaccounts/:id",
                    },
                    { element: <TransactionsPage />, path: "/transactions" },
                    { element: <DashboardPage />, path: "/transactions/:id" },

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
