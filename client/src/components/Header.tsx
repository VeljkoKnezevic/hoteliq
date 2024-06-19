import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="mx-6 flex items-center pt-6 text-primary-blue">
      <h1 className="text-2xl">Hotel IQ</h1>

      <div className="ml-auto flex gap-3 text-lg">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
