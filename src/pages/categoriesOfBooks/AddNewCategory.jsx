import Swal from 'sweetalert2';
import Title from '../../components/Title';
import axiosInstance from '../../api/axiosInstance';

function AddNewCategory() {
  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const description = form.description.value;
    const categoryInfo = { name, image, description };

    axiosInstance.post('/add-categories', categoryInfo)
      .then(data => {
        const postedData = data.data;
        if (postedData.acknowledged === true) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Category has been added',
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to add category',
          text: err.response?.data?.message || 'Something went wrong.',
        });
      });
  };

  return (
    <div className="container mx-auto pt-1">
      <Title title="Add New Category" />
      <form onSubmit={handleForm} className="grid px-10 md:shadow">
        <label>Category Name:</label>
        <input type="text" name="name" required />
        <label>Image URL:</label>
        <input type="text" name="image" required />
        <label>Description:</label>
        <input type="text" name="description" className="h-20" />
        <input
          type="submit"
          value="ADD"
          className="mb-10 mt-5 p-2 bg-slate-500 text-white"
        />
      </form>
    </div>
  );
}

export default AddNewCategory;
