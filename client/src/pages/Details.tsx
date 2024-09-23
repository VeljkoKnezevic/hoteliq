import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Rating from "../components/Rating";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { THotel } from "../types";
import Popup from "reactjs-popup";
import BookingPopup from "../components/BookingPopup";

const Details = () => {
  const [readMore, setReadMore] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const { id } = useParams();

  const handleLightboxClick = (imgIndex: number) => {
    // Opens the lightbox with the correct image
    setOpen(true);
    setIndex(imgIndex);
  };

  const fetchHotelById = async () => {
    const response = await fetch(`http://localhost:8080/hotels/${id}`, {
      headers: {
        "Allow-Access-Control-Origin": "http://localhost:5173/",
      },
    });
    return await response.json();
  };

  const { isLoading, error, data } = useQuery<THotel>({
    queryKey: ["hotel"],
    queryFn: fetchHotelById,
  });

  if (error) {
    return (
      <>
        <Header />
        <p className="mx-6 mt-5 text-2xl md:mx-10">Error fetching data</p>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <p className="mx-6 mt-5 text-2xl md:mx-10">Loading...</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {data && (
        <main className="m-6 md:m-10 lg:m-14 xl:mx-auto xl:max-w-[1200px] 2xl:max-w-[1440px]">
          <img
            className="mx-auto w-full rounded-md lg:aspect-video lg:w-9/12"
            src={`/${data.location}-${((data.id !== undefined ? data.id : 0) % 3) + 1}.png`}
            alt=""
          />
          <Rating stars={data.rating} />
          <div className="mt-4 flex justify-between lg:mt-6">
            <h3 className="text-base font-bold text-text-black md:text-lg lg:text-xl xl:text-2xl">
              {data.name}
            </h3>
            <p className="text-sm font-medium text-primary-grey">
              <span className="text-base text-secondary-blue">
                ${data.price}
              </span>
              /night
            </p>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <img src="/location.svg" alt="location" />
            <p className="text-xs text-primary-grey lg:text-sm">
              {data.address}, {data.location}
            </p>
          </div>

          <section className="mt-4 lg:mt-6">
            <h4 className="text-sm font-bold text-text-black md:text-base lg:text-lg xl:text-xl">
              Description
            </h4>
            <p className="mt-3 text-xs text-primary-grey lg:text-sm">
              Welcome to our tranquil retreat, where luxury meets serenity
              amidst a beautiful coastal setting. Nestled among lush gardens
              with views of the sparkling ocean, our boutique hotel promises a
              rejuvenating escape. {!readMore && "..."}
              {readMore && (
                <span>
                  The lobby welcomes you with elegant decor and natural light,
                  setting the stage for a memorable stay. Whether you prefer a
                  cozy room or a spacious suite, each accommodation offers
                  modern amenities and private balconies or terraces overlooking
                  the serene surroundings. <br /> <br /> Indulge your palate at
                  our restaurant, offering a delectable selection of fresh
                  seafood and international cuisine, or unwind with a cocktail
                  at our bar, where you can enjoy stunning sunset views. Our spa
                  invites you to relax with a range of rejuvenating treatments,
                  while our modern meeting facilities cater to business
                  travelers. Explore nearby attractions with guided snorkeling,
                  hiking, and cultural excursions, ensuring a fulfilling stay at
                  our tranquil retreat.
                </span>
              )}
              <button
                onClick={() => setReadMore(!readMore)}
                className="ml-1 text-sm font-bold text-primary-blue"
              >
                {readMore ? "Show less" : "Read more"}
              </button>
            </p>
          </section>

          <h5 className="mt-4 text-sm font-bold md:text-base">Preview</h5>
          <div className="mt-2 flex flex-col items-center gap-4 md:flex-row md:justify-center">
            <button onClick={() => handleLightboxClick(0)}>
              <img
                className="w-80 rounded md:w-fit"
                src={`/${data.location}-1.png`}
                alt=""
              />
            </button>
            <button onClick={() => handleLightboxClick(1)}>
              <img
                className="w-80 rounded md:w-fit"
                src={`/${data.location}-2.png`}
                alt=""
              />
            </button>
            <button onClick={() => handleLightboxClick(2)}>
              <img
                className="w-80 rounded md:w-fit"
                src={`/${data.location}-3.png`}
                alt=""
              />
            </button>
          </div>
          <Lightbox
            open={open}
            index={index}
            close={() => setOpen(false)}
            slides={[
              { src: `/${data.location}-1.png` },
              { src: `/${data.location}-2.png` },
              { src: `/${data.location}-3.png` },
            ]}
          />
          <div className="flex w-full md:justify-center">
            <Popup
              className="popup-calendar"
              trigger={
                <button className="mt-3 w-full rounded-xl bg-primary-blue py-4 text-sm font-bold text-[#fff] md:mt-6 md:w-1/2 md:text-base lg:mt-8 xl:mt-10 xl:py-6">
                  Book now
                </button>
              }
              modal
              lockScroll
            >
              <BookingPopup />
            </Popup>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Details;
