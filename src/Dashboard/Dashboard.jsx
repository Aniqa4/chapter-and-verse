import UserInfo from "../Hooks/UserInfo";
import AdminDashboard from "./AdminDashboard/AdminDashboard";

function Dashboard() {
  const [role] = UserInfo();
 
  return (
    <div>
       {
        role==='admin' && <AdminDashboard/>
       }
    </div>
  )
}

export default Dashboard