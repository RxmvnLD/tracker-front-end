import axiosInstance from "../../utils/axiosInstance";
import { Transaction as TransactionType } from "../../types";
import GradientButton from "../GradientButton";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import UpdateAccountModal from "./UpdateAccountModal";
import TransactionCard from "../TransactionCard";
import AccountGraph from "./AccountGraph";

const AccountDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(),
        location = useLocation(),
        { id } = useParams();
    const previousLocation = location.state?.previousPath;
    const { isLoading, data, isError } = useQuery({
        queryKey: ["account"],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get(
                    `/api/bankaccounts/${id}`,
                );
                console.log(data);

                return data;
            } catch (error: any) {
                console.log(error.response);
                toast.error(error.response.data.message);
                navigate(previousLocation ?? "/dashboard");
            }
        },
    });
    const showModalHandler = () => {
        setShowModal(true);
    };

    if (isLoading) return <CircularProgress />;

    if (isError) return <div>Ha ocurrido un error recuperando tus datos</div>;

    return (
        <div className="flex flex-col items-center w-full shadow-[0rem_0rem_1rem_0.2rem] p-3 gap-2 rounded-xl shadow-violet-500 ">
            <h2 className="mb-0">{data.name}</h2>
            <div className="flex flex-col md:flex-row items-center justify-center md:w-full gap-10 ">
                <div>
                    <AccountGraph
                        balance={data?.balance}
                        totalCredit={data?.totalCredit}
                        availableCredit={data?.availableCredit}
                    />
                </div>
                <div className="flex flex-col items-center justify-evenly gap-5 h-full">
                    <div className="flex flex-col gap-2">
                        {(data?.type === "debit" || data?.type === "dual") && (
                            <h4 className="m-0 w-full font-semibold">
                                Balance:{" "}
                                <span className="font-normal">
                                    {data?.balance}
                                </span>
                            </h4>
                        )}
                        {(data?.type === "credit" || data?.type === "dual") && (
                            <>
                                <h4 className="m-0 w-full font-semibold">
                                    Crédito total:{" "}
                                    <span className="font-normal">
                                        {data?.totalCredit}
                                    </span>
                                </h4>
                                <h4 className="m-0 w-full font-semibold">
                                    Crédito disponible:{" "}
                                    <span className="font-normal">
                                        {data?.availableCredit}
                                    </span>
                                </h4>
                                <h4 className="m-0 w-full font-semibold">
                                    Fecha de corte:{" "}
                                    <span className="font-normal">
                                        {dayjs(data?.cuttOffDay)
                                            .format("DD-MM-YYYY")
                                            .toString()}
                                    </span>
                                </h4>
                                <h4 className="m-0 w-full font-semibold">
                                    Fecha límite de pago:{" "}
                                    <span className="font-normal">
                                        {dayjs(data?.paydayLimit)
                                            .format("DD-MM-YYYY")
                                            .toString()}
                                    </span>
                                </h4>
                            </>
                        )}
                    </div>
                    <GradientButton color="cyanBlue" onClick={showModalHandler}>
                        Editar cuenta
                    </GradientButton>

                    <UpdateAccountModal
                        showModal={showModal}
                        setShowModal={(bool: boolean) => setShowModal(bool)}
                    />
                </div>
            </div>

            {/* incomes */}
            <article className="flex flex-col justify-center md:flex-wrap md:flex-row items-center w-full gap-3 p-5 min-h-min md:w-full lg:content-center">
                {data?.transactions?.incomes.map(
                    (transaction: TransactionType) => (
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
                    ),
                )}
            </article>
            <article className="flex flex-col justify-center md:flex-wrap md:flex-row items-center w-full gap-3 p-5 min-h-min md:w-full lg:content-center">
                {data?.transactions?.expenses.map(
                    (transaction: TransactionType) => (
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
                    ),
                )}
            </article>
        </div>
    );
};

export default AccountDetails;
