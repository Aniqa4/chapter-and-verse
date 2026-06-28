import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserInfo from '../Hooks/UserInfo';

function Modal({ name, email, phone, description, route }) {
  const [open, setOpen] = useState(false);
  const [role] = UserInfo();

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="border px-3 py-1 hover:bg-gray-100 rounded"
      >
        About
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal Container */}
          <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>

            {/* Modal Title */}
            <h2 className="text-xl font-semibold mb-4">{name}</h2>

            {/* Modal Content */}
            <p className="mb-2">{description}</p>
            <p className="mb-1">
              <span className="font-semibold">Email:</span> {email}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Phone:</span> {phone}
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Close
              </button>
              {role === 'admin' && (
                <Link
                  to={route}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Update
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
