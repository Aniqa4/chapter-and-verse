import UserInfo from "../Hooks/UserInfo";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import UserDashboard from "./UserDashboard";

function Dashboard() {
  const [role] = UserInfo();
  
  return (
    <div>
       {
        role==='admin' && <AdminDashboard/>
       }
       {
        role==='user' && <UserDashboard/>
       }
    </div>
  )
}

export default Dashboard