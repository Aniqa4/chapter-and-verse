import { useEffect, useState } from 'react';
import { MdEdit, MdShoppingBag, MdLogout, MdPerson, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import UserInfo from '../Hooks/UserInfo';
import LogOut from '../Hooks/LogOut';
import axiosInstance from '../api/axiosInstance';
import EditProfileForm from '../Components/EditProfileForm';

const ORDER_BADGE = {
  pending:    'bg-yellow-50 text-yellow-700 border-yellow-100',
  processing: 'bg-blue-50 text-blue-700 border-blue-100',
  shipped:    'bg-purple-50 text-purple-700 border-purple-100',
  delivered:  'bg-green-50 text-green-700 border-green-100',
  cancelled:  'bg-red-50 text-red-600 border-red-100',
};

const PAYMENT_BADGE = {
  pending:  'bg-yellow-50 text-yellow-700 border-yellow-100',
  paid:     'bg-green-50 text-green-700 border-green-100',
  failed:   'bg-red-50 text-red-600 border-red-100',
  refunded: 'bg-gray-100 text-gray-500 border-gray-200',
};

const fmt = d => new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

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

  const initials = userInfo?.name
    ? userInfo.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <>
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">

          {/* Profile card */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Banner */}
              <div className="h-20 bg-gradient-to-r from-green-600 to-green-400" />
              <div className="px-5 pb-5">
                <div className="-mt-8 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-white shadow flex items-center justify-center text-2xl font-bold text-green-700 select-none">
                    {initials}
                  </div>
                </div>
                <h2 className="font-bold text-gray-800 text-base leading-tight">{userInfo?.name || 'User'}</h2>
                <p className="text-xs text-gray-400 mt-0.5 mb-4 capitalize">{userInfo?.role || 'user'}</p>

                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-2.5 text-gray-500">
                    <MdEmail size={15} className="text-gray-300 flex-shrink-0" />
                    <span className="truncate text-xs">{userInfo?.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-500">
                    <MdPhone size={15} className="text-gray-300 flex-shrink-0" />
                    <span className="text-xs">{userInfo?.phoneNumber || <span className="text-gray-300 italic">No phone</span>}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-500">
                    <MdLocationOn size={15} className="text-gray-300 flex-shrink-0" />
                    <span className="text-xs">{userInfo?.address || <span className="text-gray-300 italic">No address</span>}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 mt-4 pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-green-700 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <MdEdit size={15} />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <MdLogout size={15} />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <MdShoppingBag size={18} className="text-gray-400" />
              <h2 className="text-base font-bold text-gray-800">My Orders</h2>
              {!loadingOrders && (
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium ml-1">{orders.length}</span>
              )}
            </div>

            {loadingOrders ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 h-24 animate-pulse" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 py-16 text-center shadow-sm">
                <MdShoppingBag size={40} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm font-medium">No orders yet</p>
                <p className="text-gray-300 text-xs mt-1">Your purchases will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${ORDER_BADGE[order.orderStatus] || 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                            {order.orderStatus}
                          </span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${PAYMENT_BADGE[order.paymentStatus] || 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                            {order.paymentStatus}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{fmt(order.createdAt)}</p>
                      </div>
                      <p className="text-base font-bold text-red-600">{order.totalAmount} Tk</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
                      {order.books.map((b, i) => (
                        <div key={i} className="flex justify-between text-sm text-gray-600">
                          <span className="truncate max-w-[60%]">{b.bookName}</span>
                          <span className="text-gray-400 ml-2 flex-shrink-0">×{b.quantity} · {b.price} Tk</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {editingProfile && (
        <EditProfileForm userInfo={userInfo} onClose={() => setEditingProfile(false)} />
      )}
    </>
  );
}

export default UserDashboard;
