import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div>
            <header>Header here</header>
            <main>
                <Outlet />
            </main>
            <footer>Footer here</footer>
        </div>
    );
}
