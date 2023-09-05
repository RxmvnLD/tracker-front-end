import { useQuery } from "@tanstack/react-query";
import { axiosGet } from "../utils/axiosInstance";
import { CircularProgress } from "@mui/material";
import TransactionCard from "./TransactionCard";
import { Transaction as TransactionType } from "../types";
import GradientButton from "./GradientButton";
import { useNavigate } from "react-router-dom";

const DashboardTransactions = () => {
    const navigate = useNavigate();
    const {
        isLoading,
        data: transactions,
        isError,
    } = useQuery({
        queryKey: ["userTransactions"],
        queryFn: () => axiosGet("/api/transactions/user"),
    });

    if (isLoading) return <CircularProgress />;

    if (isError) return <div>Ha ocurrido un error recuperando tus datos</div>;

    return (
        <div className="flex flex-col items-center w-full shadow-[0rem_0rem_1rem_0.2rem] p-3 rounded-xl shadow-violet-500 ">
            <div className="flex flex-row justify-center gap-10 min-w-min">
                <GradientButton color="tealLime">
                    Agregar transacción
                </GradientButton>
                <GradientButton
                    onClick={() => {
                        navigate("/transactions");
                    }}
                >
                    Ver transacciones
                </GradientButton>
            </div>
            <article className="flex flex-row items-center w-full gap-3 p-5 overflow-x-scroll min-h-min md:max-w-4xl lg:content-center">
                {transactions.map((transaction: TransactionType) => (
                    <TransactionCard
                        name={transaction.name}
                        type={transaction.type}
                        amount={transaction.amount}
                        bankAccount={transaction.bankAccount}
                        user={transaction.user}
                        createdAt={transaction.createdAt}
                        id={transaction.id}
                        key={transaction.id}
                    />
                ))}
            </article>
        </div>
    );
};

export default DashboardTransactions;
