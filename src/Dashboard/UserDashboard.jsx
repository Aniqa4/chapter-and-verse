import { useEffect, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { AiTwotoneMail, AiOutlineEdit } from 'react-icons/ai';
import { IoIosPhonePortrait } from 'react-icons/io';
import { ImAddressBook } from 'react-icons/im';
import UserInfo from '../Hooks/UserInfo';
import Title from '../Components/Title';
import LogOut from '../Hooks/LogOut';
import axiosInstance from '../api/axiosInstance';
import EditProfileForm from '../Components/EditProfileForm';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const PAYMENT_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-600',
};

function UserDashboard() {
  const { handleSignOut } = LogOut();
  const [, userInfo] = UserInfo();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);

  useEffect(() => {
    axiosInstance.get('/my-orders')
      .then(res => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  }, []);

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <>
    <div className="my-5 md:my-0 grid md:flex gap-10">
      <div className="bg-gray-100 lg:h-screen">
        <div className="p-5 md:p-10 grid gap-5 text-xs md:text-base">
          <h1 className="flex items-center gap-2">
            <BiUser />
            <span className="font-semibold">{userInfo?.name}</span>
          </h1>
          <p className="flex items-center gap-2">
            <AiTwotoneMail />
            {userInfo?.email}
          </p>
          <p className="flex items-center gap-2">
            <IoIosPhonePortrait />
            <span>{userInfo?.phoneNumber || 'Add Phone Number'}</span>
            <button onClick={() => setEditingProfile(true)} title="Edit profile"><AiOutlineEdit /></button>
          </p>
          <p className="flex items-center gap-2">
            <ImAddressBook />
            <span>{userInfo?.address || 'Add address'}</span>
            <button onClick={() => setEditingProfile(true)} title="Edit profile"><AiOutlineEdit /></button>
          </p>
          <button
            onClick={handleSignOut}
            className="w-36 border border-gray-600 py-3 px-6 font-semibold hover:bg-gray-200 hover:border-red-700"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="w-full mx-5 overflow-x-auto">
        <Title title="My Orders" />
        {loadingOrders ? (
          <p className="text-gray-400 text-sm">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-sm">You have no orders yet.</p>
        ) : (
          <div className="grid gap-4">
            {orders.map(order => (
              <div key={order._id} className="border rounded p-4 shadow-sm">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                  <p className="text-xs text-gray-400">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold ${STATUS_COLORS[order.orderStatus] || ''}`}>
                    {order.orderStatus}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold ${PAYMENT_COLORS[order.paymentStatus] || ''}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <table className="w-full text-sm text-gray-600">
                  <tbody>
                    {order.books.map((b, i) => (
                      <tr key={i} className="border-t">
                        <td className="py-1 pr-4">{b.bookName}</td>
                        <td className="py-1 pr-4">Ã—{b.quantity}</td>
                        <td className="py-1">{b.price} Tk</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-right font-semibold mt-2 text-gray-700">
                  Total: <span className="text-red-700">{order.totalAmount} Tk</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {editingProfile && (
      <EditProfileForm userInfo={userInfo} onClose={() => setEditingProfile(false)} />
    )}
    </>
  );
}

export default UserDashboard;
