import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

interface AccountGraphProps {
    balance?: number;
    totalCredit?: number;
    availableCredit?: number;
}
const AccountGraph = ({
    balance,
    totalCredit,
    availableCredit,
}: AccountGraphProps) => {
    let debt = 0;
    if (totalCredit && availableCredit) debt = totalCredit - availableCredit;
    const data = {
        labels: ["Deuda", "Crédito disponible", "Balance"],
        datasets: [
            {
                id: 1,
                label: "$",
                data: [debt, availableCredit, balance],
                backgroundColor: ["#3b58ff6e", "#ffffff6e", "#78ff786e"],
                borderColor: ["#3b58ff", "#ffff", "#78ff78"],
                borderWidth: 2.5,
            },
        ],
    };
    return <Doughnut data={data} />;
};

export default AccountGraph;
