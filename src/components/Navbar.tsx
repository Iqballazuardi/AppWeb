import Swal from "sweetalert2";
import DarkModeToggle from "./DarkMode";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, i wanna out",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("LoginTimeout");
        localStorage.removeItem("authToken");
        Swal.fire({
          title: "Logout!",
          icon: "success",
        });
        navigate("/login");
      }
    });
  };

  return (
    <nav className="bg-gray-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-bold">
          <a href="/">Library 📖</a>
        </div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-gray-300 hover:text-white">
              Home
            </a>
          </li>
          <li>
            <a href="/books/addBooks" className="text-gray-300 hover:text-white">
              Add Book
            </a>
          </li>
          <li>
            <button className="text-gray-300 hover:text-white" onClick={logout}>
              Logout
            </button>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">
              <DarkModeToggle />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
