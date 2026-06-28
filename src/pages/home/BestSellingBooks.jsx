import { useQuery } from "@tanstack/react-query";
import BookLayout from "../../Components/BookLayout";
import BookGridSkeleton from "../../Components/BookGridSkeleton";
import { Link } from "react-router-dom";
import Title from "../../Components/Title";
import axiosInstance from "../../api/axiosInstance";

function BestSellingBooks() {
  const {
    isLoading,
    isError,
    data: books,
  } = useQuery({
    queryKey: ["bestSellingBooks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/best-selling");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <Title title="Best Selling Books" />
        <BookGridSkeleton count={10} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load best-selling books.
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Title title="Best Selling Books" />

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

export default BestSellingBooks;
