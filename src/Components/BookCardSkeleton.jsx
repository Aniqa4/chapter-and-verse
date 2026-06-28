function BookCardSkeleton() {
  return (
    <div className="book grid gap-2 md:gap-5 shadow border py-5 animate-pulse">
      <div className="xl:h-72 xl:w-44 h-40 w-28 mx-auto bg-gray-200 rounded" />
      <div className="text-center grid gap-2 md:gap-5 px-2">
        <div className="h-4 bg-gray-200 rounded mx-auto w-3/4" />
        <div className="h-3 bg-gray-200 rounded mx-auto w-1/2" />
        <div className="flex justify-center gap-5">
          <div className="h-5 w-5 bg-gray-200 rounded-full" />
          <div className="h-5 w-5 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default BookCardSkeleton;
