import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const naviagate = useNavigate();

  const submitDetails = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials?.user) {
        naviagate("/");
        toast.success("Welcome Back, have a great day");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div>
      <h1 className="my-12 mb-20 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-center font-raleway text-5xl font-extrabold text-transparent">
        Sign-in in your account
      </h1>
      <section className="mx-auto max-w-7xl">
        <div className="h-full">
          {/* <!-- Left column container with background--> */}
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto rounded-md bg-[#003f5c] md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full "
                alt="Sample image"
              />
            </div>

            {/* <!-- Right column container --> */}
            <div className="mx-auto mb-12 mt-8 md:mb-0 md:w-8/12 lg:mt-0 lg:w-5/12 xl:w-5/12">
              <form onSubmit={submitDetails} type="submit">
                <div className="form__group field relative mx-auto w-full max-w-[90%] py-4">
                  <input
                    type="email"
                    id="email"
                    onChange={onChangeHandler}
                    value={email}
                    className="form__field bg-[#272727]"
                    placeholder="Name"
                    required
                  />
                  <label htmlFor="name" className="form__label">
                    Email address
                  </label>
                </div>
                <div className="form__group field relative mx-auto w-full max-w-[90%]  py-4">
                  <input
                    type="password"
                    id="password"
                    onChange={onChangeHandler}
                    value={password}
                    className="form__field"
                    placeholder="Name"
                    minLength={6}
                    required
                  />
                  <label htmlFor="name" className="form__label">
                    Password
                  </label>
                </div>

                <div className="mx-auto flex w-full max-w-[90%] items-center justify-between">
                  <p className="text- pt-3 text-gray-400">
                    Dont have an account?{" "}
                    <span
                      onClick={() => Navigate("/sign-up")}
                      className="cursor-pointer bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent"
                    >
                      Register
                    </span>{" "}
                  </p>
                  <p
                    onClick={() => navigate("/forgot-password")}
                    className="inline cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text pt-3 text-transparent hover:shadow-xl"
                  >
                    Forgot password?
                  </p>
                </div>

                {/* Login button */}
                <div className="mx-auto  my-8 w-full max-w-[70%] ">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 py-3 font-semibold text-white transition duration-200 ease-in-out active:scale-90"
                  >
                    Login
                  </button>
                </div>

                <div className="mx-auto my-4 mt-5 flex w-full max-w-[90%] items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-500 after:mt-0.5 after:flex-1 after:border-t after:border-gray-500">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                    OR
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
