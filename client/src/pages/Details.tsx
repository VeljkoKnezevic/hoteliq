import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Rating from "../components/Rating";

const Details = () => {
  const [readMore, setReadMore] = useState<boolean>(false);

  return (
    <>
      <Header />
      <main className="m-6">
        <img className="rounded-md" src="/Spain-1.png" alt="" />
        <Rating />
        <div className="mt-4 flex justify-between">
          <h3 className="text-base font-bold text-text-black">
            The Aston Vill hotel
          </h3>
          <p className="text-sm font-medium text-primary-grey">
            <span className="text-base text-secondary-blue">$200,7</span>/night
          </p>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <img src="/location.svg" alt="location" />
          <p className="text-xs text-primary-grey">
            Alice Springs NT 0870, Australia
          </p>
        </div>

        <section className="mt-4">
          <h4 className="text-sm font-bold text-text-black">Description</h4>
          <p className="mt-3 text-xs text-primary-grey">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
            cupiditate officiis{!readMore && "..."}
            {readMore && (
              <span>
                ullam doloremque harum beatae, suscipit eligendi. Voluptatum et
                doloribus obcaecati iure labore omnis unde, esse corporis, ipsa
                laboriosam sint.
              </span>
            )}
            <button
              onClick={() => setReadMore(!readMore)}
              className="ml-1 text-sm font-bold text-primary-blue"
            >
              Read {readMore ? "less" : "more"}
            </button>
          </p>
        </section>

        <h5 className="mt-4 text-sm font-bold">Preview</h5>
        <div className="mt-2 flex gap-4">
          <img className="rounded" src="/Spain-1.png" width={100} alt="" />
          <img className="rounded" src="/Spain-2.png" width={100} alt="" />
          <img className="rounded" src="/Spain-3.png" width={100} alt="" />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Details;
