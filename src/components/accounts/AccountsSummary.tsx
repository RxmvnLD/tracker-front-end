import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { CircularProgress } from "@mui/material";
import GradientButton from "../GradientButton";
import { BankAccountCard as BankAccountType } from "../../types";
import BankAccountCard from "../BankAccountCard";
import CreateAccountModal from "./CreateAccountModal";
import { useState } from "react";

const AccountsSummary = () => {
    const [showModal, setShowModal] = useState(false);

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

    const showModalHandler = () => {
        setShowModal(true);
    };

    if (isLoading) return <CircularProgress />;

    if (isError) return <div>Ha ocurrido un error recuperando tus datos</div>;
    accounts;
    return (
        <div className="flex flex-col items-center w-full shadow-[0rem_0rem_1rem_0.2rem] p-3 gap-2 rounded-xl shadow-violet-500 ">
            <h2 className="mb-0">Cuentas</h2>
            <article className="flex flex-col justify-center md:flex-wrap md:flex-row items-center w-full gap-3 p-5 min-h-min md:w-full lg:content-center">
                {accounts?.map((account: BankAccountType) => (
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
            <div className="flex flex-row justify-center gap-10 min-w-min">
                <GradientButton color="tealLime" onClick={showModalHandler}>
                    Agregar cuenta
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
