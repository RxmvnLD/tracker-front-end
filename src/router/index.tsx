import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashboardPage";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedRoute from "./UnauthorizedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: (
            <UnauthorizedRoute>
                <LoginPage />
            </UnauthorizedRoute>
        ),
    },
    {
        path: "/signup",
        element: (
            <UnauthorizedRoute>
                <SignupPage />
            </UnauthorizedRoute>
        ),
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
        ),
    },
    { path: "*", element: <h1>404</h1> },
]);

export default router;
