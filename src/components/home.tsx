/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { getBooks, deleteBook, searchBook } from "../services/api";
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
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const newData = books.sort((a, b) => b.id - a.id);

  const paginatedData = newData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
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
  useEffect(() => {
    const loginTimeout = () => {
      if (!Cookies.get("LoginTimeout")) {
        Cookies.remove("LoginTimeout");
        navigate("/login");
      }
    };
    const interval = setInterval(loginTimeout, 1000);

    getBooksMutation.mutate();

    return () => clearInterval(interval);
  }, []);

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const [searchTerm, setSearchTerm] = useState("");
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
          title: "No book found!",
          icon: "info",
        });
      }
    },
    onError: (error) => {
      console.error("Error searching books:", error);
    },
  });

  const handleSearch = (data: string) => {
    searchMutation.mutate(data);
  };
  return (
    <>
      <Navbar />

      <div className="container rounded-lg shadow-2xl p-20 text-center w-8xl m-auto mt-5 bg-zinc-200 dark:bg-gray-600 dark:shadow-gray-600">
        <h1 className="text-3xl dark:text-white font-semibold mb-6 text-center text-gray-800 underline">Book Recommendations</h1>
        <div>
          <div className="flex justify-end mt-10 mb-5">
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
                  <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">Writer</th>
                  <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">Title</th>
                  <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">Description</th>
                  <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-200 divide-y divide-gray-300">
                {paginatedData.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-200">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{book.author}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{book.title}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{book.description}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg m-2">
                        <a href={`/books/booksUpdate/${book.id}`}>Update</a>
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
