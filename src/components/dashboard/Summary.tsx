import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { CircularProgress } from "@mui/material";
import { BalanceGraph, IncomesExpensesGraph } from "./SummaryGraphs";
import { SummaryBankAccount } from "../../types";
import GradientButton from "../GradientButton";
import { useNavigate } from "react-router-dom";

const Summary = () => {
    const navigate = useNavigate();
    const { isLoading, data, isError } = useQuery({
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

    if (isLoading) return <CircularProgress />;
    if (isError) return <div>Ha ocurrido un error recuperando tus datos</div>;
    const userData = {
        incomes: data.incomes as number,
        expenses: data.expenses as number,
        balance: data.balance as number,
        bankAccounts: data.bankAccounts as SummaryBankAccount[],
    };

    return (
        <article className="flex flex-col items-center w-full gap-3 py-5 shadow-[0rem_0rem_1rem_0.2rem] lg:content-center lg:gap-16 lg:flex-row rounded-xl shadow-violet-500 max-h-content md:px-10 md:w-full lg:w-full 2xl:mt-10">
            {/* Summary */}
            <section className="flex flex-col items-center h-full lg:w-1/2">
                <h2 className="my-0 ">Resumen:</h2>
                <div className="flex flex-wrap justify-center gap-2 lg:w-full">
                    <p className="my-0">Ingresos: ${data.incomes.toFixed(2)}</p>
                    <p className="my-0">Gastos: ${data.expenses.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-5 xl:w-80">
                    <IncomesExpensesGraph
                        incomes={userData.incomes}
                        expenses={userData.expenses}
                    />
                    <div>
                        <GradientButton
                            onClick={() => {
                                navigate("/transactions");
                            }}
                        >
                            Ver mis transacciones
                        </GradientButton>
                    </div>
                </div>
            </section>
            {/* Accounts */}
            <section className="flex flex-col items-center h-full lg:w-1/2">
                <h2 className="my-0">Cuentas:</h2>
                <div className="flex flex-wrap justify-center gap-2 lg:w-full">
                    <p className="my-0">Balance: ${data.balance.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-5 xl:w-80">
                    <BalanceGraph bankAccounts={userData.bankAccounts} />
                    <div>
                        <GradientButton
                            onClick={() => {
                                navigate("/accounts");
                            }}
                        >
                            Ver mis cuentas
                        </GradientButton>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default Summary;
