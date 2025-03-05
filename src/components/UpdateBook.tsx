import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Book } from "../models/book";
import { getBookById } from "../services/api";
import Swal from "sweetalert2";
import { updateBookOnApi } from "../services/api";

import { useForm } from "react-hook-form";
import { QueryClient, useMutation } from "@tanstack/react-query";

const UpdateBook = () => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const [book, setBook] = useState<Book | null>(null);
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<Book>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        const bookId = parseInt(id);
        const response = await getBookById(bookId);
        setBook(response.data[0]);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (book) {
      setBook({ ...book, [e.target.name]: e.target.value });
    }
  };

  const mutation = useMutation({
    mutationFn: (data: Book) => {
      if (id) {
        const bookId = parseInt(id);
        return updateBookOnApi(bookId, data);
      }
      throw new Error("Book ID is undefined");
    },
    onSuccess: (response) => {
      if (response === 200) {
        Swal.fire("Saved!", "", "success");
        queryClient.invalidateQueries({ queryKey: ["updateBook"] });
        navigate("/");
      } else if (response === 401) {
        Swal.fire({
          title: "Login First!",
          icon: "error",
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "Something wrong!",
          icon: "error",
        });
      }
    },
    onError: (e) => {
      Swal.fire({
        title: e.message,
        icon: "error",
      });
    },
  });

  const onSubmit = (data: Book) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(data);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  if (!book) return <div>Loading...</div>;

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
              value={book.author}
              id="author"
              name="author"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
              onChange={handleChange}
            />
            {errors.author && <p className="text-red-500">{errors.author.message}</p>}
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
              value={book.title}
              name="title"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
              onChange={handleChange}
            />

            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="genre" className="block text-lg font-medium text-gray-700">
              Genre
            </label>
            <select
              {...formRegister("genre", {
                required: "Pilih salah satu Genre",
              })}
              id="genre"
              name="genre"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}
              value={book.genre}
            >
              <option value="">Select a genre</option>
              <option value="fantasy">Fantasy</option>
              <option value="sci-fi">Science Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="thriller">Thriller</option>
              <option value="non-fiction">Non-Fiction</option>
            </select>

            {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
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
              value={book.description}
              rows={10}
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
              onChange={handleChange}
            ></textarea>

            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div>
            <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handleSubmit(onSubmit)}>
              🔧 Update Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateBook;
