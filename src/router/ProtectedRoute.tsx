import { useAuthStore } from "../store/auth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * Checks if user it's logged in, if not, redirects to /login
 * @param param \{ children \}
 * @returns
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isLogged = useAuthStore((state) => state.isLogged);

    return <>{isLogged ? children : <Navigate to={"/login"} />}</>;
};

export default ProtectedRoute;
