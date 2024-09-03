import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { LoginResponse, TParsedToken, TRegister } from "../types";
import { parseToken, handleInputChange } from "../misc/Helpers";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const { userIsAuthenticated, userLogin } = useAuth();
  const [user, setUser] = useState<TRegister>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);

  const { state } = useLocation();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { email, password } = user;

    if (!email || !password) {
      setError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data: LoginResponse = await response.json();
      const parsedToken: TParsedToken = parseToken(data.jwt);

      userLogin(data, parsedToken);

      setUser({
        email: "",
        password: "",
      });

      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  if (userIsAuthenticated()) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Link to="/">
        <h1 className="mx-6 mt-2 pt-6 text-primary-blue md:mx-10 lg:text-3xl  xl:mx-auto xl:max-w-[1200px] 2xl:max-w-[1440px]">
          Hotel IQ
        </h1>
      </Link>
      <main className="mx-6 mt-10 rounded-md border-2 border-primary-blue p-3 md:mx-10 lg:mx-auto lg:max-w-[800px] xl:max-w-[1000px]">
        <h2 className="text-lg font-bold text-text-black">Login</h2>

        <form onSubmit={handleLogin} className={`mt-4 grid`}>
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
            onChange={(e) => handleInputChange(e, setUser)}
            value={user.email}
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
            onChange={(e) => handleInputChange(e, setUser)}
            value={user.password}
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
        {error && <p>{error}</p>}
      </main>
    </>
  );
};

export default Login;
