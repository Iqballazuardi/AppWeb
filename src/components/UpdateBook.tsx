import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Book } from "../models/book";
import { getBookById } from "../services/api";
import Swal from "sweetalert2";
import { updateBookOnApi } from "../services/api";

import { useForm } from "react-hook-form";

const UpdateBook = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]); //+
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register: formRegister, handleSubmit } = useForm<Book>();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        const bookId = parseInt(id);
        const response = await getBookById(bookId);

        setBooks(response[0]);
      }
    };
    fetchData();
  }, []);
  const handleChange = (e) => {
    setBooks(e.target.value);
  };
  // console.log(books);

  const fetchBooks = (data: Book) => {
    console.log(data);
    try {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const bookId = parseInt(id);
          const response = await updateBookOnApi(bookId, data);
          if (response === 200) {
            Swal.fire("Saved!", "", "success");
            navigate(`/`);
          } else {
            Swal.fire({
              title: "Something wrong!",
              icon: "error",
            });
          }
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };
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
            <input
              {...formRegister("author", {
                required: "wajib diisi",
              })}
              type="text"
              value={books.author}
              id="author"
              name="author"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              {...formRegister("title", {
                required: "wajib diisi",
              })}
              type="text"
              id="title"
              value={books.title}
              name="title"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...formRegister("description", {
                required: "wajib diisi",
              })}
              id="description"
              name="description"
              value={books.description}
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handleSubmit(fetchBooks)}>
              🔧 Update Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateBook;
