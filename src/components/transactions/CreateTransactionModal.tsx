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
}
interface FormInputs {
    name: string;
    bankAccount: string;
    accountToCharge: TransactionAccount;
    type: TransactionType;
    amount: number;
}
const CreateTransactionModal = ({
    showModal = false,
    setShowModal,
}: AccountModalProps) => {
    const [selectedAcc, setSelectedAcc] = useState<BankAccount>(
        {} as BankAccount,
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        mode: "onChange",
    });
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

    const queryClient = useQueryClient();

    const onSubmit: SubmitHandler<FormInputs> = async (data, e) => {
        e?.preventDefault();
        try {
            await axiosInstance.post("/api/transactions", data);
            await queryClient.refetchQueries({ queryKey: ["transactions"] });
            toast.success("Cuenta agregada exitosamente");
            setShowModal(false);
        } catch (error: any) {
            console.log(error.response);
            toast.error(error.response.data.message);
        }
    };
    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-20 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-5 max-w-3xl">
                            {/*content*/}
                            <div className="rounded-xl px-10 md:px-7 py-4 relative flex flex-col md:w-96 w-full bg-[#292764] shadow-[0rem_0rem_1rem_0.2rem] shadow-indigo-900 outline-none focus:outline-none md:mt-0 max-h-[75vh] md:max-h-full overflow-y-scroll md:overflow-hidden">
                                {/*header*/}
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-semibold ">
                                        Agregar transacción
                                    </h3>
                                    <button
                                        className="p-1 flex items-center bg-transparent cursor-pointer absolute top-2 right-2"
                                        onClick={() => {
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
                                        {/* Bank account */}
                                        <div className="mt-2" />
                                        {isLoading && <div>Cargando...</div>}
                                        {isError && <div>error</div>}
                                        <TextField
                                            label="Cuenta bancaria"
                                            select
                                            variant="outlined"
                                            required
                                            size="small"
                                            defaultValue={""}
                                            {...register("bankAccount", {
                                                required: true,
                                            })}
                                            onChange={(e) => {
                                                const id = e.target.value;
                                                const selectedAcc =
                                                    accounts.filter(
                                                        (acc: BankAccount) =>
                                                            acc.id === id,
                                                    )[0];
                                                setSelectedAcc(selectedAcc);
                                            }}
                                        >
                                            {accounts.map(
                                                (acc: BankAccount) => {
                                                    return (
                                                        <MenuItem
                                                            value={acc.id}
                                                            key={acc.id}
                                                        >
                                                            {acc.name}
                                                        </MenuItem>
                                                    );
                                                },
                                            )}
                                        </TextField>
                                        {/* Account to charge */}
                                        <div className="mt-2" />
                                        <TextField
                                            label="Cuenta a cargar"
                                            select
                                            variant="outlined"
                                            required
                                            size="small"
                                            defaultValue={""}
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
                                            defaultValue={"expense"}
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
                                    <div className="flex items-center justify-center">
                                        <GradientButton
                                            size="lg"
                                            styles="my-3"
                                            type="submit"
                                            color="tealLime"
                                        >
                                            Agregar cuenta
                                        </GradientButton>
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

export default CreateTransactionModal;
