import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Content from "./Content";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="nav">
                <Navbar />
            </div>

            <div className="main flex-grow" style={{ height: 'calc(100vh - var(--navbar-height))' }}>
                <Content />
            </div>

            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}