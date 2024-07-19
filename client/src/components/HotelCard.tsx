import Popup from "reactjs-popup";
import { HotelCardVariants } from "../types";
import { isButtonElement } from "react-router-dom/dist/dom";

type THotelCard = {
  variant: HotelCardVariants;
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e);
};

const HotelCard = ({ variant }: THotelCard) => {
  if (variant == "nearby") {
    return (
      <section className="mx-2 max-w-fit rounded-lg">
        <Popup
          trigger={
            <button>
              <img className="rounded-t-lg" src="/Australia-1.png" alt="" />
              <div className="p-3">
                <div className="flex justify-between">
                  <h3 className="text-sm font-bold text-text-black">
                    The Aston Hotel
                  </h3>
                  <div className="flex items-end gap-2">
                    <img src="star.svg" alt="Star" />
                    <p className="text-sm font-bold text-text-black">5.0</p>
                  </div>
                </div>
                <div className="text-start">
                  <p className="mt-2 text-xs font-medium text-primary-grey">
                    Alice Springs NT0870, Australia
                  </p>
                  <p className="mt-2 text-xs font-medium text-primary-grey">
                    <span className="text-sm font-bold text-secondary-blue">
                      $165,3{" "}
                    </span>
                    /night
                  </p>
                </div>
              </div>
            </button>
          }
        >
          Example
        </Popup>
      </section>
    );
  } else {
    // popular
    return (
      <section>
        <button onClick={handleClick} className="flex gap-4 p-3 text-start">
          <img
            width={84}
            className="h-[84px] rounded-sm"
            src="/Australia-1.png"
            alt=""
          />
          <div className="py-1">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-bold text-text-black">
                The Aston Hotel
              </h3>
              <p className="text-xs font-medium text-primary-grey">
                <span className="text-sm font-bold text-secondary-blue">
                  $165,3
                </span>
                /night
              </p>
            </div>
            <p className="mt-2 text-xs font-medium text-primary-grey">
              Alice Springs NT0870, Australia
            </p>
            <div className="mt-2 flex items-center gap-2">
              <img src="star.svg" alt="Star" />
              <p className="text-sm font-bold text-text-black">5.0</p>
            </div>
          </div>
        </button>
      </section>
    );
  }
};

export default HotelCard;
