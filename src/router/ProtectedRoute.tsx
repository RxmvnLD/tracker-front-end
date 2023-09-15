import { useAuthStore } from "../store/auth";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Checks if user it's logged in, if not, redirects to /login
 * @param param \{ children \}
 * @returns
 */
const ProtectedRoute = () => {
    const isLogged = useAuthStore((state) => state.isLogged);
    return <>{isLogged ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default ProtectedRoute;
