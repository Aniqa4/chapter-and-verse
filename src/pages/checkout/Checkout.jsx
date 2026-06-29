import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLocalShipping, MdPayment, MdCheckCircle } from 'react-icons/md';
import { AuthContext } from '../../authProvider/AuthProvider';
import { useDispatch } from 'react-redux';
import { CartItems } from '../../redux/features/cart/cartSlice';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'sonner';

function Checkout() {
  const [cartItems, setCartItems] = useState(null); // null = not loaded yet
  const [placing, setPlacing] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', postalCode: '', notes: '' });
  const { user, loading: authLoading } = useContext(AuthContext);
  const dispatch = useDispatch();

  const email = user?.email;
  const storageKey = email ? email + 'cart' : 'cart';

  // Wait for auth to finish loading before reading cart
  useEffect(() => {
    if (authLoading) return;
    const raw = localStorage.getItem(storageKey);
    let items = [];
    try { items = raw ? JSON.parse(raw) : []; } catch { items = []; }
    setCartItems(items);
    if (user?.displayName) setForm(f => ({ ...f, name: user.displayName }));
  }, [authLoading, storageKey, user?.displayName]);

  const subtotal = (cartItems || []).reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);
  const hasItems = cartItems !== null && cartItems.length > 0;

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const books = cartItems.map(item => ({ bookId: item.product_id, quantity: item.quantity || 1 }));
    const shippingInfo = { name: form.name, phone: form.phone, address: form.address, city: form.city, postalCode: form.postalCode, notes: form.notes };

    setPlacing(true);
    axiosInstance.post('/place-order', { books, shippingInfo })
      .then(() => {
        localStorage.setItem(storageKey, JSON.stringify([]));
        dispatch(CartItems(0));
        setCartItems([]);
        setOrdered(true);
        toast.success('Order placed successfully!');
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Order failed. Please try again.');
      })
      .finally(() => setPlacing(false));
  };

  // Loading state
  if (authLoading || cartItems === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Empty cart — redirect prompt
  if (!authLoading && cartItems !== null && cartItems.length === 0 && !ordered) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <p className="text-gray-500 mb-6">Your cart is empty. Add some books first.</p>
          <Link to="/books" className="bg-green-700 text-white px-6 py-2.5 font-semibold hover:bg-green-800 rounded-lg text-sm">
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (ordered) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <MdCheckCircle className="text-green-500 text-7xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
          <p className="text-gray-500 text-sm mb-8">
            Thank you for your purchase. You can track your order status from the dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard" className="bg-green-700 text-white px-6 py-2.5 font-semibold hover:bg-green-800 rounded-lg text-sm">
              Track Order
            </Link>
            <Link to="/books" className="border border-gray-200 text-gray-700 px-6 py-2.5 font-semibold hover:bg-gray-50 rounded-lg text-sm">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-5">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">Checkout</h1>
          <div className="flex items-center gap-2 mt-3 text-sm">
            <Link to="/cart" className="text-green-600 font-medium hover:underline">Cart</Link>
            <span className="text-gray-300">›</span>
            <span className="text-gray-800 font-semibold">Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <form onSubmit={handleOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left — forms */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Shipping */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <MdLocalShipping className="text-green-700 text-xl" />
                  <h2 className="text-base font-bold text-gray-800">Shipping Information</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="John Doe" required
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="01XXXXXXXXX" required
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="address" value={form.address} onChange={handleChange}
                      placeholder="House no, Road, Area" required
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="city" value={form.city} onChange={handleChange}
                      placeholder="Dhaka" required
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Postal Code</label>
                    <input
                      type="text" name="postalCode" value={form.postalCode} onChange={handleChange}
                      placeholder="1200"
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Order Notes (optional)</label>
                    <textarea
                      name="notes" value={form.notes} onChange={handleChange}
                      placeholder="Any special instructions..." rows={3}
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200 transition resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <MdPayment className="text-green-700 text-xl" />
                  <h2 className="text-base font-bold text-gray-800">Payment Method</h2>
                </div>
                <div className="flex items-center gap-3 border border-green-500 bg-green-50 rounded-lg p-4">
                  <div className="w-4 h-4 rounded-full border-2 border-green-600 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Cash on Delivery</p>
                    <p className="text-xs text-gray-500 mt-0.5">Pay when your order arrives</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-6">
                <h2 className="text-lg font-bold text-gray-800 mb-5">Order Summary</h2>

                <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <img src={item.bookImage} alt={item.bookName}
                        className="w-12 h-16 object-cover rounded bg-gray-100 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-700 line-clamp-2 leading-tight">{item.bookName}</p>
                        <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity || 1}</p>
                        <p className="text-xs font-bold text-gray-800 mt-0.5">
                          {(Number(item.price) * (item.quantity || 1)).toFixed(0)} Tk
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed border-gray-200 my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span>
                    <span className="font-medium">{subtotal.toFixed(0)} Tk</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4 mb-6">
                  <div className="flex justify-between font-bold text-gray-800 text-base">
                    <span>Total</span>
                    <span className="text-red-700">{subtotal.toFixed(0)} Tk</span>
                  </div>
                </div>

                <button
                  type="submit" disabled={placing}
                  className="w-full bg-green-700 text-white py-3 font-semibold hover:bg-green-800 transition-colors rounded-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {placing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <MdCheckCircle size={18} />
                      Place Order
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  By placing your order you agree to our terms & conditions.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
