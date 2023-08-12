import { useEffect } from "react";
import { axiosGet } from "../utils/axiosInstance";
const DashboardPage = () => {
    const getAccounts = async () => {
        try {
            const userData = await axiosGet("/api/users");
            console.log(userData);
        } catch (error: any) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAccounts();
    }, []);

    return <div>DashboardPage</div>;
};

export default DashboardPage;
