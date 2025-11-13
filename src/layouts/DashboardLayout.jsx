
import { Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navber from "../components/Navber";
import Footer from "../components/Footer";
import DashNavbar from "../components/DashNavbar";

const DashboardLayout = () => {
    const { user } = useAuth();
    

    return (
        <div className="max-w-[1440px] mx-auto">
            <div>
                <Navber />
            </div>
            <div>
               
               
                <div className="flex justify-center bg-blue-800 text-white p-2">
                    <DashNavbar />
                </div>
                <main className="flex-1 p-6 bg-blue-300">
                    <Outlet />
                </main>
            </div>
            <div>
                <Footer />
            </div>

        </div>
    );
};

export default DashboardLayout;
