import { MdCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
        <MdCheckCircle className="text-green-500 text-7xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
        <p className="text-gray-500 text-sm mb-8">
          Thank you for your purchase. You can track your order status from the dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="bg-green-700 text-white px-6 py-2.5 font-semibold hover:bg-green-800 transition-colors rounded-lg text-sm"
          >
            Track Order
          </Link>
          <Link
            to="/books"
            className="border border-gray-200 text-gray-700 px-6 py-2.5 font-semibold hover:bg-gray-50 transition-colors rounded-lg text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
