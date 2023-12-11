import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Authentication/AuthProvider/AuthProvider';
import axios from 'axios';

function UserInfo() {
    const {user}=useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      axios.get(`https://chapter-and-verse-server-side.vercel.app/users`)
        .then(data => setUsers(data.data))
    }, []);

    const userInfo=users?.find(x=>x?.email===user?.email)
    const role=userInfo?.role
    
  return [role,userInfo]
}

export default UserInfo