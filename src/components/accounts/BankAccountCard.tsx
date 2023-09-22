import { Link, useLocation } from "react-router-dom";
import { BankAccountCard as BankAccountType } from "../../types/index.ts";
import {
    SummaryBankAccountsColors,
    BankAccountsType,
} from "../../config/constants.ts";
import ProgressBar from "../ProgressBar.tsx";

const BankAccountCard = ({
    name,
    type,
    color,
    id,
    balance,
    totalCredit,
    availableCredit,
}: BankAccountType) => {
    const { pathname } = useLocation();
    return (
        <section
            className={`bg-[${SummaryBankAccountsColors[color].value}6e] border-[${SummaryBankAccountsColors[color].value}] h-40 w-72 rounded-xl flex flex-col items-center gap-2 justify-center border-2 border-solid shrink-0 p-2 px-6`}
        >
            <h2 className="m-0 text-base">{name}</h2>
            <p className="m-0 text-sm">Tipo: {BankAccountsType[type].value}</p>
            {type === "credit" && (
                <>
                    <ProgressBar
                        max={totalCredit as number}
                        value={availableCredit as number}
                    />
                    <div className="flex gap-5">
                        <p className="m-0 text-[0.6em]">
                            Disponible: ${availableCredit?.toFixed(2)}
                        </p>
                        <p className="m-0 text-[0.6em]">
                            Crédito total: ${totalCredit?.toFixed(2)}
                        </p>
                    </div>
                </>
            )}
            {type === "debit" && (
                <p className="items-center gap-3 m-0 text-sm">
                    Balance: {balance?.toFixed(2)}
                </p>
            )}

            {type === "dual" && (
                <>
                    <ProgressBar
                        max={totalCredit as number}
                        value={availableCredit as number}
                    />
                    <div className="flex gap-5 text-center">
                        <p className="m-0 text-[0.6em]">
                            Disponible: ${availableCredit?.toFixed(2)}
                        </p>
                        <p className="m-0  text-[0.6em]">
                            Balance: ${balance?.toFixed(2)}
                        </p>
                        <p className="m-0 text-[0.6em]">
                            Crédito total: ${totalCredit?.toFixed(2)}
                        </p>
                    </div>
                </>
            )}
            <Link
                to={`/bankaccounts/${id}`}
                className="m-0 text-white decoration-transparent"
                state={{ previousPath: pathname }}
            >
                Ver detalles
            </Link>
        </section>
    );
};

export default BankAccountCard;
