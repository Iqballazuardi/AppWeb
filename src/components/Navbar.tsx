import DarkModeToggle from "./DarkMode";

const Navbar = () => {
  return (
    <nav className="bg-gray-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <a href="/">Library</a>
        </div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-gray-300 hover:text-white">
              Home
            </a>
          </li>
          <li>
            <a href="/add" className="text-gray-300 hover:text-white">
              Add Book
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">
              Logout
            </a>
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
