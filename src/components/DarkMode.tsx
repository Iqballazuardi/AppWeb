// DarkModeToggle.js

import { useEffect } from "react";

const DarkModeToggle = () => {
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      document.documentElement.classList.add(savedMode);
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button onClick={toggleDarkMode} className="bg-gray-800 text-white hover:bg-amber-200 py-1  px-1 rounded-lg">
      🌓
    </button>
  );
};

export default DarkModeToggle;
