import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Rating from "../components/Rating";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Details = () => {
  const [readMore, setReadMore] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const handleLightboxClick = (imgIndex: number) => {
    // Opens the lightbox with the correct image
    setOpen(true);
    setIndex(imgIndex);
  };

  return (
    <>
      <Header />
      <main className="m-6 md:m-10 lg:m-14 xl:mx-auto xl:max-w-[1200px] 2xl:max-w-[1440px]">
        <img
          className="mx-auto w-full rounded-md lg:aspect-video lg:w-9/12"
          src="/Spain-1.png"
          alt=""
        />
        <Rating />
        <div className="mt-4 flex justify-between lg:mt-6">
          <h3 className="text-base font-bold text-text-black md:text-lg lg:text-xl xl:text-2xl">
            The Aston Vill hotel
          </h3>
          <p className="text-sm font-medium text-primary-grey">
            <span className="text-base text-secondary-blue">$200,7</span>/night
          </p>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <img src="/location.svg" alt="location" />
          <p className="text-xs text-primary-grey lg:text-sm">
            Alice Springs NT 0870, Australia
          </p>
        </div>

        <section className="mt-4 lg:mt-6">
          <h4 className="text-sm font-bold text-text-black md:text-base lg:text-lg xl:text-xl">
            Description
          </h4>
          <p className="mt-3 text-xs text-primary-grey lg:text-sm">
            Welcome to our tranquil retreat, where luxury meets serenity amidst
            a beautiful coastal setting. Nestled among lush gardens with views
            of the sparkling ocean, our boutique hotel promises a rejuvenating
            escape. {!readMore && "..."}
            {readMore && (
              <span>
                The lobby welcomes you with elegant decor and natural light,
                setting the stage for a memorable stay. Whether you prefer a
                cozy room or a spacious suite, each accommodation offers modern
                amenities and private balconies or terraces overlooking the
                serene surroundings. <br /> <br /> Indulge your palate at our
                restaurant, offering a delectable selection of fresh seafood and
                international cuisine, or unwind with a cocktail at our bar,
                where you can enjoy stunning sunset views. Our spa invites you
                to relax with a range of rejuvenating treatments, while our
                modern meeting facilities cater to business travelers. Explore
                nearby attractions with guided snorkeling, hiking, and cultural
                excursions, ensuring a fulfilling stay at our tranquil retreat.
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
            <img className="w-80 rounded md:w-fit" src="/Spain-1.png" alt="" />
          </button>
          <button onClick={() => handleLightboxClick(1)}>
            <img className="w-80 rounded md:w-fit" src="/Spain-2.png" alt="" />
          </button>
          <button onClick={() => handleLightboxClick(2)}>
            <img className="w-80 rounded md:w-fit" src="/Spain-3.png" alt="" />
          </button>
        </div>
        <Lightbox
          open={open}
          index={index}
          close={() => setOpen(false)}
          slides={[
            { src: "/Spain-1.png" },
            { src: "/Spain-2.png" },
            { src: "/Spain-3.png" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
};

export default Details;
