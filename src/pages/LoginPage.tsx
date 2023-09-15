import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import GradientButton from "../components/GradientButton";
import { AnimatePresence, motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL } from "../config/env";
import { AuthenticatedUser } from "../types";

interface Inputs {
    email: string;
    password: string;
}

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onChange" });
    const setUserData = useAuthStore((state) => state.setUserData),
        setIsLogged = useAuthStore((state) => state.setIsLogged);

    const onSubmit: SubmitHandler<Inputs> = async (inputData, e) => {
        e?.preventDefault();
        interface LoginResponse {
            data: { user: AuthenticatedUser };
        }
        try {
            const {
                data: { user },
            }: LoginResponse = await axios.post(
                `${BASE_URL}/api/login`,
                inputData,
            );
            setUserData(user);
            setIsLogged(true);
            toast.success(`Bienvenido ${user.username}`);
        } catch (error: any) {
            toast.error(error.response.data.message);
            return;
        }
    };

    const isValidEmail = (email: string) =>
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email,
        );

    return (
        <AnimatePresence>
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.15,
                    duration: 0.95,
                    ease: [0.165, 0.84, 0.44, 1],
                }}
                className="flex flex-col items-center justify-center w-full p-5 shadow-lg h-1/2 rounded-xl shadow-violet-500 md:px-10 md:w-2/3 lg:w-1/2 xl:w-1/3 max-h-conten"
            >
                <h1 className="my-0">Accede a tu cuenta</h1>
                <form
                    className="flex flex-col items-center w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        label="Email"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: { isValidEmail },
                        })}
                        error={errors.email ? true : false}
                        aria-invalid={errors.email ? true : false}
                        helperText={
                            errors.email ? "Ingresa un email valido" : ""
                        }
                    />
                    <TextField
                        label="Password"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="text-purple-300" />
                                        ) : (
                                            <FaEye className="text-purple-300" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 30,
                        })}
                        error={errors.password ? true : false}
                        aria-invalid={errors.password ? true : false}
                        helperText={
                            errors.password
                                ? "La contraseña debe tener entre 6 y 30 caracteres"
                                : ""
                        }
                    />
                    <GradientButton size="xl" styles="my-3" type="submit">
                        Iniciar sesión
                    </GradientButton>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <Link to="" className="text-primary">
                            {"Olvidé mi contraseña"}
                        </Link>

                        <Link to="/signup" className="text-primary">
                            {"No tienes cuenta? Registrate"}
                        </Link>
                    </div>
                </form>
            </motion.section>
        </AnimatePresence>
    );
};

export default LoginPage;
