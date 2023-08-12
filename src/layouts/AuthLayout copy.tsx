export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex items-center content-center justify-center min-h-screen p-10">
            {children}
        </main>
    );
}
