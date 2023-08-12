import { AnimatePresence, motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
export default function HomePage() {
    return (
        <AnimatePresence>
            <div className="relative flex flex-col w-screen min-h-screen overflow-hidden sm:min-h-screen font-inter bg-gradient-to-b from-gray-900 to-gray-600">
                <main className="flex flex-col my-auto justify-center static w-screen overflow-hidden grid-rows-[1fr_repeat(3,auto)_1fr] z-[100] py-auto px-4 md:px-20 md:py-0">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.15,
                            duration: 0.95,
                            ease: [0.165, 0.84, 0.44, 1],
                        }}
                        className="row-start-2 text-lg font-black md:text-3xl"
                    >
                        TRVK3R
                    </motion.h2>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.15,
                            duration: 0.95,
                            ease: [0.165, 0.84, 0.44, 1],
                        }}
                        className="font-extrabold text-5xl md:text-6xl my-0 font-inter leading-[1.2] tracking-[-2px] z-[100]"
                    >
                        Control total, <br />
                        finanzas <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-violet-200 to-violet-500">
                            simplificadas
                        </span>
                        <span className="text-transparent font-inter bg-clip-text bg-gradient-to-b from-violet-200 to-violet-500">
                            .
                        </span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.15,
                            duration: 0.95,
                            ease: [0.165, 0.84, 0.44, 1],
                        }}
                        className="flex flex-row justify-center z-20 mx-0 mb-0 mt-8 md:mt-0 md:mb-[35px] max-w-2xl md:space-x-8"
                    >
                        <div className="w-1/2">
                            <h2 className="flex items-center font-semibold text-[1em]">
                                Dashboard
                            </h2>
                            <p className="text-[14px] leading-[20px] font-normal">
                                Gestiona tus ingresos y gastos de forma fácil y
                                rápida.
                            </p>
                        </div>
                        <div className="w-1/2">
                            <h2 className="flex items-center font-semibold text-[1em] text">
                                Tu asistente
                            </h2>
                            <p className="text-[14px] leading-[20px]  font-normal">
                                Actualiza en cualquier momento, desde cualquier
                                dispositivo.
                            </p>
                        </div>
                    </motion.div>

                    <div className="flex gap-[15px] mt-8 md:mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.55,
                                duration: 0.55,
                                ease: [0.075, 0.82, 0.965, 1],
                            }}
                        >
                            <Link
                                to="/ignup"
                                className="group rounded-full pl-[8px] min-w-[180px] pr-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-gray-800 text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
                                style={{
                                    boxShadow:
                                        "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px bg-gray-800, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                                }}
                            >
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-400">
                                    <FiMail />
                                </span>
                                Registrate
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.65,
                                duration: 0.55,
                                ease: [0.075, 0.82, 0.965, 1],
                            }}
                        >
                            <Link
                                to="/login"
                                className="group rounded-full px-4 py-2 text-[13px] font-bold transition-all flex items-center gap-2 justify-center bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900 no-underline active:scale-95 scale-100 duration-75 "
                            >
                                Ingresa{" "}
                                <BsArrowRight className="font-black"></BsArrowRight>
                            </Link>
                            {/* <Link
                                href="/auth/login"
                                className="group rounded-full px-4 py-2 text-[13px] font-bold transition-all flex items-center gap-2 justify-center bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900 no-underline active:scale-95 scale-100 duration-75 "
                            >
                                Ingresa{" "}
                                <BsArrowRight className="font-black"></BsArrowRight>
                            </Link> */}
                        </motion.div>
                    </div>
                </main>

                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.15,
                        duration: 0.55,
                        ease: [0.075, 0.82, 0.965, 1],
                    }}
                    style={{
                        clipPath:
                            "polygon(60px 0, 100% 0,calc(100% + 225px) 100%, 650px 100%)",
                    }}
                    className="z-50 fixed top-0 right-[-2px] w-[80%] md:w-1/2 h-screen bg-gradient-to-t from-violet-300 to-violet-700 shadow-2xl shadow-violet-500"
                ></motion.div>
            </div>
        </AnimatePresence>
    );
}
