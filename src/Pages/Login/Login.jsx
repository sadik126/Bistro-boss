import React, { useContext, useEffect, useRef, useState } from "react";
import img from "../../assets/others/authentication2.png";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../Authprovider/Authprovider";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import axiosPublic from "../axiosPublic/axiosPublic";


const Login = () => {
  const captcharef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const {googleSignin} = useContext(AuthContext);
  const axiospublic = axiosPublic();
  


  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    loadCaptchaEnginge(4);
  }, []);

  const handleGoogleSignIn = () => {
    googleSignin()
    .then(result => {
      console.log(result.user);
      const userInfo = {
        email:result.user?.email,
        name:result.user?.displayName
      }
      axiospublic.post('/users' , userInfo)
      .then(res => {
        console.log(res.data)
        // Swal.fire({
        //   title: "User login successfully",
        //   showClass: {
        //     popup: `
        //       animate__animated
        //       animate__fadeInUp
        //       animate__faster
        //     `,
        //   },
        //   hideClass: {
        //     popup: `
        //       animate__animated
        //       animate__fadeOutDown
        //       animate__faster
        //     `,
        //   },
        // });
        navigate("/");
      })
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password).then((res) => {
      const user = res.user;
      console.log(user);
      Swal.fire({
        title: "User login successfully",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      navigate(from, { replace: true });
    });

    console.log("clicked", email, password);
  };

  const handleCaptcha = () => {
    const captchavalue = captcharef.current.value;

    if (validateCaptcha(captchavalue)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center md:w-1/2 lg:text-left">
            {/* <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p> */}
            <img src={img} alt="" />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  ref={captcharef}
                  onBlur={handleCaptcha}
                  placeholder="Type the given text"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-orange-500"
                  type="submit"
                  disabled={disabled}
                  value="Login"
                />
              </div>
              <p className="uppercase text-center">
                new here?{" "}
                <Link className="text-orange-500" to="/signup">
                  {" "}
                  want to create an account?
                </Link>
              </p>
              <div className="divider">OR Sign In With</div>
             
              <button onClick={handleGoogleSignIn} className="btn bg-orange-300">
            
              <FcGoogle />
              Button
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
