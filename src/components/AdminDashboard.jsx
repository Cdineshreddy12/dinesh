import AdminOrderPanel from "./AdminPanel";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";
export default function AdminDashboard()
{
    // this is admin root layout
    return(
         <>
            <AdminHeader/>
            <Outlet />
         </>
    );
}