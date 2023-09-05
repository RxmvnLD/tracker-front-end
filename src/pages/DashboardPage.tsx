import MainLayout from "../layouts/MainLayout";
import Summary from "../components/Summary";
import DashboardTransactions from "../components/DashboardTransactions";
import DashboardBankAccounts from "../components/DashboardBankAccounts";
const DashboardPage = () => {
    return (
        <MainLayout>
            <Summary />
            <DashboardBankAccounts />
            <DashboardTransactions />
        </MainLayout>
    );
};

export default DashboardPage;
