import { useState } from "react";

import HotelCard from "../components/HotelCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import { THotel } from "../types";

const Home = () => {
  //Locations need to be fetched from the backend location list of hotels
  const [location, setLocation] = useState<string>("Spain");
  const [search, setSearch] = useState<string>("");
  const [isSwiping, setIsSwiping] = useState(false);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: () => setIsSwiping(true),
    afterChange: () => setIsSwiping(false),
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/hotels", {
      headers: {
        "Allow-Access-Control-Origin": "http://localhost:5173/",
      },
    });
    return await response.json();
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["hotels"],
    queryFn: fetchData,
  });

  // Disables clicking when the cards are swiping,
  // and enables it when stopped
  const handleSwiping = (e: React.MouseEvent<HTMLElement>) => {
    if (isSwiping) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <>
      <Header />
      <main className="mx-6 md:mx-10 xl:mx-auto xl:max-w-[1200px] 2xl:max-w-[1440px]">
        <form className="mt-6 xl:mt-10">
          <div className="flex w-1/2 flex-col">
            <label
              className="mb-1 text-xs font-bold text-[#878787] md:text-sm xl:text-lg"
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
                className="text-sm font-medium text-text-black lg:text-lg"
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
            className="mt-5 w-full rounded-lg border-2 border-secondary-grey bg-[url('/search.svg')] bg-[center_left_0.5rem] bg-no-repeat py-3 pl-8 text-sm font-medium xl:mt-6"
            placeholder="Search Hotel"
          />
        </form>
        <section>
          <div className="mt-6 flex justify-between xl:mt-8">
            <h2 className="text-base font-bold text-text-black md:text-lg xl:text-xl">
              Nearby your location
            </h2>
            <button className="text-sm font-medium text-secondary-blue lg:text-base">
              See all
            </button>
          </div>
          <Slider className="mt-6" {...settings}>
            {data &&
              data.map((hotel: THotel) => {
                return (
                  <div key={hotel.id}>
                    <HotelCard
                      handleSwiping={handleSwiping}
                      data={hotel}
                      variant="nearby"
                    />
                  </div>
                );
              })}
          </Slider>
        </section>

        <section>
          <div className="mt-10 flex justify-between xl:mt-12">
            <h2 className="text-base font-bold text-text-black md:text-lg xl:text-xl">
              Popular Destination
            </h2>
            <button className="text-sm font-medium text-secondary-blue lg:text-base">
              See all
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-2 pb-5 md:grid md:grid-cols-2 xl:grid-cols-3 xl:pb-10">
            {data &&
              data.map((hotel: THotel) => {
                return (
                  <HotelCard key={hotel.id} data={hotel} variant="popular" />
                );
              })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
