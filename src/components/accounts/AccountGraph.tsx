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
    const data = {
        labels: ["Crédito total", "Crédito disponible", "Balance"],
        datasets: [
            {
                id: 1,
                label: "$",
                data: [totalCredit, availableCredit, balance],
                backgroundColor: ["#3b58ff6e", "#ffffff6e", "#78ff786e"],
                borderColor: ["#3b58ff", "#ffff", "#78ff78"],
                borderWidth: 2.5,
            },
        ],
    };
    return <Doughnut data={data} />;
};

export default AccountGraph;
