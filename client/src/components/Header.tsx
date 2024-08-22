import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [LoggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <header className="mx-6 mt-2 flex items-center justify-between pt-6 text-primary-blue md:mx-10 xl:mx-auto  xl:max-w-[1200px] 2xl:max-w-[1440px]">
      <Link to="/">
        <h1 className="text-2xl text-primary-blue lg:text-3xl">Hotel IQ</h1>
      </Link>

      {LoggedIn ? (
        <Link to={"/profile/1"}>
          <img src="/profile.svg" alt="Profile" />
        </Link>
      ) : (
        <Link to={"/login"}>
          <img src="/profile.svg" alt="Profile" />
        </Link>
      )}
    </header>
  );
};

export default Header;
