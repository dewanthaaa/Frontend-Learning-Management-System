import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../utils/zodSchema.js";
import { useMutation } from "@tanstack/react-query";
import { postSignIn } from "../../services/authService.js";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "../../utils/const.js";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: (data) => postSignIn(data),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await mutateAsync(data);

      secureLocalStorage.setItem(STORAGE_KEY, response.data);

      if (response.data.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col flex-1 p-[10px]">
      <div className="absolute w-[calc(100%-20px)] min-h-[calc(100vh-20px)] h-[calc(100%-20px)] bg-[#060A23] -z-10 rounded-[20px]">
        <img
          src="/assets/images/backgrounds/background-glow.png"
          className="absolute bottom-0 transform -translate-x-1/2 left-1/2"
          alt=""
        />
      </div>
      <nav className="flex items-center justify-between p-[30px]">
        <Navbar />
        <div className="flex items-center gap-3">
          <Link to="#">
            <div className="flex items-center gap-3 w-fit rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
              <span className="font-semibold text-white">My Dashboard</span>
            </div>
          </Link>
          <Link to="/manager/sign-up">
            <div className="flex items-center gap-3 w-fit rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]">
              <span className="font-semibold text-white">Sign Up</span>
            </div>
          </Link>
        </div>
      </nav>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[400px] h-fit rounded-[20px] border border-[#262A56] p-[30px] gap-[30px] bg-[#080A2A] m-auto"
      >
        <div>
          <h1 className="font-bold text-[26px] leading-[39px] text-white">
            Welcome Back!
          </h1>
          <p className="text-[#6B6C7F]">Manage your employees easily</p>
        </div>
        <hr className="border-[#262A56]" />
        <div className="flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 focus-within:border-[#8661EE] focus-within:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
          <img
            src="/assets/images/icons/sms-white.svg"
            className="w-6 h-6 flex shrink-0"
            alt="icon"
          />
          <input
            type="email"
            name="email"
            id="email"
            className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F]"
            placeholder="Write your email address"
            {...register("email")}
          />
        </div>
        {errors.email?.message && (
          <p className="text-red-500 text-xs pl-5 -mt-5">
            {errors.email?.message}
          </p>
        )}
        <div>
          <div className="flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 focus-within:border-[#8661EE] focus-within:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
            <img
              src="/assets/images/icons/key-white.svg"
              className="w-6 h-6 flex shrink-0"
              alt="icon"
            />
            <input
              type="password"
              name="password"
              id="password"
              className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F]"
              placeholder="Type your secure password"
              {...register("password")}
            />
          </div>
          <div className="flex justify-end mt-[10px]">
            <Link
              to="#"
              className="text-sm leading-[21px] text-[#662FFF] hover:underline"
            >
              Forgot Password
            </Link>
          </div>
          {errors.password?.message && (
            <p className="text-red-500 text-xs pl-5 -mt-5">
              {errors.password?.message}
            </p>
          )}
        </div>
        <hr className="border-[#262A56]" />
        <button
          disabled={isLoading}
          type="submit"
          className="w-full rounded-full border p-[14px_20px] text-center font-semibold text-white bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
        >
          Sign In to Manage
        </button>
      </form>
    </div>
  );
}
