import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Dropdown = () => {
  const [genre, setGenre] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const genres = ["All", "Action", "Adventure", "Comedy"];

  const handleGenreSelect = (genre: string) => {
    setGenre(genre);
    setIsOpen(false);
  };

  const onSelect = (data: string) => {
    mutation.mutate(data);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          Genre
          <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.292 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <a
              onClick={() => {
                onSelect(genre);
                setGenre("horor");
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Horor
            </a>
            <a onClick={() => setGenre("misteri")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Misteri
            </a>
            <a onClick={() => setGenre("action")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Action
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
