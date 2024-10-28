import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const { userIsAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleRegister: SubmitHandler<FormFields> = async (values) => {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      setError("root", {
        message: "Account registration error",
      });
    }

    if (response.ok) {
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("email", "");
      setValue("password", "");

      navigate("/login");
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
        <h2 className="text-lg font-bold text-text-black">Register</h2>

        <form onSubmit={handleSubmit(handleRegister)} className={`mt-4 grid`}>
          <label
            className="mt-2 text-base font-medium text-secondary-blue"
            htmlFor="firstName"
          >
            First name
          </label>
          <input
            {...register("firstName")}
            className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black"
            type="text"
            id="firstName"
            name="firstName"
          />

          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}

          <label
            className="mt-2 text-base font-medium text-secondary-blue"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            {...register("lastName")}
            className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black"
            type="text"
            id="lastName"
            name="lastName"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}

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
              {isSubmitting ? "Loading..." : "Register"}
            </button>
            <span>
              Already have an account?{" "}
              <Link to={"/login"} className="text-primary-blue">
                Login
              </Link>
            </span>
          </div>
        </form>
      </main>
    </>
  );
};

export default Register;
