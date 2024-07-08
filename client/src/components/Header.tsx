import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="mx-6 flex items-center justify-between pt-6 text-primary-blue md:mx-10 ">
      <h1 className="text-2xl">Hotel IQ</h1>

      <nav>
        <ul className="flex gap-3 text-lg">
          <li>
            <Link to="/">
              <button className="hover:underline hover:underline-offset-2">
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link to="/profile">
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
