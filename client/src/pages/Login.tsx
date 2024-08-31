import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { useState } from "react";
import { TRegister } from "../types";

const Login = () => {
  const { login } = useAuth();

  const [user, setUser] = useState<TRegister>({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    // Implement login logic
    // login({ username, password });
  };

  return (
    <>
      <Link to="/">
        <h1 className="mx-6 mt-2 pt-6 text-primary-blue md:mx-10 lg:text-3xl  xl:mx-auto xl:max-w-[1200px] 2xl:max-w-[1440px]">
          Hotel IQ
        </h1>
      </Link>
      <main className="mx-6 mt-10 rounded-md border-2 border-primary-blue p-3 md:mx-10 lg:mx-auto lg:max-w-[800px] xl:max-w-[1000px]">
        <h2 className="text-lg font-bold text-text-black">Login</h2>

        <form className={`mt-4 grid`}>
          <label
            className="mt-2 text-base font-medium text-secondary-blue"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black"
            type="text"
            id="email"
            name="email"
          />
          <label
            className="mt-2 text-base font-medium text-secondary-blue"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black"
            type="password"
            id="password"
            name="password"
          />
          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="mt-3 w-full self-center rounded-xl bg-primary-blue py-4 text-sm font-bold text-[#fff] md:mt-6 md:w-2/3 md:text-base lg:mt-8 xl:mt-10 xl:py-6"
            >
              Login
            </button>
            <span>
              Don't have an account?{" "}
              <Link to={"/register"} className="text-primary-blue">
                Register
              </Link>
            </span>
          </div>
        </form>
      </main>
    </>
  );
};

export default Login;
