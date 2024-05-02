import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>HotelIQ</h1>

      <div>
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
