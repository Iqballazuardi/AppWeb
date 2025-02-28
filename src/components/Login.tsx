import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { login } from "../services/api";

import Cookies from "js-cookie";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    const response = await login(data);

    if (response.status === 200) {
      Swal.fire({
        title: "Oops!",
        text: "username or password incorrect!",
        icon: "warning",
        confirmButtonText: "OK!",
      });
    } else if (response.status == 201) {
      Swal.fire({
        title: "Success!!",
        text: "Login Succes!",
        icon: "success",
        confirmButtonText: "OK!",
      });

      localStorage.setItem("authToken", response.token);
      const inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 150000);
      Cookies.set("LoginTimeout", "true", {
        expires: inFifteenMinutes,
      });

      navigate("/");
    } else {
      Swal.fire({
        title: "????????!",
        text: "Login failed",
        icon: "error",
        confirmButtonText: "OK!",
      });
    }
  };

  return (
    <div className="container rounded-lg shadow-2xl p-20 text-center w-4xl m-auto mt-30 bg-gray-200 dark:bg-gray-600 dark:shadow-gray-600">
      <h2 className="text-3xl font-bold "> Halaman Login 🚀</h2>
      <form className="w-full px-4 mb-8 mt-5" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...formRegister("email", {
            required: "email wajib diisi",
          })}
          type="email"
          placeholder="Email"
          className="w-full p-3 mt-2 rounded-lg bg-zinc-200 text-secondary focus:outline-none focus:ring-primary focus:ring-1"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          {...formRegister("password", {
            required: "Password wajib diisi",
            minLength: { value: 4, message: "Minimal 4 karakter" },
          })}
          type="password"
          placeholder="Password"
          className="w-full p-3 mt-2 rounded-lg bg-zinc-200 text-secondary focus:outline-none focus:ring-primary focus:ring-1"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <div className="mt-10">
          <button type="submit" className="w-full p-3 text-base bg-teal-500 hover:bg-teal-700 text-white font-semibold transition  duration-500 bg-primary rounded-xl hover:opacity-80 hover:shadow-2xl group">
            Login 🔐
          </button>
        </div>
        <div className="mt-5">
          <button className="w-full p-3 text-base bg-teal-500 hover:bg-teal-700 text-white font-semibold transition  duration-500 bg-primary rounded-xl hover:opacity-80 hover:shadow-2xl group" onClick={() => navigate("/registrasi")}>
            Daftar 🧾
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
