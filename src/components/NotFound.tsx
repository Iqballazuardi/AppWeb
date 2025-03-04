import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="container rounded-lg shadow-2xl p-20 text-center w-8xl m-auto mt-30 bg-zinc-200 dark:bg-gray-400 dark:shadow-gray-400 ">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800">❌ 404 ❌</h1>
          <p className="text-2xl mt-4 text-gray-600">Page Not Found</p>
          <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist. 🙏</p>
          <button onClick={() => navigate("/")} className="cursor-pointer mt-6 inline-block bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg">
            Go Home 🏚
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
