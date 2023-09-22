import { AiOutlineClose } from "react-icons/ai";
import {
    TextField,
    MenuItem,
    FormHelperText,
    InputAdornment,
} from "@mui/material";
import dayjs from "dayjs";
import GradientButton from "../GradientButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { BankAccColor, BankAccType } from "../../types";
import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
    BankAccountsType,
    SummaryBankAccountsColors,
} from "../../config/constants";

interface AccountModalProps {
    showModal: boolean;
    setShowModal: (bool: boolean) => void;
}
interface FormInputs {
    name: string;
    type: string;
    totalCredit?: number;
    availableCredit?: number;
    balance?: number;
    cuttOffDay?: Date;
    paydayLimit?: Date;
    color?: BankAccColor;
}
const CreateAccountModal = ({
    showModal = false,
    setShowModal,
}: AccountModalProps) => {
    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors },
    } = useForm<FormInputs>({
        mode: "onChange",
    });
    const queryClient = useQueryClient();
    const [type, setType] = useState<BankAccType>("debit");

    const cuttOffDay = useWatch({
        name: "cuttOffDay",
        control,
        defaultValue: dayjs(new Date()).toDate(),
    });

    const onSubmit: SubmitHandler<FormInputs> = async (data, e) => {
        e?.preventDefault();
        try {
            if (data.type === "debit") {
                delete data.totalCredit;
                delete data.availableCredit;
                delete data.cuttOffDay;
                delete data.paydayLimit;
            }
            if (data.type === "credit") {
                delete data.balance;
            }
            await axiosInstance.post("/api/bankaccounts", data);
            await queryClient.refetchQueries({ queryKey: ["accounts"] });
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
                                        Agregar cuenta bancaria
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
                                        {/* Account type */}
                                        <div className="mt-2" />
                                        <TextField
                                            label="Tipo"
                                            select
                                            variant="outlined"
                                            required
                                            size="small"
                                            defaultValue={""}
                                            //React-hook-form
                                            {...register("type", {
                                                required: true,
                                            })}
                                            //Error handling
                                            error={errors.type ? true : false}
                                            aria-invalid={
                                                errors.type ? true : false
                                            }
                                            onChange={(e) => {
                                                setType(
                                                    e.target
                                                        .value as BankAccType,
                                                );
                                            }}
                                        >
                                            {Object.entries(
                                                BankAccountsType,
                                            ).map(([key, value]) => {
                                                return (
                                                    <MenuItem
                                                        value={key}
                                                        key={key}
                                                    >
                                                        {value.value}
                                                    </MenuItem>
                                                );
                                            })}
                                        </TextField>
                                        {/* Credit/balance details */}
                                        {(type === "debit" ||
                                            type === "dual") && (
                                            <>
                                                <div className="mt-2" />
                                                {/* Account balance */}
                                                <TextField
                                                    label="Balance"
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
                                                    {...register("balance", {
                                                        required: true,
                                                        min: 0,
                                                        valueAsNumber: true,
                                                    })}
                                                    //Error handling
                                                    error={
                                                        errors.balance
                                                            ? true
                                                            : false
                                                    }
                                                    aria-invalid={
                                                        errors.balance
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </>
                                        )}
                                        {(type === "credit" ||
                                            type === "dual") && (
                                            <>
                                                <div className="mt-2" />
                                                {/* Account credit */}
                                                <TextField
                                                    label="Crédito total"
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
                                                    {...register(
                                                        "totalCredit",
                                                        {
                                                            required: true,
                                                            min: 0,
                                                            valueAsNumber: true,
                                                        },
                                                    )}
                                                    //Error handling
                                                    error={
                                                        errors.totalCredit
                                                            ? true
                                                            : false
                                                    }
                                                    aria-invalid={
                                                        errors.totalCredit
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <div className="mt-2" />
                                                {/* Account available credit */}
                                                <TextField
                                                    label="Crédito disponible"
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
                                                    {...register(
                                                        "availableCredit",
                                                        {
                                                            required: true,
                                                            min: 0,
                                                            valueAsNumber: true,
                                                            validate: (
                                                                val = 0,
                                                            ) => {
                                                                const totalCredit =
                                                                    getValues(
                                                                        "totalCredit",
                                                                    ) || 0;
                                                                return (
                                                                    val <
                                                                    totalCredit
                                                                );
                                                            },
                                                        },
                                                    )}
                                                    //Error handling
                                                    error={
                                                        errors.availableCredit
                                                            ? true
                                                            : false
                                                    }
                                                    aria-invalid={
                                                        errors.availableCredit
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errors.availableCredit
                                                            ? "El crédito disponible no puede ser mayor al crédito total"
                                                            : ""
                                                    }
                                                />
                                                <FormHelperText>
                                                    Fecha de corte y pago*
                                                </FormHelperText>
                                                <div className="mt-2" />
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                >
                                                    <Controller
                                                        control={control}
                                                        name="cuttOffDay"
                                                        defaultValue={dayjs(
                                                            new Date(),
                                                        ).toDate()}
                                                        rules={{
                                                            required: true,
                                                        }}
                                                        render={({ field }) => (
                                                            <MobileDatePicker
                                                                label="Dia de corte*"
                                                                views={["day"]}
                                                                defaultValue={dayjs(
                                                                    new Date(),
                                                                )}
                                                                onChange={(
                                                                    date,
                                                                ) => {
                                                                    field.onChange(
                                                                        date,
                                                                    );
                                                                }}
                                                            />
                                                        )}
                                                    />

                                                    <div className="mt-2" />
                                                    <Controller
                                                        control={control}
                                                        name="paydayLimit"
                                                        defaultValue={dayjs(
                                                            cuttOffDay,
                                                        )
                                                            .add(10, "day")
                                                            .toDate()}
                                                        rules={{
                                                            required: true,
                                                        }}
                                                        render={({ field }) => (
                                                            <MobileDatePicker
                                                                label="Dia límite de pago*"
                                                                views={["day"]}
                                                                defaultValue={dayjs(
                                                                    cuttOffDay,
                                                                ).add(
                                                                    10,
                                                                    "day",
                                                                )}
                                                                minDate={dayjs(
                                                                    cuttOffDay,
                                                                ).add(
                                                                    10,
                                                                    "day",
                                                                )}
                                                                maxDate={dayjs(
                                                                    cuttOffDay,
                                                                ).add(
                                                                    30,
                                                                    "day",
                                                                )}
                                                                onChange={(
                                                                    date,
                                                                ) => {
                                                                    field.onChange(
                                                                        date,
                                                                    );
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                                {/* Account cutt off day */}
                                            </>
                                        )}
                                        <div className="mt-2" />
                                        <TextField
                                            label="Color"
                                            select
                                            variant="outlined"
                                            required
                                            size="small"
                                            defaultValue={"white"}
                                            {...register("color", {
                                                required: true,
                                            })}
                                        >
                                            {Object.entries(
                                                SummaryBankAccountsColors,
                                            ).map(([key, value]) => {
                                                return (
                                                    <MenuItem
                                                        value={value.name}
                                                        key={value.name}
                                                    >
                                                        {value.nameEsp}
                                                    </MenuItem>
                                                );
                                            })}
                                        </TextField>
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

export default CreateAccountModal;
