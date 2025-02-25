import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import { Book } from "../models/book";
import { addBook } from "../services/api";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const navigate = useNavigate();
  const fetchBooks = async (data: Book) => {
    try {
      const response = await addBook(data);
      if (response === 200) {
        Swal.fire({
          title: "Book added successfully!",
          icon: "success",
        });
        navigate("/");
      } else {
        Swal.fire({
          title: "Something wrong!",
          icon: "error",
        });
        console.log(response);
        // alert("Failed to add book, please try again.");
      }
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const { register: formRegister, handleSubmit } = useForm<Book>();
  return (
    <>
      <Navbar />
      <div className="container rounded-lg shadow-2xl p-20 text-center w-4xl m-auto mt-30 bg-zinc-100 dark:bg-gray-400 dark:shadow-gray-200 ">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Book Recommendation</h1>
        <form id="bookForm" className="space-y-4 " onSubmit={handleSubmit(fetchBooks)}>
          <div>
            <label htmlFor="author" className="block text-lg font-medium text-gray-700  ">
              Author
            </label>
            <input
              {...formRegister("author", {
                required: "email wajib diisi",
              })}
              type="text"
              id="author"
              name="author"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              {...formRegister("title", {
                required: "email wajib diisi",
              })}
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...formRegister("description", {
                required: "email wajib diisi",
              })}
              id="description"
              rows={10}
              name="description"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
            ></textarea>
          </div>
          <div>
            <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBooks;
