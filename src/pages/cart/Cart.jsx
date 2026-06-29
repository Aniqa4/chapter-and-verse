import { useContext, useEffect, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { BsCart3 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Title from '../../Components/Title';
import { AuthContext } from '../../authProvider/AuthProvider';
import { useDispatch } from 'react-redux';
import { CartItems } from '../../redux/features/cart/cartSlice';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const email = user?.email;
  const storageKey = email ? email + 'cart' : 'cart';

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    setCartItems(raw ? JSON.parse(raw) : []);
  }, [storageKey]);

  const deleteItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setCartItems(updated);
    dispatch(CartItems(updated.length));
  };

  const updateQuantity = (index, qty) => {
    if (qty < 1) return;
    const updated = cartItems.map((item, i) => i === index ? { ...item, quantity: qty } : item);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setCartItems(updated);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const hasItems = cartItems.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-5">
          <Title title="My Cart" />
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {!hasItems ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BsCart3 className="text-gray-300 text-8xl mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven&apos;t added anything yet.</p>
            <Link
              to="/books"
              className="bg-green-700 text-white px-8 py-3 font-semibold hover:bg-green-800 transition-colors"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <p className="text-sm text-gray-500 font-medium">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in cart</p>
              {cartItems.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex gap-4">
                  <img
                    src={item.bookImage}
                    alt={item.bookName}
                    className="w-20 h-28 object-cover rounded flex-shrink-0 bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1 line-clamp-2">
                      {item.bookName}
                    </h3>
                    <p className="text-green-700 font-bold text-base mt-1">{item.price} BDT</p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                          className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <HiMinus size={14} />
                        </button>
                        <span className="px-4 py-1.5 text-sm font-semibold text-gray-800 border-x border-gray-200 min-w-[40px] text-center">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                          className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <HiPlus size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-bold text-gray-800">
                          {(item.price * (item.quantity || 1)).toFixed(0)} BDT
                        </span>
                        <button
                          onClick={() => deleteItem(index)}
                          className="text-red-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <MdDeleteOutline size={22} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/books" className="text-green-700 text-sm font-medium hover:underline mt-2 inline-block">
                ← Continue Shopping
              </Link>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-6">
                <h2 className="text-lg font-bold text-gray-800 mb-5">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex justify-between text-gray-600">
                      <span className="truncate max-w-[60%]">{item.bookName}</span>
                      <span className="font-medium ml-2 flex-shrink-0">
                        {(item.price * (item.quantity || 1)).toFixed(0)} BDT
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed border-gray-200 my-4" />

                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span className="font-medium">{subtotal.toFixed(0)} BDT</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-bold text-gray-800 text-base">
                    <span>Total</span>
                    <span className="text-red-700">{subtotal.toFixed(0)} BDT</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full bg-green-700 text-white py-3 font-semibold hover:bg-green-800 transition-colors rounded-lg text-center block"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
