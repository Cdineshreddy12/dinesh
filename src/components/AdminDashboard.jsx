import AdminOrderPanel from "./AdminPanel";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";
export default function AdminDashboard()
{
    return(
         <>
            <AdminHeader/>
            <Outlet />
         </>
    );
}