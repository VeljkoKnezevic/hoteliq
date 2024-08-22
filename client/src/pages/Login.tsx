import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { TRegister } from "../types";
import { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState<TRegister>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLogin({ ...login, [name]: value });
  };

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Allow-Access-Control-Origin": "http://localhost:5173/",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });
    return await response.json();
  };

  const mutation = useMutation({
    mutationFn: handleLogin,
    onSuccess: (res) => {
      console.log(res);
    },
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate();
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

        <form onSubmit={onSubmit} className={`mt-4 grid`}>
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
            value={login.email}
            onChange={handleChange}
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
            value={login.password}
            onChange={handleChange}
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
