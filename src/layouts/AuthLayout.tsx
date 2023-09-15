import { Outlet } from "react-router-dom";
export default function AuthLayout() {
    return (
        <main className="flex items-center content-center justify-center min-h-screen p-10">
            <Outlet />
        </main>
    );
}
