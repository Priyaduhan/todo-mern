import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("logindata is", data);
    try {
      const response = await fetch(`${API_URL}/api/userData/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const fetchedData = await response.json();
      console.log("login fetchedData is :", fetchedData);
      console.log("json web token is ", fetchedData.accessToken);
      if (fetchedData.msg == "success") {
        navigate("/home");
      }
    } catch (error) {
      console.log("some error in frontend login ", error);
    }
  };

  return (
    <div>
      <div className="bg-yellow-50 min-h-screen flex flex-col justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 items-center mx-auto  h-fit p-[3rem] w-[50%] lg:w-[30%]   rounded-lg bg-pink-50">
            {/* --------------email--------------------- */}
            <div className="flex flex-col relative gap-1 w-full">
              <input
                type="email"
                placeholder="Enter email"
                className=" pl-1.5 border-b-2 outline-none bg-blue-50 rounded-lg pt-1 h-[2.5rem] "
                {...register("email", {
                  required: "*Email is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "*Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-[10px]  w-fit mt-8 absolute">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* ---------------------password--------------- */}
            <div className="flex flex-col  gap-1  w-full ">
              <div className="flex  w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className=" pl-1.5 border-b-2 outline-none  bg-blue-50 rounded-lg pt-1 w-full h-[2.5rem]"
                  {...register("password", {
                    required: "*Password is rquired",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                      message:
                        "*Password must include uppercase, lowercase, number, and special character",
                    },
                  })}
                />
                <span className="absolute ml-60 lg:ml-70 mt-3 ">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => togglePasswordVisibility()}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </span>
              </div>

              {errors.password && (
                <p className="text-red-600 text-[10px]  w-fit mt-8 absolute">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button className="p-2 border  mt-3 bg-green-600 hover:bg-green-500 font-medium w-[5rem] text-white rounded-md cursor-pointer">
              Login
            </button>
            <div>
              <p>
                Don't have an account{" "}
                <span
                  className="font-medium text-blue-600 underline cursor-pointer hover:text-blue-700"
                  onClick={() => navigate("/")}
                >
                  {" "}
                  Signup?
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
