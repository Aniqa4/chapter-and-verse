import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../../api/axiosInstance';
import Title from '../../Components/Title';

const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded'];

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

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/orders')
      .then(res => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const updateOrderStatus = (id, orderStatus) => {
    axiosInstance.patch(`/order-status/${id}`, { orderStatus })
      .then(res => {
        if (res.data.success) {
          setOrders(prev => prev.map(o => o._id === id ? { ...o, orderStatus } : o));
          Swal.fire({ icon: 'success', title: 'Order status updated', timer: 1200, showConfirmButton: false });
        }
      })
      .catch(() => Swal.fire({ icon: 'error', title: 'Update failed' }));
  };

  const updatePaymentStatus = (id, paymentStatus) => {
    axiosInstance.patch(`/payment-status/${id}`, { paymentStatus })
      .then(res => {
        if (res.data.success) {
          setOrders(prev => prev.map(o => o._id === id ? { ...o, paymentStatus } : o));
          Swal.fire({ icon: 'success', title: 'Payment status updated', timer: 1200, showConfirmButton: false });
        }
      })
      .catch(() => Swal.fire({ icon: 'error', title: 'Update failed' }));
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading) return <div className="p-10 text-gray-400 text-center">Loading orders...</div>;

  return (
    <div className="lg:container lg:mx-auto py-5 mx-5">
      <Title title="Manage Orders" />
      {orders.length === 0 ? (
        <p className="text-center py-10 text-gray-400">No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map(order => (
            <div key={order._id} className="border rounded p-4 shadow-sm">
              <div className="flex flex-wrap gap-3 justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-gray-400">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                  {order.userId ? (
                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      {order.userId.name} â€” <span className="font-normal">{order.userId.email}</span>
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">Guest order</p>
                  )}
                </div>
                <p className="font-semibold text-red-700">{order.totalAmount} Tk</p>
              </div>

              <table className="w-full text-sm text-gray-600 mb-3">
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

              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Order:</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold ${STATUS_COLORS[order.orderStatus] || ''}`}>
                    {order.orderStatus}
                  </span>
                  <select
                    value={order.orderStatus}
                    onChange={e => updateOrderStatus(order._id, e.target.value)}
                    className="text-xs border rounded px-1 py-0.5"
                  >
                    {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Payment:</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold ${PAYMENT_COLORS[order.paymentStatus] || ''}`}>
                    {order.paymentStatus}
                  </span>
                  <select
                    value={order.paymentStatus}
                    onChange={e => updatePaymentStatus(order._id, e.target.value)}
                    className="text-xs border rounded px-1 py-0.5"
                  >
                    {PAYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageOrders;
