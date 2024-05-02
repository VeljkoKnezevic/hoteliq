import { useState } from "react";

import HotelCard from "../components/HotelCard";
import Header from "../components/Header";

const Home = () => {
  //Locations need to be fetched from the backend location list of hotels
  const [location, setLocation] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <Header />
      <main>
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
        <section>
          <h2>Nearby your location</h2>
          <button>See all</button>
          {/* Mobile side scroll, desktop grid */}
          <div className="">
            <HotelCard variant="nearby" />
          </div>
        </section>

        <section>
          <h2>Popular Destination</h2>
          <button>See all</button>
          {/* Both mobile and desktop flex column */}
          <div className="">
            <HotelCard variant="popular" />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
