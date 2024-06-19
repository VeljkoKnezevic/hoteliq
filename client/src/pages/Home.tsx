import { useState } from "react";

import HotelCard from "../components/HotelCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  //Locations need to be fetched from the backend location list of hotels
  const [location, setLocation] = useState<string>("Spain");
  const [search, setSearch] = useState<string>("");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Header />
      <main className="mx-6">
        <form className="mt-6">
          <div className="flex w-1/2 flex-col">
            <label
              className="mb-1 text-xs font-bold text-[#878787]"
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
                className="text-sm font-medium text-text-black"
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
            className="mt-5 w-full rounded-lg border-2 border-secondary-grey bg-[url('/search.svg')] bg-[center_left_0.5rem] bg-no-repeat py-3 pl-8 text-sm font-medium"
            placeholder="Search Hotel"
          />
        </form>
        <section>
          <div className="mt-6 flex justify-between">
            <h2 className="text-base font-bold text-text-black">
              Nearby your location
            </h2>
            <button className="text-sm font-medium text-secondary-blue">
              See all
            </button>
          </div>
          {/* Mobile side scroll, desktop grid */}
          <Slider className="mt-6" {...settings}>
            <HotelCard variant="nearby" />
            <HotelCard variant="nearby" />
            <HotelCard variant="nearby" />
          </Slider>
        </section>

        <section>
          <div className="mt-10 flex justify-between">
            <h2 className="text-base font-bold text-text-black">
              Popular Destination
            </h2>
            <button className="text-sm font-medium text-secondary-blue">
              See all
            </button>
          </div>
          {/* Both mobile and desktop flex column */}
          <div className="mt-6 flex flex-col">
            <HotelCard variant="popular" />
            <HotelCard variant="popular" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
