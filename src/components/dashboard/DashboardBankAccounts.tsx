import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { CircularProgress } from "@mui/material";
import { BankAccountCard as BankAccountType } from "../../types";
import GradientButton from "../GradientButton";
import { useNavigate } from "react-router-dom";
import BankAccountCard from "../accounts/BankAccountCard";
import { useState } from "react";
import CreateAccountModal from "../accounts/CreateAccountModal";

const DashboardBankAccounts = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const showModalHandler = () => {
        setShowModal(true);
    };

    const {
        isLoading,
        data: accounts,
        isError,
    } = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get(
                    "/api/bankaccounts/user",
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
                <GradientButton color="tealLime" onClick={showModalHandler}>
                    Agregar cuenta
                </GradientButton>
                <GradientButton
                    onClick={() => {
                        navigate("/bankaccounts");
                    }}
                >
                    Ver mis cuentas
                </GradientButton>
            </div>
            <article className="flex flex-row items-center w-full gap-3 p-5 overflow-x-scroll min-h-min md:max-w-4xl lg:content-center">
                {accounts.map((account: BankAccountType) => (
                    <BankAccountCard
                        color={account.color}
                        name={account.name}
                        type={account.type}
                        id={account.id}
                        balance={account.balance}
                        totalCredit={account.totalCredit}
                        availableCredit={account.availableCredit}
                        key={account.id}
                    />
                ))}
            </article>
            <CreateAccountModal
                showModal={showModal}
                setShowModal={(bool: boolean) => setShowModal(bool)}
            />
        </div>
    );
};

export default DashboardBankAccounts;
