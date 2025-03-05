import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import { Book } from "../models/book";
import { addBook } from "../services/api";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddBooks = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addBook,
    onSuccess: (response) => {
      if (response.status === 201) {
        Swal.fire({
          title: response.message,
          icon: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["books"] });
        navigate("/");
      } else if (response.status === 200) {
        Swal.fire({
          title: response.message,
          icon: "warning",
        });
      } else if (response.status === 401) {
        Swal.fire({
          title: "Login First!",
          icon: "error",
        });
        navigate("/login");
      } else {
        console.error(response);
        Swal.fire({
          title: response.message,
          icon: "error",
        });
      }
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        title: error.message,
        icon: "error",
      });
    },
  });

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<Book>();

  const onSubmit = (data: Book) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Navbar />
      <div className="container rounded-lg shadow-2xl p-20 text-center w-4xl m-auto mt-30 bg-zinc-100 dark:bg-gray-400 dark:shadow-gray-200 ">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Book Recommendation</h1>
        <form id="bookForm" className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="author" className="block text-lg font-medium text-gray-700">
              Author
            </label>
            <input
              {...formRegister("author", {
                required: "author is required",
              })}
              type="text"
              id="author"
              name="author"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
            />
            {errors.author && <p className="text-red-500">{errors.author.message}</p>}
          </div>
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              {...formRegister("title", {
                required: "title is required",
              })}
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="genre" className="block text-lg font-medium text-gray-700">
              Genre
            </label>
            <select
              {...formRegister("genre", {
                required: "Pilih Salah satu Genre",
              })}
              id="genre"
              name="genre"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
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
                required: "description is required",
              })}
              id="description"
              rows={10}
              name="description"
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
            ></textarea>
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div>
            <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBooks;
