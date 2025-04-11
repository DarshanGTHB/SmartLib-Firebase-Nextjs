"use client";

import { useEffect, useState } from "react";
import { useFireBase } from "@/context/FireBase";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const firebase = useFireBase();

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await firebase.FetchAllListings(); // assumes you have this method
      setBooks(data || []);
    };
    fetchBooks();
  }, [firebase]);

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4 sm:px-6 lg:px-16">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        All Books
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300"
          >
            <img
              src={book.imageUrl}
              alt={book.bookName}
              className="w-full h-52 object-cover rounded-t-2xl"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-blue-800">
                {book.bookName}
              </h2>
              <p className="text-sm text-blue-600">By {book.author}</p>
              <p className="text-sm text-blue-500">ISBN: {book.isbn}</p>
              <p className="text-lg font-bold text-blue-700">₹{book.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
