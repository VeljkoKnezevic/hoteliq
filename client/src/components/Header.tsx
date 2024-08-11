import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="mx-6 mt-2 flex items-center justify-between pt-6 text-primary-blue md:mx-10 xl:mx-auto  xl:max-w-[1200px] 2xl:max-w-[1440px]">
      <h1 className="text-2xl lg:text-3xl">Hotel IQ</h1>

      <nav>
        <ul className="flex gap-3 text-lg lg:gap-4 lg:text-xl">
          <li>
            <Link to="/">
              <button className="hover:underline hover:underline-offset-2">
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link to="/profile/1">
              <button className="hover:underline hover:underline-offset-2">
                Profile
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
