import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/schedule">
        <button>Schedule</button>
      </Link>
      <Link to="/profile">
        <button>Profile</button>
      </Link>
    </aside>
  );
};

export default Sidebar;
