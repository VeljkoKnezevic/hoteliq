import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Home = () => {
  //Locations need to be fetched from the backend location list of hotels
  const [location, setLocation] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <header>
        <form>
          <label htmlFor="location">Current location</label>
          <select name="location" id="location">
            <option selected value="Spain">
              Spain
            </option>
            <option value="Australia">Australia</option>
          </select>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search Hotel"
          />
        </form>
      </header>
      <main>
        <Sidebar />

        <div>
          <h2>Nearby your location</h2>
          <button>See all</button>
        </div>

        <div>
          <h2>Popular Destination</h2>
          <button>See all</button>
        </div>
      </main>
    </>
  );
};

export default Home;
