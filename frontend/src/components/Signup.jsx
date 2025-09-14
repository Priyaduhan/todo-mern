import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setshowConfirmPassword(!showConfirmPassword);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);

      const response = await fetch("/api/userData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const fetchedData = await response.json();
      console.log(fetchedData);
    } catch (error) {
      console.log("error in post signup form", error);
    }
  };

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col justify-center">
      {/* <p>ToDo App</p> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 items-center mx-auto  h-fit p-[5rem]  w-fit rounded-lg bg-pink-50">
          {/* //first Name */}
          <div className="flex flex-col relative gap-1 ">
            <input
              type="text"
              placeholder="Enter First Name"
              className=" pl-1.5 border-b-2 outline-none bg-blue-50 rounded-lg pt-1  "
              {...register("firstName", {
                required: true,
                minLength: 3,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors.firstName && (
              <p className="text-red-600 text-[10px]  w-fit mt-8 absolute">
                *Please check the First Name
              </p>
            )}
          </div>

          {/* ---------last name---------------------- */}
          <div className="flex flex-col relative gap-1 ">
            <input
              type="text"
              placeholder="Enter Last Name"
              className=" pl-1.5 border-b-2 outline-none bg-blue-50 rounded-lg pt-1
             "
              {...register("lastName", {
                required: true,
                minLength: 3,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors.lastName && (
              <p className="text-red-600 text-[10px]  w-fit mt-8 absolute">
                *Please check the Last Name
              </p>
            )}
          </div>

          {/* --------------email--------------------- */}
          <div className="flex flex-col relative gap-1 ">
            <input
              type="email"
              placeholder="Enter email"
              className=" pl-1.5 border-b-2 outline-none bg-blue-50 rounded-lg pt-1 "
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
          <div className="flex flex-col relative gap-1 ">
            <div className="flex relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className=" pl-1.5 border-b-2 outline-none bg-blue-50 rounded-lg pt-1 "
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
              <span className="absolute ml-40 mt-2 ">
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

          {/* -------------------confirm password----------------------- */}
          <div className="flex flex-col relative gap-1 ">
            <div className="flex relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="confirm password"
                className=" pl-1.5 border-b-2 outline-none bg-blue-50 rounded-lg pt-1 "
                {...register("confirmPassword", {
                  required: " *Confirm password is required",
                  validate: (value) =>
                    value == watch("password") || "password do not match",
                })}
              />
              <span className="absolute ml-40 mt-2 ">
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => toggleConfirmPasswordVisibility()}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-[10px]  w-fit mt-8 absolute">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button className="p-2 border  mt-3 bg-green-600 hover:bg-green-500 font-medium text-white rounded-md cursor-pointer">
            Signup
          </button>
          <div>
            <p>
              Already have an account{" "}
              <span
                className="font-medium text-blue-600 underline cursor-pointer hover:text-blue-700"
                onClick={() => navigate("/login")}
              >
                {" "}
                Login?
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
