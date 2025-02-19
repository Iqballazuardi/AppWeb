const Navbar = () => {
  return (
    <nav
      id="nav-menu"
      className="hidden absolute py-5 bg-zinc-500 dark:bg-secondary lg:dark:bg-transparent shadow-lg rounded-lg
    max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent dark:shadow-zinc-500
    lg:max-w-full lg:shadow-none lg:rounded-none  transition duration-300"
    >
      <ul className="block lg:flex ">
        <li className="group">
          <a href="#home" className="flex py-2 mx-10 text-base font-semibold dark:text-zinc-100 text-secondary group-hover:text-primary">
            Beranda
          </a>
        </li>
        <li className="group">
          <a href="#about" className="flex py-2 mx-10 text-base font-semibold dark:text-zinc-100 text-secondary group-hover:text-primary">
            Tamba
          </a>
        </li>
        <li className="group">
          <a href="#portfolio" className="flex py-2 mx-10 text-base font-semibold dark:text-zinc-100 text-secondary group-hover:text-primary">
            Portfolio
          </a>
        </li>
        <li className="group">
          <a href="#clients" className="flex py-2 mx-10 text-base font-semibold dark:text-zinc-100 text-secondary group-hover:text-primary">
            Clients
          </a>
        </li>

        <li className="group">
          <a href="#blog" className="flex py-2 mx-10 text-base font-semibold dark:text-zinc-100 text-secondary group-hover:text-primary">
            Blog
          </a>
        </li>
        <li className="group">
          <a href="#contact" className="flex py-2 mx-10 text-base font-semibold dark:text-zinc-100 text-secondary group-hover:text-primary">
            Kontak
          </a>
        </li>
        <li className="flex items-center pl-8">
          <div className="flex">
            <span className="mr-2 text-zinc-500">☀️</span>
            <input type="checkbox" className="hidden" id="mode-toggle" />
            <label>
              <div className="flex items-center h-5 rounded-full cursor-pointer w-9 bg-zinc-500">
                <div className="w-4 h-4 transition duration-300 ease-in-out rounded-full toggle-circle bg-zinc-100"></div>
              </div>
            </label>
            <span className="ml-2 text-sm text-zinc-500">🌑 </span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
