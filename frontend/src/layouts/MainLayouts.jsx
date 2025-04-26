import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminSidebar from "../components/AdminSidebar";

export default function MainLayout() {
    const location = useLocation();
    const userRole = "admin";

    const isDashboard = location.pathname.startsWith("/dashboard");
    const isHome = location.pathname.startsWith("/home")

    return (
        <div className="flex">
            <div className="flex-grow">
                <header>
                    <Navbar />
                </header>
                <main>
                    {
                        isDashboard   &&
                        <div className="flex min-h-screen bg-gray-100">
                        {userRole === "admin" && isDashboard && <AdminSidebar />}
                        <Outlet />
                    </div>

                    }
                        {!isDashboard && <Outlet />}
                </main>
                {isHome && <Footer />}
            </div>
        </div>
    );
}
