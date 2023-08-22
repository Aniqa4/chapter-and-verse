import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Authentication/AuthProvider/AuthProvider';

function UserInfo() {
    const {user}=useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch(`https://chapter-and-verse-server-side.vercel.app/users`)
        .then(res => res.json())
        .then(data => setUsers(data))
    }, []);
    const userInfo=users?.find(x=>x?.email===user?.email)
    const role=userInfo?.role
  return [role,userInfo]
}

export default UserInfo