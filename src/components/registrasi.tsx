import { useForm } from "react-hook-form";
import { register, User } from "../features/UserSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
// import { useState } from "react";
// import { useCallback } from "react";

const Register = () => {
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const dispatch = useDispatch<AppDispatch>();

  const userRegister = async (data: User) => {
    const response = await dispatch(register(data));
    if (response.payload === 200) {
      Swal.fire({
        title: "Oops!",
        text: "username already exists",
        icon: "warning",
        confirmButtonText: "OK!",
      });
      console.log(response);
    } else if (response.payload === 201) {
      Swal.fire({
        title: "Succes!",
        text: "Succes!",
        icon: "success",
        confirmButtonText: "OK!",
      });
      navigate("/login");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Register failed",
        icon: "error",
        confirmButtonText: "OK!",
      });
    }
  };

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
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          {...formRegister("username", {
            required: "username wajib diisi",
          })}
          type="text"
          placeholder="Username"
          className="w-full p-3 mt-2 rounded-lg bg-zinc-200 text-secondary focus:outline-none focus:ring-primary focus:ring-1"
        />
        <input
          {...formRegister("password", {
            required: "Password wajib diisi",
            minLength: { value: 4, message: "Minimal 4 karakter" },
          })}
          type="password"
          placeholder="Password"
          className="w-full p-3 mt-2 rounded-lg bg-zinc-200 text-secondary focus:outline-none focus:ring-primary focus:ring-1"
        />
        <input
          {...formRegister("role", {
            required: "role wajib diisi",
            minLength: { value: 4, message: "Minimal 4 karakter" },
          })}
          type="text"
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
