import React, { useContext, useEffect, useRef, useState } from "react";
import img from "../../assets/others/authentication2.png";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../Authprovider/Authprovider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosPublic from "../axiosPublic/axiosPublic";

const Login = () => {
  const captcharef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const { googleSignin, updateUserProfile, signIn } = useContext(AuthContext);
  const axiospublic = axiosPublic();
  const [captchaError, setCaptchaError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(4);
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignin();
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        image: result.user?.photoURL,
      };

      await updateUserProfile(result.user?.displayName, result.user?.photoURL);
      await axiospublic.post("/users", userInfo);

      Swal.fire({
        title: "User login successfully",
        icon: "success",
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Swal.fire("Error!", "Google Sign-In failed. Please try again.", "error");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      Swal.fire({
        title: "User login successfully",
        icon: "success",
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire("Login Failed!", "Invalid email or password. Try again.", "error");
    }
  };

  const handleCaptcha = () => {
    if (validateCaptcha(captcharef.current.value)) {
      setDisabled(false);
      setCaptchaError("");
    } else {
      setDisabled(true);
      setCaptchaError("Incorrect captcha. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-5">
      <div className="flex flex-col lg:flex-row items-center gap-10 w-full max-w-4xl bg-white shadow-2xl rounded-xl p-8">

        {/* Left Side (Image) */}
        <div className="hidden lg:flex w-1/2">
          <img src={img} alt="Login" className="w-full h-auto" />
        </div>

        {/* Right Side (Form) */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
          <p className="text-center text-gray-500 mb-5">Welcome back! Please enter your details.</p>

          <form className="space-y-4" onSubmit={handleLogin}>

            {/* Email */}
            <div>
              <label className="label text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
              <label className="label text-right">
                <a href="#" className="text-orange-500 hover:underline">Forgot password?</a>
              </label>
            </div>

            {/* Captcha */}
            <div>
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                ref={captcharef}
                onBlur={handleCaptcha}
                placeholder="Type the given text"
                className="input input-bordered w-full"
                required
              />
              {captchaError && <p className="text-red-500 text-sm mt-1">{captchaError}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <input
                type="submit"
                value="Login"
                disabled={disabled}
                className="btn w-full bg-orange-500 text-white hover:bg-orange-600 transition"
              />
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600">
              New here?{" "}
              <Link to="/signup" className="text-orange-500 hover:underline">Create an account</Link>
            </p>

            {/* Divider */}
            <div className="divider">OR Sign In With</div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              className="btn w-full bg-yellow-500 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition"
            >
              <FcGoogle size={24} />
              Sign in with Google
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
