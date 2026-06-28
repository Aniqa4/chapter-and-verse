import { useContext, useState } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';
import Swal from 'sweetalert2';

function EditProfileForm({ userInfo, onClose }) {
  const { updateProfile } = useContext(AuthContext);
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name:        form.name.value.trim(),
      phoneNumber: form.phoneNumber.value.trim(),
      address:     form.address.value.trim(),
    };
    setSaving(true);
    updateProfile(data)
      .then(() => {
        Swal.fire({ icon: 'success', title: 'Profile updated', timer: 1200, showConfirmButton: false });
        onClose();
      })
      .catch(() => Swal.fire({ icon: 'error', title: 'Update failed' }))
      .finally(() => setSaving(false));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-sm">
        <h2 className="font-semibold text-gray-700 mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid">
            <label className="text-xs text-gray-500">Name</label>
            <input type="text" name="name" defaultValue={userInfo?.name} required className="border rounded px-2 py-1 text-sm" />
          </div>
          <div className="grid">
            <label className="text-xs text-gray-500">Phone Number</label>
            <input type="tel" name="phoneNumber" defaultValue={userInfo?.phoneNumber} className="border rounded px-2 py-1 text-sm" />
          </div>
          <div className="grid">
            <label className="text-xs text-gray-500">Address</label>
            <input type="text" name="address" defaultValue={userInfo?.address} className="border rounded px-2 py-1 text-sm" />
          </div>
          <div className="flex gap-2 mt-2">
            <button type="submit" disabled={saving} className="flex-1 bg-green-700 text-white py-2 text-sm hover:bg-green-800 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 border py-2 text-sm hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;
