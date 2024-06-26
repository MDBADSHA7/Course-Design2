import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import primaryAxios from "../../Api/primaryAxios";
import useRole from "../../Hooks/useRole";
import auth from "../../firebase.init";
import { getFirebaseErrorMessage } from "../../utils/utils";
import Social from "./Social";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [role, roleLoading, userData] = useRole();
  const [isLoading, setIsLoading] = useState(false);

  let singInError;

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (userData) {
      (async () => {
        const { data } = await primaryAxios.put(`user`, {
          name: userData.name,
          email: userData.email,
          image: userData.image,
        });
        if (data.token) {
          localStorage.setItem("authorizationToken", data.token);
        }
      })();

      navigate(from, { replace: true });
    }
  }, [userData, from, navigate]);

  if (error) {
    singInError = (
      <p className="text-error">{getFirebaseErrorMessage(error)}</p>
    );
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div>
      <div className="flex items-center min-h-screen p-4  lg:justify-center">
        <div className="flex flex-col overflow-hidden mx-auto bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md drop-shadow-2xl">
          <div className="hidden p-4 py-6 text-white  bg-gradient-to-r from-[#4828A9] to-[#A25BF7] md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <img
              className=" "
              src="https://i.postimg.cc/7LVfyJkP/casual-life-3d-young-people-in-the-worker-jumpsuits-with-gadgets.png"
              alt="image"
            />
          </div>
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-3xl font-bold text-[#A25BF7] text-center ">
              Login
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              action="#"
              className="flex flex-col space-y-5"
            >
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 transition duration-300 border border-gray-300 text-black rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is require",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid Email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-700">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-700">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-900"
                  >
                    Password
                  </label>
                  <Link
                    to={"/reset"}
                    className="text-sm text-[#A25BF7] hover:underline focus:text-blue-800"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="px-4 py-2 transition duration-300 border border-gray-300  text-black rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 w-full"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is require",
                      },
                      minLength: {
                        value: 6,
                        message: "Must be 6 characters or longer",
                      },
                    })}
                  />
                  <div className="absolute right-4 top-2.5 text-black">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <IoEyeOutline size={20} />
                      ) : (
                        <IoEyeOffOutline size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-red-700">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label-text-alt text-red-700">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>
              <div>
                {singInError}

                <button
                  type="submit"
                  disabled={loading || isLoading}
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-gradient-to-r from-[#4828A9] to-[#A25BF7] rounded-md shadow  hover:bg-gradient-to-l focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  {loading || isLoading ? (
                    <ImSpinner9 className="text-2xl mx-auto animate-spin" />
                  ) : (
                    "Login"
                  )}
                </button>

                <p className="text-gray-500 mt-2">
                  New to Webb School?{" "}
                  <Link to="/SignUp" className=" text-light text-[#A25BF7]">
                    Create New Account
                  </Link>
                </p>
              </div>
            </form>
            <div className="flex flex-col mt-5 space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">or login with</span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>
              <Social></Social>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
