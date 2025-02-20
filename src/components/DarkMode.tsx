// DarkModeToggle.js

const DarkModeToggle = () => {
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
