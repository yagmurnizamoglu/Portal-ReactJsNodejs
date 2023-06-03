import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";


const Layout = () => {
    return (
        <>
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;