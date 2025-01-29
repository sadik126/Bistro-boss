import React from "react";
import img from "../../assets/others/authentication2.png";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div>
      {" "}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
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
                  onKeyUp={(e) => console.log("Typing:", e.target.value)}
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
                  className="btn btn-primary"
                  type="submit"
                  value="Sign up"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
