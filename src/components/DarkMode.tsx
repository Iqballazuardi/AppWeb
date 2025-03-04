// DarkModeToggle.js
import { useEffect } from "react";

const DarkModeToggle = () => {
  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", document.documentElement.classList.contains("dark") ? "dark" : "light");
  };

  return (
    <button onClick={toggleDarkMode} className="bg-gray-800 text-white hover:bg-amber-200 py-1  px-1 rounded-lg cursor-pointer">
      🌓
    </button>
  );
};

export default DarkModeToggle;
