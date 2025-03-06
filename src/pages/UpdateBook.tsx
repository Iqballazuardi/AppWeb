import { Book } from "../models/book";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getBookById } from "../services/api";
import { updateBookOnApi } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { QueryClient, useMutation } from "@tanstack/react-query";

import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

const UpdateBook = () => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const {
    register: formRegister,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Book>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        const bookId = parseInt(id);
        const response = await getBookById(bookId);
        const bookData = response.data[0];

        if (bookData) {
          Object.keys(bookData).forEach((key) => {
            setValue(key as keyof Book, bookData[key]);
          });
        }
      }
    };
    fetchData();
  }, [id, setValue]);

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

  return (
    <>
      <Navbar />
      <div className="container rounded-lg shadow-2xl p-20 text-center w-4xl m-auto mt-30 bg-zinc-100  dark:bg-gray-400 dark:shadow-gray-200 ">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Update Book </h1>
        <form id="bookForm" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="writer" className="block text-lg font-medium text-gray-700">
              Writer
            </label>
            <input
              {...formRegister("author", {
                required: "wajib diisi",
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
                required: "wajib diisi",
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
                required: "Pilih salah satu Genre",
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
                required: "wajib diisi",
              })}
              id="description"
              name="description"
              rows={10}
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
            ></textarea>

            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div>
            <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg">
              🔧 Update Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateBook;
