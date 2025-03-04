/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { getBooks, deleteBook, searchBook, getGenre } from "../services/api";
import { Book } from "../models/book";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Pagination from "./Pagination";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

const itemsPerPage: number = 4;
const home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const newData = books.sort((a, b) => b.id - a.id);
  const paginatedData = newData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    const loginTimeout = () => {
      if (!Cookies.get("LoginTimeout")) {
        Cookies.remove("LoginTimeout");
        navigate("/login");
      }
    };
    const interval = setInterval(loginTimeout, 5000);

    getBooksMutation.mutate();

    return () => clearInterval(interval);
  }, []);

  const getBooksMutation = useMutation({
    mutationFn: getBooks,
    onSuccess: (response) => {
      if (response.status === 201) {
        setBooks(response.data);
      } else if (response.status === 401) {
        navigate("/login");
      }
    },
    onError: (error) => {
      console.error("Error searching books:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: (response) => {
      if (response === 200) {
        Swal.fire("Delete!", "", "success");
      } else {
        Swal.fire({
          title: "Something wrong!",
          icon: "error",
        });
      }

      Swal.fire("Deleted!", "", "info");
      window.location.reload();
    },
  });

  const deleteBooks = (id: number): void => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchMutation = useMutation({
    mutationFn: searchBook,
    onSuccess: (response) => {
      if (response.status === 201) {
        setBooks(response.data);
      } else if (response.status === 200) {
        Swal.fire({
          title: response.message,
          icon: "info",
        });
      }
    },
    onError: (error) => {
      console.error("Error searching books:", error);
    },
  });

  const genreMutation = useMutation({
    mutationFn: getGenre,
    onSuccess: (response) => {
      if (response.status === 201) {
        setBooks(response.data);
        setIsOpen(!isOpen);
      } else {
        Swal.fire({
          title: "No books found by this genre",
          icon: "info",
        });
        setIsOpen(!isOpen);
      }
    },
    onError: (error) => {
      console.error("Error searching books:", error);
    },
  });

  const handleSearch = (data: string) => {
    if (data.trim() === "") {
      getBooksMutation.mutate();
      return;
    } else {
      searchMutation.mutate(data);
    }
  };
  const handleGenre = (data: string) => {
    genreMutation.mutate(data);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar />

      <div className="container rounded-lg shadow-2xl p-20 text-center w-8xl m-auto mt-5 bg-zinc-200 dark:bg-gray-600 dark:shadow-gray-600">
        <h1 className="text-3xl dark:text-white font-semibold mb-6 text-center text-gray-800 underline">Book Recommendations</h1>

        <div className="flex justify-end mt-10 mb-10">
          <div>
            <button
              type="button"
              className="inline-flex justify-start w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={toggleDropdown}
            >
              Genre
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.292 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          {isOpen && (
            <div className="origin-top-right absolute right-15 top-72 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleGenre("Fantasy")}>
                  Fantasy
                </a>
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleGenre("Science Fiction")}>
                  Science Fiction
                </a>
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleGenre("Mystery")}>
                  Mystery
                </a>
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleGenre("Romance")}>
                  Romance
                </a>
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleGenre("Thriller")}>
                  Thriller
                </a>
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleGenre("Non-Fiction")}>
                  Non-Fiction
                </a>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-start mt-10 mb-5">
            <input type="text" id="searchInput" placeholder="Search for book by title" className="px-4 py-2 border rounded-lg  dark:bg-gray-200" value={searchTerm} onChange={handleInputChange} />
            <button className=" px-4 py-2 hover:border rounded-lg ml-2" onClick={() => handleSearch(searchTerm)}>
              🔎
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {paginatedData.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-2xl font-medium text-red-500">Tidak ada data buku tersedia</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-300 shadow-2xl rounded-4xl">
              <thead className="bg-gray-600 dark:bg-gray-400 text-white">
                <tr>
                  <th className="py-3 px-6 text-shadow-md text-center text-sm font-medium uppercase tracking-wider">Writer</th>
                  <th className="py-3 px-6 text-shadow-md text-center text-sm font-medium uppercase tracking-wider">Title</th>
                  <th className="py-3 px-6 text-shadow-md text-center text-sm font-medium uppercase tracking-wider">Description</th>
                  <th className="py-3 px-6 text-shadow-md text-center text-sm font-medium uppercase tracking-wider">Genre</th>
                  <th className="py-3 px-6 text-shadow-md text-center text-sm font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-200 divide-y divide-gray-300">
                {paginatedData.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-200 dark:hover:bg-gray-200">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{book.author}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{book.title}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{book.description}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{book.genre.toLocaleUpperCase()}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg m-2">
                        <a href={`/books/update/${book.id}`}>Update</a>
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg m-2" onClick={() => deleteBooks(book.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex justify-end mt-10">
          <button className=" bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg">
            <a href="/books/addBooks"> Add Recomendation</a>
          </button>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </>
  );
};

export default home;
