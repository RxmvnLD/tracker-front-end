import Summary from "../components/dashboard/Summary";
import DashboardTransactions from "../components/dashboard/DashboardTransactions";
import DashboardBankAccounts from "../components/dashboard/DashboardBankAccounts";
const DashboardPage = () => {
    return (
        <>
            <Summary />
            <DashboardBankAccounts />
            <DashboardTransactions />
        </>
    );
};

export default DashboardPage;
