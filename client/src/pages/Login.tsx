import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { parseToken } from "../misc/Helpers";
import { LoginResponse, TParsedToken } from "../types";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const { userIsAuthenticated, userLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleLogin: SubmitHandler<FormFields> = async (values) => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      setError("root", {
        message: "Error when logging in",
      });
    }

    const data: LoginResponse = await response.json();
    const parsedToken: TParsedToken = parseToken(data.jwt);

    userLogin(data, parsedToken);

    setValue("email", "");
    setValue("password", "");
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

        <form onSubmit={handleSubmit(handleLogin)} className={`mt-4 grid`}>
          <label
            className="mt-2 text-base font-medium text-secondary-blue"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email")}
            className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black"
            type="text"
            id="email"
            name="email"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <label
            className="mt-2 text-base font-medium text-secondary-blue"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password")}
            className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black"
            type="password"
            id="password"
            name="password"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          {errors.root && (
            <span className="text-red-500">{errors.root.message}</span>
          )}

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 w-full self-center rounded-xl bg-primary-blue py-4 text-sm font-bold text-[#fff] md:mt-6 md:w-2/3 md:text-base lg:mt-8 xl:mt-10 xl:py-6"
            >
              {isSubmitting ? "Loading..." : "Login"}
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
