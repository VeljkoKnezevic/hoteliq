import { useState } from "react";

import HotelCard from "../components/HotelCard";
import Header from "../components/Header";

const Home = () => {
  //Locations need to be fetched from the backend location list of hotels
  const [location, setLocation] = useState<string>("Spain");
  const [search, setSearch] = useState<string>("");
  console.log(location);
  return (
    <div className="mx-6">
      <Header />
      <main>
        <form className="mt-6">
          <div className="flex w-1/2 flex-col">
            <label
              className="text-xs font-bold text-[#878787]"
              htmlFor="location"
            >
              Current location
            </label>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#4C4DDC"
              >
                <path d="M480.21-480Q510-480 531-501.21t21-51Q552-582 530.79-603t-51-21Q450-624 429-602.79t-21 51Q408-522 429.21-501t51 21ZM480-191q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323.02-227.11 245.51-339.55 168-452 168-549q0-134 89-224.5T479.5-864q133.5 0 223 90.5T792-549q0 97-77 209T480-96Zm0-456Z" />
              </svg>

              <select
                onChange={(e) => setLocation(e.target.value)}
                name="location"
                id="location"
                defaultValue={0}
              >
                <option value="Spain">Spain</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="border-secondary-grey mt-6 w-full rounded-lg border-2 bg-[url('/search.svg')] bg-[center_left_0.5rem] bg-no-repeat py-3 pl-8 text-sm font-medium"
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
    </div>
  );
};

export default Home;
