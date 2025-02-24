/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { getBooks } from "../services/api";
// import { getBooks } from "../features/BooSlice";
// import { useDispatch } from "react-redux";

const home = () => {
  const [books, setBooks] = useState([]);
  //  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getBooks());
  // }, [dispatach]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  });

  return (
    <>
      <Navbar />
      <div className="container rounded-lg shadow-2xl p-20 text-center w-8xl m-auto mt-30 bg-zinc-200 dark:bg-gray-600 dark:shadow-gray-600">
        <h1 className="text-3xl dark:text-white font-semibold mb-6 text-center text-gray-800 underline">Book Recommendations</h1>
        <div>
          <div className="flex justify-end mt-10 mb-5">
            <input type="text" id="searchInput" placeholder="Search for books . . ." className="px-4 py-2 border rounded-lg  dark:bg-gray-200" />
            <button className=" px-4 py-2 hover:border rounded-lg ml-2">🔎</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 shadow-2xl rounded-4xl">
            <thead className="bg-gray-600 dark:bg-gray-400 text-white">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider ">Writer</th>
                <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider ">Title</th>
                <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider ">Description</th>
                <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider ">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-200 divide-y divide-gray-300">
              <tr className="hover:bg-gray-200">
                {books.map((book) => (
                 
                    <td className="py-4 px-6 text-sm font-medium text-gray-900" key={book.id} >{book.author}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-700">{book.title}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{book.description}</td>
                  
                ))}
                <td className="py-4 px-6 text-sm font-medium text-gray-900">Eka Kurniawan</td>
                <td className="py-4 px-6 text-sm text-gray-700">Cantik Itu Luka</td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur consectetur quibusdam exercitationem voluptates, explicabo facere, dolore quos, alias esse minima earum obcaecati inventore ipsam odit. Temporibus
                  magni nihil reiciendis odit, at voluptas! Minus nobis rem voluptates, libero, eveniet nulla aspernatur sequi hic voluptas distinctio, maiores amet consectetur architecto deserunt inventore aut! Quis aperiam veritatis ab
                  maiores tempora ad in consectetur rem quam recusandae? Nulla vero saepe quisquam dolorem modi corrupti porro repudiandae aspernatur ducimus sunt. Voluptatem reiciendis, voluptas veritatis magni maxime quae temporibus vitae
                  nostrum natus veniam aspernatur ad fugiat ipsa aperiam debitis nesciunt qui provident! Distinctio, consectetur repellat. Similique..
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  <button className=" bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg m-2">
                    <a href="/update">Update</a>
                  </button>
                  <button className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg m-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-10">
          <button className=" bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg">
            <a href="/add"> Add Recomendation</a>
          </button>
        </div>
      </div>
    </>
  );
};

export default home;
