import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../authProvider/AuthProvider';
import axiosInstance from '../api/axiosInstance';

function UserInfo() {
    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (!user) {
            setUserInfo(null);
            return;
        }
        axiosInstance.get('/me')
            .then(res => setUserInfo(res.data))
            .catch(() => setUserInfo(null));
    }, [user]);

    const role = userInfo?.role;
    return [role, userInfo];
}

export default UserInfo