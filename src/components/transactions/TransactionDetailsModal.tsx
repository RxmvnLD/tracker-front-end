import { AiOutlineClose } from "react-icons/ai";
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import GradientButton from "../GradientButton";

import { TransactionAccount, TransactionType, BankAccount } from "../../types";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface AccountModalProps {
    showModal: boolean;
    setShowModal: (bool: boolean) => void;
    id: string;
}
interface FormInputs {
    name: string;
    accountToCharge: TransactionAccount;
    type: TransactionType;
    amount: number;
}
const TransactionDetailsModal = ({
    showModal = false,
    setShowModal,
    id,
}: AccountModalProps) => {
    const [selectedAcc, setSelectedAcc] = useState<BankAccount>(
            {} as BankAccount,
        ),
        [isEditing, setIsEditing] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        mode: "onChange",
    });
    const { isLoading, data, isError } = useQuery({
        queryKey: ["transactionsDetails"],
        queryFn: async () => {
            try {
                const { data: accounts } = await axiosInstance.get(
                    "/api/bankaccounts/user",
                );
                const { data } = await axiosInstance.get(
                    `/api/transactions/${id}`,
                );
                const selectedAcc = accounts.filter(
                    (acc: BankAccount) => acc.id === data.bankAccount,
                )[0];
                setSelectedAcc(selectedAcc);
                console.log(selectedAcc);
                return data;
            } catch (error: any) {
                console.log(error.response);
            }
        },
    });
    const queryClient = useQueryClient();
    const onSubmit: SubmitHandler<FormInputs> = async (data, e) => {
        e?.preventDefault();
        console.log(id, data);
        try {
            await axiosInstance.put(`/api/transactions/${id}`, data);
            await queryClient.refetchQueries({
                queryKey: ["transactions", "accounts"],
            });
            toast.success("Cuenta actualizada exitosamente");
            setShowModal(false);
        } catch (error: any) {
            console.log(error.response);
            toast.error(error.response.data.message);
        }
    };
    const handleDelete = () => {
        toast("Esta acción es irreversible, estás seguro?", {
            action: {
                label: "Eliminar",
                onClick: async () => {
                    try {
                        await axiosInstance.delete(`/api/transactions/${id}`);
                        await queryClient.refetchQueries({
                            queryKey: ["transactions"],
                        });
                        await queryClient.refetchQueries({
                            queryKey: ["account"],
                        });
                        toast.success("Cuenta eliminada exitosamente");
                        setShowModal(false);
                    } catch (error: any) {
                        console.log(error.response);
                        toast.error(error.response.data.message);
                    }
                },
            },
        });
    };
    return (
        <>
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-20 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                        <div className="relative w-auto max-w-3xl mx-5 my-6">
                            {/*content*/}
                            <div className="rounded-xl px-10 md:px-7 py-4 relative flex flex-col md:w-96 w-full bg-[#292764] shadow-[0rem_0rem_1rem_0.2rem] shadow-indigo-900 outline-none focus:outline-none md:mt-0 max-h-[75vh] md:max-h-full overflow-y-scroll md:overflow-hidden">
                                {/*header*/}
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-semibold ">
                                        Detalles de transacción
                                    </h3>
                                    <button
                                        className="absolute flex items-center p-1 bg-transparent cursor-pointer top-2 right-2"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setShowModal(false);
                                        }}
                                    >
                                        <AiOutlineClose className="text-xl font-bold text-slate-200" />
                                    </button>
                                </div>
                                {/*body*/}
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="relative flex flex-col gap-2">
                                        {/* Account name */}
                                        <TextField
                                            label="Nombre"
                                            variant="outlined"
                                            required
                                            size="small"
                                            defaultValue={data?.name}
                                            disabled={!isEditing}
                                            //React-hook-form
                                            {...register("name", {
                                                required: true,
                                                minLength: 3,
                                                maxLength: 30,
                                            })}
                                            //Error handling
                                            error={errors.name ? true : false}
                                            aria-invalid={
                                                errors.name ? true : false
                                            }
                                            helperText={
                                                errors.name
                                                    ? "El nombre debe tener entre 3 y 30 carácteres"
                                                    : ""
                                            }
                                        />
                                        {/* Account to charge */}
                                        <div className="mt-2" />
                                        <TextField
                                            label="Cuenta a cargar"
                                            select
                                            variant="outlined"
                                            required
                                            size="small"
                                            defaultValue={data?.accountToCharge}
                                            disabled={!isEditing}
                                            //React-hook-form
                                            {...register("accountToCharge", {
                                                required: true,
                                            })}
                                            //Error handling
                                            error={errors.type ? true : false}
                                            aria-invalid={
                                                errors.type ? true : false
                                            }
                                        >
                                            {(selectedAcc.type === "debit" ||
                                                selectedAcc.type ===
                                                    "dual") && (
                                                <MenuItem
                                                    value={"debit"}
                                                    key="debit"
                                                >
                                                    Débito
                                                </MenuItem>
                                            )}
                                            {(selectedAcc.type === "credit" ||
                                                selectedAcc.type ===
                                                    "dual") && (
                                                <MenuItem
                                                    value={"credit"}
                                                    key="credit"
                                                >
                                                    Crédito
                                                </MenuItem>
                                            )}
                                        </TextField>
                                        {/* Transaction type */}
                                        <div className="mt-2" />
                                        <TextField
                                            label="Tipo de transacción"
                                            select
                                            variant="outlined"
                                            required
                                            size="small"
                                            disabled={!isEditing}
                                            defaultValue={data?.type}
                                            //React-hook-form
                                            {...register("type", {
                                                required: true,
                                            })}
                                            //Error handling
                                            error={errors.type ? true : false}
                                            aria-invalid={
                                                errors.type ? true : false
                                            }
                                        >
                                            <MenuItem
                                                value={"expense"}
                                                key="expense"
                                            >
                                                Gasto
                                            </MenuItem>
                                            <MenuItem
                                                value={"income"}
                                                key="income"
                                            >
                                                Ingreso
                                            </MenuItem>
                                        </TextField>
                                        <div className="mt-2" />
                                        {/* Account balance */}
                                        <TextField
                                            label="Monto"
                                            variant="outlined"
                                            required
                                            size="small"
                                            type="number"
                                            defaultValue={data?.amount}
                                            disabled={!isEditing}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        $
                                                    </InputAdornment>
                                                ),
                                            }}
                                            //React-hook-form
                                            {...register("amount", {
                                                required: true,
                                                min: 0,
                                                valueAsNumber: true,
                                            })}
                                            //Error handling
                                            error={errors.amount ? true : false}
                                            aria-invalid={
                                                errors.amount ? true : false
                                            }
                                        />
                                    </div>
                                    {/*footer*/}
                                    <div className="flex flex-col items-center justify-center gap-5 my-3">
                                        {isEditing === false && (
                                            <>
                                                <GradientButton
                                                    size="lg"
                                                    onClick={() => {
                                                        setIsEditing(true);
                                                    }}
                                                    color="cyanBlue"
                                                    type="button"
                                                >
                                                    Editar cuenta
                                                </GradientButton>
                                                <GradientButton
                                                    size="lg"
                                                    onClick={handleDelete}
                                                    type="button"
                                                    color="pinkOrange"
                                                >
                                                    Eliminar transacción
                                                </GradientButton>
                                            </>
                                        )}
                                        {isEditing && (
                                            <>
                                                <GradientButton
                                                    size="lg"
                                                    type="submit"
                                                    color="tealLime"
                                                >
                                                    Actualizar cuenta
                                                </GradientButton>
                                                <GradientButton
                                                    size="lg"
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                    }}
                                                    color="redYellow"
                                                    type="button"
                                                >
                                                    Cancelar
                                                </GradientButton>
                                            </>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default TransactionDetailsModal;
