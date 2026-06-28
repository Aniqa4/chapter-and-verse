import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddItems from "../../Components/AddItems";
import axiosInstance from "../../api/axiosInstance";
import Title from "../../Components/Title";

function DeleteBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosInstance.get('/books').then(res => setBooks(res.data)).catch(() => setBooks([]));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    axiosInstance.delete(`/delete-book/${id}`).then((data) => {
      if (data.data.success === true) {
        toast.success('Book deleted');
        setBooks(prev => prev.filter((x) => x._id !== id));
      }
    }).catch(() => toast.error('Failed to delete book'));
  };

  return (
    <div className=" lg:container lg:mx-auto py-5 mx-5">
      <Title title={"Manage Books"} />
      <p className="py-2 text-gray-400">Delete Books</p>
      <AddItems text={"Add Books"} route={"add-books"} />
      <div className="grid xl:grid-cols-2 md:grid-cols-2 gap-5">
        {books?.map((x) => (
          <div
            key={x._id}
            className=" p-5 shadow my-2 flex justify-between items-center"
          >
            <h1 className=" font-semibold text text-red-700 hover:text-gray-700">
              {x.bookName}
            </h1>
            <button
              onClick={() => handleDelete(x._id)}
              className=" border px-3 py-1 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeleteBooks;
