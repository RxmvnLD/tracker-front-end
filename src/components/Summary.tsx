import { useQuery } from "@tanstack/react-query";
import { axiosGet } from "../utils/axiosInstance";
import { CircularProgress } from "@mui/material";
const Summary = () => {
    const { isLoading, data, isError } = useQuery({
        queryKey: ["summary"],
        queryFn: () => axiosGet("/api/users/summary"),
    });

    if (isLoading) return <CircularProgress />;
    if (isError) return <div>Ha ocurrido un error recuperando tus datos</div>;
    return (
        <section className="flex flex-col items-center gap-3">
            <h1 className="mb-0">Resumen:</h1>
            {/* Summary pie graph */}
            <div className="bg-white w-60 h-60 lg:w-72 lg:h-72">graph</div>
            {/* Summary */}
            <div className="flex flex-wrap justify-center gap-2">
                <p className="my-0">Ingresos: ${data.incomes.toFixed(2)}</p>
                <p className="my-0">Gastos: ${data.expenses.toFixed(2)}</p>
                <p className="my-0">Balance: ${data.balance.toFixed(2)}</p>
            </div>
            {/* Accounts */}
            <h2 className="my-0">Cuentas</h2>
            <div className="flex flex-wrap justify-center gap-2">
                <div>Cuentas de débito: {data.debitAccounts}</div>
                <div>Cuentas de crédito: {data.creditAccounts}</div>
                <div>Cuentas duales: {data.dualAccounts}</div>
            </div>
        </section>
    );
};

export default Summary;
