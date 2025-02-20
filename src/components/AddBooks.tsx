import Navbar from "./Navbar";

const AddBooks = () => {
  return (
    <>
      <Navbar />
      <div className="container rounded-lg shadow-2xl p-20 text-center w-4xl m-auto mt-30 bg-zinc-100 dark:bg-gray-400 dark:shadow-gray-200 ">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Book Recommendation</h1>
        <form id="bookForm" className="space-y-4">
          <div>
            <label htmlFor="writer" className="block text-lg font-medium text-gray-700  ">
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
              Add Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBooks;
