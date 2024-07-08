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
    arrows: true,
    infinite: true,
    centerMode: false,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          centerMode: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="mx-6 md:mx-10">
        <form className="mt-6">
          <div className="flex w-1/2 flex-col">
            <label
              className="mb-1 text-xs font-bold text-[#878787] md:text-sm"
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
            <h2 className="text-base font-bold text-text-black md:text-lg">
              Nearby your location
            </h2>
            <button className="text-sm font-medium text-secondary-blue">
              See all
            </button>
          </div>
          <Slider className="mt-6" {...settings}>
            <div>
              <HotelCard variant="nearby" />
            </div>
            <div>
              <HotelCard variant="nearby" />
            </div>
            <div>
              <HotelCard variant="nearby" />
            </div>
          </Slider>
        </section>

        <section>
          <div className="mt-10 flex justify-between">
            <h2 className="text-base font-bold text-text-black md:text-lg">
              Popular Destination
            </h2>
            <button className="text-sm font-medium text-secondary-blue">
              See all
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-2 pb-4 md:grid md:grid-cols-2">
            <HotelCard variant="popular" />
            <HotelCard variant="popular" />
            <HotelCard variant="popular" />
            <HotelCard variant="popular" />
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
