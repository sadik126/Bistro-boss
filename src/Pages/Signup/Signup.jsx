import React, { useContext, useState } from "react";
import img from "../../assets/others/authentication2.png";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Authprovider/Authprovider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosPublic from "../axiosPublic/axiosPublic";


const Signup = () => {
  const allaxios = axiosPublic()
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm({ mode: "onChange" });

  const { createUser, updateUserProfile, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const imagehostkey = 'e0e49e32b3b219f54116af3c0da0de50';
  const imageurl = `https://api.imgbb.com/1/upload?&key=${imagehostkey}`;

  const onSubmit = async (data) => {

    setLoading(true)

    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const res = await allaxios.post(imageurl, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (!res.data.success) throw new Error("Image upload failed");

      const image = res.data.data.display_url;

      const userCredential = await createUser(data.email, data.password);
      await updateUserProfile(data.name, image);

      const useritem = { name: data.name, email: data.email, image: image, role: 'Member' };
      const response = await allaxios.post("/users", useritem);

      if (response.data.insertedId) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "User Already Exists",
          text: "This email is already registered. Please log in.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Something went wrong: ${error.message}`,
        });
      }
    }
    finally {
      setLoading(false)
    }
  }


  //     .catch((error) => {

  //     });
  // }

  // };
  return (
    <div>
      {" "}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">

            <img src={img} alt="" />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  {...register("name", { required: true })}
                  name="name"
                  className={
                    errors.name
                      ? "input input-bordered input-error"
                      : "input input-bordered"
                  }
                  onKeyUp={() => trigger("name")}
                // onKeyUp={(e) => console.log("Typing:", e.target.value)}
                />
                {errors.name && (
                  <span className="text-red-500">please enter your name</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
                  name="email"
                  className={
                    errors.email
                      ? "input input-bordered input-error"
                      : "input input-bordered"
                  }
                  onKeyUp={() => trigger("email")}
                />
                {errors.email?.type === "required" && (
                  <span className="text-red-500">please enter your email</span>
                )}

                {errors.email?.pattern === "pattern" && (
                  <span className="text-red-500">
                    please check your email properly
                  </span>
                )}
              </div>
              <div className="">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="file"
                  placeholder="image"
                  {...register("image", {
                    required: true,

                  })}
                  name="image"
                  accept="image/*"
                  className={
                    errors.image
                      ? "input input-bordered input-error"
                      : ""
                  }

                />
                {errors.image?.type === "required" && (
                  <span className="text-red-500">please upload a image</span>
                )}

                {errors.image?.pattern === "pattern" && (
                  <span className="text-red-500">
                    please check your photo properly
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: true,
                    maxLength: 20,
                    minLength: 3,
                  })}
                  name="password"
                  className={
                    errors.password
                      ? "input input-bordered input-error"
                      : "input input-bordered"
                  }
                  onKeyUp={() => trigger("password")}
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-500">
                    please enter your password
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-500">
                    Password cannot exceed 20 characters
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500">
                    Password cannot less than 4 characters
                  </span>
                )}
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn bg-orange-500"
                  type="submit"
                  value={loading ? `Signing up...` : ` Sign up`}
                />
              </div>
            </form>
            <p className="uppercase text-center p-5">
              Already have account?{" "}
              <Link className="text-orange-500" to="/login">
                {" "}
                Go for login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
