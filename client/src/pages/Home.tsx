import { useState } from "react";

import HotelCard from "../components/HotelCard";
import Header from "../components/Header";

const Home = () => {
  //Locations need to be fetched from the backend location list of hotels
  const [location, setLocation] = useState<string>("Spain");
  const [search, setSearch] = useState<string>("");
  console.log(location);
  return (
    <>
      <Header />
      <main>
        <form>
          <label htmlFor="location">Current location</label>
          <select
            onChange={(e) => setLocation(e.target.value)}
            name="location"
            id="location"
            defaultValue={0}
          >
            <option value="Spain">Spain</option>
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
          <div className="grid">
            <HotelCard variant="nearby" />
            <HotelCard variant="nearby" />
          </div>
        </section>

        <section>
          <h2>Popular Destination</h2>
          <button>See all</button>
          {/* Both mobile and desktop flex column */}
          <div className="flex">
            <HotelCard variant="popular" />
            <HotelCard variant="nearby" />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
