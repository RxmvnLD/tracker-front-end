import { useAuthStore } from "../store/auth";
import { Navigate } from "react-router-dom";
interface UnauthorizedRouteProps {
    children: React.ReactNode;
}
/**
 * If user it's not allowed to see this page, redirects to /dashboard
 * @param param \{ children \}
 * @returns
 */
const UnauthorizedRoute = ({ children }: UnauthorizedRouteProps) => {
    const isLogged = useAuthStore((state) => state.isLogged);
    return <>{isLogged ? <Navigate to={"/dashboard"} /> : children}</>;
};

export default UnauthorizedRoute;
