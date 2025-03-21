import { Outlet } from "react-router-dom";

export default function Content() {
    return (
        <div className="flex-grow overflow-y-auto">
            <Outlet />
        </div>
    );
}