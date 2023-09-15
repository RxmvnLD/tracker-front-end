import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { SummaryBankAccountsColors } from "../../config/constants.ts";
import { SummaryBankAccount } from "../../types/index.ts";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IncomesExpensesGraphProps {
    incomes?: number;
    expenses?: number;
}
export const IncomesExpensesGraph = ({
    expenses,
    incomes,
}: IncomesExpensesGraphProps) => {
    const data = {
        labels: ["Gastos", "Ingresos"],
        datasets: [
            {
                id: 1,
                label: "$",
                data: [expenses, incomes],
                backgroundColor: ["#ff55556e", "#78ff786e"],
                borderColor: ["#ff5555", "#78ff78"],
                borderWidth: 2.5,
            },
        ],
    };
    return <Doughnut data={data} />;
};

interface BalanceGraphProps {
    bankAccounts?: SummaryBankAccount[];
}
export const BalanceGraph = ({ bankAccounts }: BalanceGraphProps) => {
    const labels = bankAccounts?.map((acc) => {
        return acc.name;
    });
    const bankAccountsBalance = bankAccounts?.map((acc) => {
        return acc.balance;
    });
    const backgroundColor = bankAccounts?.map((acc) => {
        //The color it's solid in HEX so we add "7e" to make it semi-transparent
        return `${SummaryBankAccountsColors[acc.color].value}6e`;
    });
    const borderColor = bankAccounts?.map((acc) => {
        return SummaryBankAccountsColors[acc.color].value;
    });

    const data = {
        labels,
        datasets: [
            {
                id: 1,
                label: "$",
                data: bankAccountsBalance,
                backgroundColor,
                borderColor,
                borderWidth: 2.5,
            },
        ],
    };
    return <Doughnut data={data} />;
};
