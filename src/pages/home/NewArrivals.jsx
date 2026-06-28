import Title from "../../components/Title";
import { Link } from "react-router-dom";
import BookLayout from "../../components/BookLayout";
import BookGridSkeleton from "../../components/BookGridSkeleton";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

function NewArrivals() {
  const {
    isLoading,
    isError,
    data: books,
  } = useQuery({
    queryKey: ["newArrivals"],
    queryFn: async () => {
      const res = await axiosInstance.get("/new-arrivals");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <Title title="New arrivals" />
        <BookGridSkeleton count={10} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load new arrivals.
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Title title="New arrivals" />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center mx-5 md:mx-0">
        {books?.map((x) => (
          <BookLayout
            key={x?._id}
            product_id={x._id}
            bookImage={x.bookImage}
            bookName={x.bookName}
            price={x.price}
            route={`/categories/${x?.category}/${x.bookName}`}
          />
        ))}
      </div>

      <p className="text-center mt-5 underline text-blue-400">
        <Link to="books">See More</Link>
      </p>
    </div>
  );
}

export default NewArrivals;
