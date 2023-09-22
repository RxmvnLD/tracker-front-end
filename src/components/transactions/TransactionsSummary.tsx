import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { CircularProgress } from "@mui/material";
import GradientButton from "../GradientButton";
import TransactionCard from "./TransactionCard";
import { Transaction as TransactionType } from "../../types";
import CreateAccountModal from "./CreateTransactionModal";
import { useState } from "react";
import { IncomesExpensesGraph } from "../dashboard/SummaryGraphs";

const AccountsSummary = () => {
    const [showModal, setShowModal] = useState(false);

    const {
        isLoading: transactionsLoading,
        data: transactions,
        isError: transactionsError,
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
    const {
        isLoading: summaryIsLoading,
        data: summaryData,
        isError: summaryIsError,
    } = useQuery({
        queryKey: ["summary"],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get("/api/users/summary");
                return data;
            } catch (error: any) {
                console.log(error.response);
            }
        },
    });

    const showModalHandler = () => {
        setShowModal(true);
    };

    if (transactionsLoading || summaryIsLoading) return <CircularProgress />;

    if (transactionsError || summaryIsError)
        return <div>Ha ocurrido un error recuperando tus datos</div>;
    const userData = {
        incomes: summaryData.incomes as number,
        expenses: summaryData.expenses as number,
    };
    return (
        <div className="flex flex-col items-center w-full shadow-[0rem_0rem_1rem_0.2rem] p-3 gap-2 rounded-xl shadow-violet-500 ">
            <h2 className="mb-0">Transacciones</h2>
            <div>
                <IncomesExpensesGraph
                    incomes={userData.incomes}
                    expenses={userData.expenses}
                />
            </div>
            <article className="flex flex-col justify-center md:flex-wrap md:flex-row items-center w-full gap-3 p-5 min-h-min md:w-full lg:content-center">
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
            <div className="flex flex-row justify-center gap-10 min-w-min">
                <GradientButton color="tealLime" onClick={showModalHandler}>
                    Agregar transacción
                </GradientButton>
                <CreateAccountModal
                    showModal={showModal}
                    setShowModal={(bool: boolean) => setShowModal(bool)}
                />
            </div>
        </div>
    );
};

export default AccountsSummary;
