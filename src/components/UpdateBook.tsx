import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { Book } from "../models/book";
import { getBookById } from "../services/api";

const UpdateBook = () => {
  const [books, setBooks] = useState<Book[]>([]); //+
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = useParams<{ id: string }>();
  // const bookId = parseInt(id);
  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        const bookId = parseInt(id);
        const response = await getBookById(bookId);
        setBooks(response);
      }
    };
    fetchData();
  });

  return (
    <>
      <Navbar />
      <div className="container rounded-lg shadow-2xl p-20 text-center w-4xl m-auto mt-30 bg-zinc-100  dark:bg-gray-400 dark:shadow-gray-200 ">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Update Book </h1>
        <form id="bookForm" className="space-y-4">
          <div>
            <label htmlFor="writer" className="block text-lg font-medium text-gray-700">
              Writer
            </label>
            <input type="text" id="writer" name="writer" className="mt-1 block w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">
              Title
            </label>
            <input type="text" id="title" name="title" className="mt-1 block w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea id="description" rows={10} name="description" className="mt-1 block w-full px-4 py-2 border rounded-lg" required></textarea>
          </div>
          <div>
            <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg">
              🔧 Update Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateBook;
