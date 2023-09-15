import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
    return (
        <div className="flex flex-col w-screen min-h-screen overflow-x-clip md:h-screen md:gap-10 md:flex-row">
            <Sidebar />
            <main className="flex flex-col items-center w-full h-full gap-10 p-5 md:w-10/12 xl:w-8/12 md:mx-auto md:p-10 lg:p-5 xl:p-10 2xl:p-5">
                <Outlet />
            </main>
        </div>
    );
}
