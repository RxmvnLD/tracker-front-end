import { useAuthStore } from "../store/auth";
import { Navigate, Outlet } from "react-router-dom";
/**
 * If user it's not allowed to see this page, redirects to /dashboard
 * @param param \{ children \}
 * @returns
 */
const UnauthorizedRoute = () => {
    const isLogged = useAuthStore((state) => state.isLogged);
    return (
        <>{isLogged ? <Navigate to={"/dashboard"} replace /> : <Outlet />}</>
    );
};

export default UnauthorizedRoute;
