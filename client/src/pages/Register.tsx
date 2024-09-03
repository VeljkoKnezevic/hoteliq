import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleInputChange } from "../misc/Helpers";
import { TRegister } from "../types";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<TRegister>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user;

    if (!email || !password || !firstName || !lastName) {
      setError(true);
      return;
    }

    try {
      await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, firstName, lastName }),
        headers: {
          "Content-type": "application/json",
        },
      });

      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setError(false);

      navigate("/login");
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  return (
    <>
      <Link to="/">
        <h1 className="mx-6 mt-2 pt-6 text-primary-blue md:mx-10 lg:text-3xl  xl:mx-auto xl:max-w-[1200px] 2xl:max-w-[1440px]">
          Hotel IQ
        </h1>
      </Link>
      <main className="mx-6 mt-10 rounded-md border-2 border-primary-blue p-3 md:mx-10 lg:mx-auto lg:max-w-[800px] xl:max-w-[1000px]">
        <h2 className="text-lg font-bold text-text-black">Register</h2>

        <form onSubmit={handleRegister} className={`mt-4 grid`}>
          <label
            className="mt-2 text-base font-medium text-secondary-blue"
            htmlFor="firstName"
          >
            First name
          </label>
          <input
            className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black"
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={(e) => handleInputChange(e, setUser)}
          />
          <label
            className="mt-2 text-base font-medium text-secondary-blue"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black"
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={(e) => handleInputChange(e, setUser)}
          />
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
            value={user.email}
            onChange={(e) => handleInputChange(e, setUser)}
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
            value={user.password}
            onChange={(e) => handleInputChange(e, setUser)}
          />
          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="mt-3 w-full self-center rounded-xl bg-primary-blue py-4 text-sm font-bold text-[#fff] md:mt-6 md:w-2/3 md:text-base lg:mt-8 xl:mt-10 xl:py-6"
            >
              Register
            </button>
            <span>
              Already have an account?{" "}
              <Link to={"/login"} className="text-primary-blue">
                Login
              </Link>
            </span>
          </div>
        </form>
        {error && <p>Please fill all the fields</p>}
      </main>
    </>
  );
};

export default Register;
