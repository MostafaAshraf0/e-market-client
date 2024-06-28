import UsersList from "@/components/UsersList";
import AdminDashboard from "../page";
import AdminNv from "../../page";

export default function Allusers(){
    return(
        <>
        <div>
        <AdminNv/>
            <UsersList/>
        </div>
        </>
    );
}