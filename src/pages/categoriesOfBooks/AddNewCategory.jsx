import { toast } from 'sonner';
import Title from '../../Components/Title';
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
          toast.success('Category has been added!');
          form.reset();
        }
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Failed to add category.');
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
