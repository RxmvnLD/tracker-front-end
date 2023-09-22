import { Link } from "react-router-dom";
import { Transaction as TransactionType } from "../../types";
import { MdAttachMoney, MdMoneyOff } from "react-icons/md";
import TransactionDetailsModal from "./TransactionDetailsModal";
import { useState } from "react";
const TransactionCard = ({ amount, id, name, type }: TransactionType) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <section
            className={`${
                type === "income"
                    ? "bg-[#78ff786e]  border-[#78ff78] "
                    : "bg-[#ff55556e] border-[#ff5555]"
            } min-h-min w-72 rounded-xl flex flex-col items-center gap-2 border-2 border-solid shrink-0 p-2 justify-center`}
        >
            {type === "income" ? (
                <MdAttachMoney className="self-center text-3xl text-green-500" />
            ) : (
                <MdMoneyOff className="self-center text-3xl text-red-500" />
            )}
            <h2 className="m-0 text-base">{name}</h2>
            <div className="flex flex-wrap items-center gap-5">
                <p className="items-center gap-3 m-0 text-sm">
                    Cantidad: ${amount.toFixed(2)}
                </p>
                <p className="flex flex-row items-center gap-3 m-0 text-sm">
                    Tipo: {type === "expense" ? "Gasto" : "Ingreso"}
                </p>
            </div>
            <button
                className="m-0 text-white bg-transparent text-base"
                onClick={() => {
                    setShowModal(true);
                }}
            >
                Ver detalles
            </button>
            <TransactionDetailsModal
                showModal={showModal}
                setShowModal={(bool: boolean) => setShowModal(bool)}
                id={id}
            />
        </section>
    );
};

export default TransactionCard;
