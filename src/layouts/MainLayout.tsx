import Sidebar from "../components/Sidebar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col w-screen h-screen md:gap-10 md:flex-row">
            <Sidebar />
            <main className="flex flex-col h-full p-5 mx-auto md:w-auto md:p-10 lg:p-5 xl:p-20 2xl:p-40">
                {children}
            </main>
        </div>
    );
}
