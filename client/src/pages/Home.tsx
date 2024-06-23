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

  console.log(location);

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
              <img src="/location.svg" alt="location" />

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
          <div className="mt-6 flex flex-col pb-4">
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
