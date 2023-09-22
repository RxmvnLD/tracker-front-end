import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { CircularProgress } from "@mui/material";
import TransactionCard from "../transactions/TransactionCard";
import { Transaction as TransactionType } from "../../types";
import GradientButton from "../GradientButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateTransactionModal from "../transactions/CreateTransactionModal";

const DashboardTransactions = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const {
        isLoading,
        data: transactions,
        isError,
    } = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get(
                    "/api/transactions/user",
                );
                return data;
            } catch (error: any) {
                console.log(error.response);
            }
        },
    });

    if (isLoading) return <CircularProgress />;

    if (isError) return <div>Ha ocurrido un error recuperando tus datos</div>;

    return (
        <div className="flex flex-col items-center w-full shadow-[0rem_0rem_1rem_0.2rem] p-3 rounded-xl shadow-violet-500 ">
            <div className="flex flex-row justify-center gap-10 min-w-min">
                <GradientButton
                    color="tealLime"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
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
            <CreateTransactionModal
                showModal={showModal}
                setShowModal={(bool: boolean) => setShowModal(bool)}
            />
        </div>
    );
};

export default DashboardTransactions;
