import { useForm } from "react-hook-form";
import { register, User } from "../features/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
// import { useState } from "react";
// import { useCallback } from "react";

const Register = () => {
  const navigate = useNavigate();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  // const dispatch = useDispatch();

  // const data = [username, password, setPassword, role];

  // const navigate = useNavigate();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const dispatch = useDispatch<AppDispatch>();

  const userRegister = async (data: User) => {
    await dispatch(register(data));

    navigate("/login");
  };

  // const onSubmit = (data: User) => {
  //   dispatch(register(data));
  //   navigate("/login");
  // };

  // const [isOpen, setIsOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);==
  // };

  return (
    <div className="container rounded-lg shadow-2xl p-20 text-center w-4xl m-auto mt-30 bg-zinc-200 dark:bg-gray-600 dark:shadow-gray-600">
      <h2 className="text-3xl font-bold dark:text-zinc-200"> Halaman Registrasis</h2>
      <form className="w-full px-4 mb-8 mt-5" onSubmit={handleSubmit(userRegister)}>
        <input
          {...formRegister("email", {
            required: "email wajib diisi",
          })}
          type="email"
          placeholder="Email"
          className="w-full p-3 mt-2 rounded-lg bg-zinc-200 text-secondary focus:outline-none focus:ring-primary focus:ring-1"
          // value={username}
          // onChange={(e) => setUsername(e.target.value)}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          {...formRegister("username", {
            required: "username wajib diisi",
          })}
          type="text"
          placeholder="Username"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mt-2 rounded-lg bg-zinc-200 text-secondary focus:outline-none focus:ring-primary focus:ring-1"
        />
        <input
          {...formRegister("password", {
            required: "Password wajib diisi",
            minLength: { value: 4, message: "Minimal 4 karakter" },
          })}
          type="password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mt-2 rounded-lg bg-zinc-200 text-secondary focus:outline-none focus:ring-primary focus:ring-1"
        />
        <input
          {...formRegister("role", {
            required: "role wajib diisi",
            minLength: { value: 4, message: "Minimal 4 karakter" },
          })}
          type="text"
          // value={role}
          // onChange={(e) => setRole(e.target.value)}
          placeholder="Penulis | Pembaca"
          className="w-full p-3 mt-2 rounded-lg bg-zinc-200 text-secondary focus:outline-none focus:ring-primary focus:ring-1"
        />

        {errors.password && <p>{errors.password.message}</p>}
        <div className="mt-10">
          <button type="submit" className="w-full p-3 text-base bg-teal-500 hover:bg-teal-700 text-white font-semibold transition  duration-500 bg-primary rounded-xl hover:opacity-80 hover:shadow-2xl group">
            Daftar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
