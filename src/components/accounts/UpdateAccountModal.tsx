import axiosInstance from "../../utils/axiosInstance";
import { BankAccColor, BankAccType } from "../../types";
import GradientButton from "../GradientButton";
import { AiOutlineClose } from "react-icons/ai";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";
import {
    TextField,
    MenuItem,
    FormHelperText,
    InputAdornment,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface FormInputs {
    name: string;
    type: BankAccType;
    totalCredit?: number;
    availableCredit?: number;
    balance?: number;
    cuttOffDay?: Date | any;
    paydayLimit?: Date | any;
    color?: BankAccColor;
}
interface AccountModalProps {
    showModal: boolean;
    setShowModal: (bool: boolean) => void;
}
const UpdateAccountModal = ({
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
    const navigate = useNavigate(),
        location = useLocation(),
        { id } = useParams();

    const {
            isLoading,
            data: account,
            isError,
        } = useQuery({
            queryKey: ["account"],
            queryFn: async () => {
                try {
                    const { data } = await axiosInstance.get(
                        `/api/bankaccounts/${id}`,
                    );

                    return data;
                } catch (error: any) {
                    console.log(error.response);
                    toast.error(error.response.data.message);
                    navigate(previousLocation ?? "/dashboard");
                }
            },
        }),
        queryClient = useQueryClient();
    const [type, setType] = useState<BankAccType>(account?.type);

    const previousLocation = location.state?.previousPath;

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
            /* if (data.cuttOffDay && data.paydayLimit) {
                data.cuttOffDay = dayjs(data.cuttOffDay).toDate();
                data.paydayLimit = dayjs(data.paydayLimit).toDate();
            } */
            await axiosInstance.put(`/api/bankaccounts/${id}`, data);
            await queryClient.refetchQueries({
                queryKey: ["account"],
            });
            toast.success("Cuenta actualizada exitosamente");
            setShowModal(false);
        } catch (error: any) {
            console.log(error.response);
        }
    };
    const handleDelete = () => {
        toast("Esta acción es irreversible, estás seguro?", {
            action: {
                label: "Eliminar",
                onClick: async () => {
                    try {
                        await axiosInstance.delete(`/api/bankaccounts/${id}`);
                        await queryClient.refetchQueries({
                            queryKey: ["accounts"],
                        });
                        toast.success("Cuenta eliminada exitosamente");
                        navigate(previousLocation ?? "/dashboard");
                    } catch (error: any) {
                        console.log(error.response);
                        toast.error(error.response.data.message);
                    }
                },
            },
        });
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }
    if (isError) {
        toast.error("Ha ocurrido un error recuperando tus datos");
        navigate(previousLocation ?? "/dashboard");
    }
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
                                        Resumen de tu cuenta
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
                                            defaultValue={account.name}
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
                                            defaultValue={account?.type}
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
                                            <MenuItem
                                                value={"debit"}
                                                key="debit"
                                            >
                                                Débito
                                            </MenuItem>
                                            <MenuItem
                                                value={"credit"}
                                                key="credit"
                                            >
                                                Crédito
                                            </MenuItem>
                                            <MenuItem value={"dual"} key="dual">
                                                Dual
                                            </MenuItem>
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
                                                    defaultValue={
                                                        account?.balance
                                                    }
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
                                                    defaultValue={
                                                        account?.totalCredit
                                                    }
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
                                                    defaultValue={
                                                        account?.availableCredit
                                                    }
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
                                                            account?.cuttOffDay,
                                                        ).toDate()}
                                                        rules={{
                                                            required: true,
                                                        }}
                                                        render={({ field }) => (
                                                            <MobileDatePicker
                                                                label="Dia de corte*"
                                                                views={["day"]}
                                                                defaultValue={dayjs(
                                                                    account?.cuttOffDay,
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
                                                            account?.paydayLimit,
                                                        ).toDate()}
                                                        rules={{
                                                            required: true,
                                                        }}
                                                        render={({ field }) => (
                                                            <MobileDatePicker
                                                                label="Dia límite de pago*"
                                                                views={["day"]}
                                                                defaultValue={dayjs(
                                                                    account?.paydayLimit,
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
                                            defaultValue={account?.color}
                                            //React-hook-form
                                            {...register("color", {
                                                required: true,
                                            })}
                                        >
                                            <MenuItem
                                                value={"yellow"}
                                                key="yellow"
                                            >
                                                Amarillo
                                            </MenuItem>
                                            <MenuItem value={"blue"} key="blue">
                                                Azul
                                            </MenuItem>
                                            <MenuItem
                                                value={"white"}
                                                key="white"
                                            >
                                                Blanco
                                            </MenuItem>
                                            <MenuItem
                                                value={"brown"}
                                                key="brown"
                                            >
                                                Café
                                            </MenuItem>
                                            <MenuItem value={"cyan"} key="cyan">
                                                Cyan
                                            </MenuItem>
                                            <MenuItem value={"gray"} key="gray">
                                                Gris
                                            </MenuItem>
                                            <MenuItem
                                                value={"purple"}
                                                key="purple"
                                            >
                                                Morado
                                            </MenuItem>
                                            <MenuItem
                                                value={"orange"}
                                                key="orange"
                                            >
                                                Naranja
                                            </MenuItem>
                                            <MenuItem
                                                value={"black"}
                                                key="black"
                                            >
                                                Negro
                                            </MenuItem>
                                            <MenuItem value={"red"} key="red">
                                                Rojo
                                            </MenuItem>
                                            <MenuItem value={"pink"} key="pink">
                                                Rosa
                                            </MenuItem>
                                            <MenuItem
                                                value={"green"}
                                                key="green"
                                            >
                                                Verde
                                            </MenuItem>
                                        </TextField>
                                    </div>
                                    {/*footer*/}

                                    <div className="flex items-center justify-center gap-5">
                                        <GradientButton
                                            size="lg"
                                            styles="my-3"
                                            color="pinkOrange"
                                            onClick={handleDelete}
                                            type="button"
                                        >
                                            Eliminar
                                        </GradientButton>
                                        <GradientButton
                                            size="lg"
                                            styles="my-3"
                                            type="submit"
                                            color="tealLime"
                                        >
                                            Actualizar
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

export default UpdateAccountModal;
