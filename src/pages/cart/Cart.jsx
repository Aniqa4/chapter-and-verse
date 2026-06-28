import { useContext, useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import Title from '../../components/Title';
import { AuthContext } from '../../authProvider/AuthProvider';
import { useDispatch } from 'react-redux';
import { CartItems } from '../../redux/features/cart/cartSlice';
import axiosInstance from '../../api/axiosInstance';
import Swal from 'sweetalert2';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [placing, setPlacing] = useState(false);
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

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const books = cartItems.map(item => ({
      bookId: item.product_id,
      quantity: item.quantity || 1,
    }));

    setPlacing(true);
    axiosInstance.post('/place-order', { books })
      .then(() => {
        localStorage.setItem(storageKey, JSON.stringify([]));
        setCartItems([]);
        dispatch(CartItems(0));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Order placed successfully!',
          text: 'You can track it in your dashboard.',
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Order failed',
          text: err.response?.data?.message || 'Something went wrong. Please try again.',
        });
      })
      .finally(() => setPlacing(false));
  };

  const hasItems = cartItems.length > 0 && cartItems[0] !== undefined;

  return (
    <div className="pt-1">
      <Title title="Cart" />
      <div className="container mx-auto px-4">
        <table className="w-full text-gray-600 font-semibold">
          <tbody>
            {hasItems ? (
              cartItems.map((x, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2"><img src={x.bookImage} className="w-16" alt={x.bookName} /></td>
                  <td className="py-2">{x.bookName}</td>
                  <td className="py-2">{x.price} Tk</td>
                  <td className="py-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(index, (x.quantity || 1) - 1)}
                        className="border px-2 hover:bg-gray-100"
                      >-</button>
                      <span className="px-2">{x.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(index, (x.quantity || 1) + 1)}
                        className="border px-2 hover:bg-gray-100"
                      >+</button>
                    </div>
                  </td>
                  <td className="py-2">{(x.price * (x.quantity || 1)).toFixed(0)} Tk</td>
                  <td
                    onClick={() => deleteItem(index)}
                    className="py-2 text-red-800 text-xl cursor-pointer"
                  >
                    <MdDeleteForever />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-red-700 pb-10 text-center py-10">
                  You have not selected any item
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {hasItems && (
          <div className="mt-6 flex flex-col items-end gap-3">
            <p className="font-semibold text-gray-700 text-lg">
              Total: <span className="text-red-700">{totalAmount.toFixed(0)} Tk</span>
            </p>
            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="bg-green-700 text-white px-8 py-3 font-semibold hover:bg-green-800 disabled:opacity-50"
            >
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
