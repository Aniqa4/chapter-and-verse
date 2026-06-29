import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MdSearch, MdShoppingBag, MdPending, MdLocalShipping, MdCheckCircle } from 'react-icons/md';
import axiosInstance from '../../api/axiosInstance';

const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded'];

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

function SummaryPill({ icon: Icon, label, value, color }) {
  return (
    <div className={`flex items-center gap-2.5 bg-white border rounded-xl px-4 py-3 shadow-sm ${color}`}>
      <Icon size={18} />
      <div>
        <p className="text-xs text-gray-400 leading-none">{label}</p>
        <p className="text-lg font-bold text-gray-800 leading-tight mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
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
          toast.success('Order status updated');
        }
      })
      .catch(() => toast.error('Update failed'));
  };

  const updatePaymentStatus = (id, paymentStatus) => {
    axiosInstance.patch(`/payment-status/${id}`, { paymentStatus })
      .then(res => {
        if (res.data.success) {
          setOrders(prev => prev.map(o => o._id === id ? { ...o, paymentStatus } : o));
          toast.success('Payment status updated');
        }
      })
      .catch(() => toast.error('Update failed'));
  };

  const filtered = search
    ? orders.filter(o =>
        o._id.toLowerCase().includes(search.toLowerCase()) ||
        o.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
        o.userId?.email?.toLowerCase().includes(search.toLowerCase())
      )
    : orders;

  const pending   = orders.filter(o => o.orderStatus === 'pending').length;
  const shipped   = orders.filter(o => o.orderStatus === 'shipped').length;
  const delivered = orders.filter(o => o.orderStatus === 'delivered').length;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Manage Orders</h1>
        <p className="text-sm text-gray-400 mt-0.5">{orders.length} total orders</p>
      </div>

      {/* Summary pills */}
      {!loading && (
        <div className="flex flex-wrap gap-3 mb-6">
          <SummaryPill icon={MdShoppingBag}    label="Total"     value={orders.length} color="border-gray-100 text-gray-400" />
          <SummaryPill icon={MdPending}        label="Pending"   value={pending}       color="border-yellow-100 text-yellow-500" />
          <SummaryPill icon={MdLocalShipping}  label="Shipped"   value={shipped}       color="border-purple-100 text-purple-500" />
          <SummaryPill icon={MdCheckCircle}    label="Delivered" value={delivered}     color="border-green-100 text-green-600" />
        </div>
      )}

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <MdSearch size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by ID or customer…"
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 h-28 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
          <p className="text-gray-400 text-sm">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(order => (
            <div key={order._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              {/* Order header */}
              <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
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
                  {order.userId ? (
                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      {order.userId.name}
                      <span className="font-normal text-gray-400"> · {order.userId.email}</span>
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 mt-1">Guest order</p>
                  )}
                </div>
                <p className="text-lg font-bold text-red-600">{order.totalAmount} BDT</p>
              </div>

              {/* Books */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-1.5">
                {order.books.map((b, i) => (
                  <div key={i} className="flex justify-between text-sm text-gray-600">
                    <span className="truncate max-w-[60%]">{b.bookName}</span>
                    <span className="text-gray-400 ml-2 flex-shrink-0">×{b.quantity} · {b.price} BDT</span>
                  </div>
                ))}
              </div>

              {/* Status controls */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-400 font-medium">Order:</label>
                  <select
                    value={order.orderStatus}
                    onChange={e => updateOrderStatus(order._id, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:border-green-400 cursor-pointer"
                  >
                    {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-400 font-medium">Payment:</label>
                  <select
                    value={order.paymentStatus}
                    onChange={e => updatePaymentStatus(order._id, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:border-green-400 cursor-pointer"
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
