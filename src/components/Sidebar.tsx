import { LiaPiggyBankSolid, LiaMoneyBillWaveSolid } from "react-icons/lia";
import { GiPayMoney, GiSettingsKnobs } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlinePassword } from "react-icons/md";
import { BsRobot } from "react-icons/bs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import DarkModal from "./SwalAlert";
const Sidebar = () => {
    return (
        <>
            <Mobile />
            <Desktop />
        </>
    );
};

const Mobile = () => {
    const [isOpen, setIsOppen] = useState<boolean>(false);
    const setUnauthUser = useAuthStore((state) => state.setUnauthUser);
    const navigate = useNavigate();
    const handleLogout = () => {
        setUnauthUser();
        navigate("/login");
    };
    return (
        <>
            <header className="md:hidden p-2 bg-[#292764] sticky top-0 w-full shadow-xl z-40 flex flex-row items-center justify-start">
                <button
                    onClick={() => {
                        setIsOppen(!isOpen);
                    }}
                    className="flex flex-row items-center gap-2 px-2 py-1 text-xl text-white bg-transparent rounded-md justify-self-center"
                >
                    <BsRobot />
                    <span className="font-mono">TRVK3R</span>
                </button>
            </header>
            {/* Menu */}
            <nav
                className={`md:hidden p-5 pt-8 fixed z-0 flex flex-col gap-4 transition-all duration-300 ease-in bg-[#292764] rounded-md min-h-min overflow-y-auto ${
                    isOpen ? "top-10" : "top-[-550px]"
                }`}
            >
                <SidebarItem text={"Dasboard"}>
                    <AiOutlineHome />
                </SidebarItem>
                <SidebarItem text={"Cuentas"}>
                    <LiaPiggyBankSolid />
                </SidebarItem>
                <SidebarItem text={"Transacciones"}>
                    <LiaMoneyBillWaveSolid />
                </SidebarItem>
                <SidebarItem text={"Apuestas"}>
                    <GiPayMoney />
                </SidebarItem>
                <SidebarItem text={"Contraseñas"}>
                    <MdOutlinePassword />
                </SidebarItem>
                <div className="w-full h-[1px] bg-white"></div>
                <SidebarItem text={"Configuración"}>
                    <GiSettingsKnobs />
                </SidebarItem>
                <SidebarItem
                    text={"Cerrar sesión"}
                    type="button"
                    onClick={handleLogout}
                >
                    <BiLogOut />
                </SidebarItem>
            </nav>
        </>
    );
};
const Desktop = () => {
    const [isOpen, setIsOpen] = useState(false);
    const setUnauthUser = useAuthStore((state) => state.setUnauthUser);
    const navigate = useNavigate();
    const handleLogout = () => {
        setUnauthUser();
        navigate("/login");
    };
    return (
        <div className="relative hidden h-full my-auto md:flex md:w-1/4 lg:w-1/6 xl:w-1/12">
            <nav
                className="absolute md:flex-col hidden z-40 max-w-fit gap-5 top-[calc(100vh_/_4)] bg-[#292764] md:flex p-5 rounded-lg ml-5 my-auto shadow-[0rem_0rem_1rem_0.2rem] shadow-indigo-900"
                onMouseEnter={() => {
                    setIsOpen(true);
                }}
                onMouseLeave={() => {
                    setIsOpen(false);
                }}
            >
                <SidebarItem
                    text={"Dasboard"}
                    showText={isOpen}
                    href="/dashboard"
                >
                    <AiOutlineHome />
                </SidebarItem>
                <SidebarItem
                    text={"Cuentas"}
                    showText={isOpen}
                    href="/bank-accounts"
                >
                    <LiaPiggyBankSolid />
                </SidebarItem>
                <SidebarItem
                    text={"Transacciones"}
                    showText={isOpen}
                    href="/transactions"
                >
                    <LiaMoneyBillWaveSolid />
                </SidebarItem>
                <SidebarItem
                    text={"Apuestas"}
                    showText={isOpen}
                    href="/incoming-feature"
                >
                    <GiPayMoney />
                </SidebarItem>
                <SidebarItem
                    text={"Contraseñas"}
                    showText={isOpen}
                    href="/incoming-feature"
                >
                    <MdOutlinePassword />
                </SidebarItem>
                <SidebarItem
                    text={"Configuración"}
                    showText={isOpen}
                    href="/config"
                >
                    <GiSettingsKnobs />
                </SidebarItem>
                <SidebarItem
                    text={"Cerrar sesión"}
                    showText={isOpen}
                    type="button"
                    onClick={handleLogout}
                >
                    <BiLogOut />
                </SidebarItem>
            </nav>
        </div>
    );
};

const SidebarItem = ({
    children,
    text,
    showText = true,
    href = "",
    type = "link",
    onClick,
}: {
    children: React.ReactNode;
    text: string;
    showText?: boolean;
    href?: string;
    type?: "button" | "link";
    onClick?: () => void;
}) => {
    if (type === "link")
        return (
            <Link
                to={href}
                className={`flex items-center gap-2 pl-3 py-2  hover:bg-[#4338ca] hover:shadow-[0rem_0rem_1rem_0.1rem] hover:shadow-indigo-700 rounded-md text-white ${
                    showText ? "pr-10" : "pr-3"
                }`}
            >
                <div className="flex items-center text-3xl">{children}</div>
                <div
                    className={`font-thin text-md ${
                        showText ? "flex" : "hidden"
                    } transition-all duration-300 ease-in`}
                >
                    {text}
                </div>
            </Link>
        );
    if (type === "button") {
        return (
            <button
                onClick={onClick}
                className={`flex items-center gap-2 pl-3 py-2 bg-transparent hover:bg-[#4338ca] hover:shadow-[0rem_0rem_1rem_0.1rem] hover:shadow-indigo-700 rounded-md text-white ${
                    showText ? "pr-10" : "pr-3"
                }`}
            >
                <div className="flex items-center text-3xl">{children}</div>
                <div
                    className={`font-thin text-md ${
                        showText ? "flex" : "hidden"
                    } transition-all duration-300 ease-in`}
                >
                    {text}
                </div>
            </button>
        );
    }
};

export default Sidebar;
