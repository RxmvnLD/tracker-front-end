import MainLayout from "../layouts/MainLayout";
import Summary from "../components/Summary";
import DashboardTransactions from "../components/DashboardTransactions";
const DashboardPage = () => {
    return (
        <MainLayout>
            <Summary />
            <DashboardTransactions />
        </MainLayout>
    );
};

export default DashboardPage;
