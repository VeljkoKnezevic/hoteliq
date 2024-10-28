import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { userLogout, userIsAuthenticated } = useAuth();

  const isAuthenticated = userIsAuthenticated();

  return (
    <header className="mx-6 mt-2 flex items-center justify-between pt-6 text-primary-blue md:mx-10 xl:mx-auto xl:min-w-[1200px]  xl:max-w-[1200px] 2xl:min-w-[1440px]  2xl:max-w-[1440px]">
      <Link to="/">
        <h1 className="text-2xl text-primary-blue lg:text-3xl">Hotel IQ</h1>
      </Link>

      {!isAuthenticated && <Link to={"/login"}>Login</Link>}

      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <Link to={"/"}>
            <button onClick={userLogout}>Logout</button>
          </Link>
          <Link to={`/profile`}>
            <img src="/profile.svg" alt="Profile" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
