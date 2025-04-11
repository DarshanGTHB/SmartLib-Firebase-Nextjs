"use client";

import { supabase, useFireBase } from "@/context/FireBase";
import React, { useState } from "react";

const AddList = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const firebase = useFireBase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    let imageUrl = "";
    if (!imageFile) {
      console.error("No image file selected");
      setIsLoading(false);
      return;
    }

    let filePath = `${Date.now()}_${imageFile.name}`;

    const { data, error } = await supabase.storage.from("uploads").upload(filePath, imageFile, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      console.error("Error uploading image:", error.message);
      setIsLoading(false);
      return;
    } else {
      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from("uploads")
        .getPublicUrl(data.path);

      if (publicUrlError) {
        console.error("Error getting public URL:", publicUrlError.message);
        setIsLoading(false);
        return;
      } else {
        imageUrl = publicUrlData.publicUrl;
        console.log("Image uploaded successfully:", imageUrl);
      }
    }

    const res = await firebase.CreateNewListing({
      bookName,
      author,
      isbn,
      price,
      imageUrl,
    });

    console.log("res after success:", res);
    setIsLoading(false); // Stop loading
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2933/2933245.png"
            alt="Add Book"
            className="w-16 h-16 mx-auto mb-2"
          />
          <h2 className="text-2xl font-bold text-blue-600">Add a New Book</h2>
          <p className="text-sm text-blue-400">Fill in the details below</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-blue-700">
              Book Name
            </label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="e.g., Atomic Habits"
              className="w-full mt-1 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g., James Clear"
              className="w-full mt-1 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700">
              ISBN
            </label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="e.g., 978-1234567890"
              className="w-full mt-1 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700">
              Price (INR)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 499"
              className="w-full mt-1 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700">
              Book Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full mt-1 bg-blue-50 border border-blue-200 rounded-lg p-2 text-sm text-blue-700"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg cursor-pointer transition duration-200 flex items-center justify-center space-x-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
                  alt="plus icon"
                  className="w-4 h-4"
                />
                <span>Add Book</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddList;
