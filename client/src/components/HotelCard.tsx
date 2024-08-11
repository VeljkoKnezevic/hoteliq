import { HotelCardVariants, THotel } from "../types";
import { Link } from "react-router-dom";

type THotelCard = {
  variant: HotelCardVariants;
  data: THotel;
};

const HotelCard = ({ variant, data }: THotelCard) => {
  if (variant == "nearby") {
    return (
      <Link to={"/details/1"}>
        <section className="mx-2 max-w-fit rounded-lg">
          <img className="rounded-t-lg" src="/Australia-1.png" alt="" />
          <div className="p-3">
            <div className="flex justify-between">
              <h3 className="text-sm font-bold text-text-black">
                {data && data.name}
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
        </section>
      </Link>
    );
  } else {
    // popular
    return (
      <Link to={"/details/1"} className="w-fit">
        <section className="flex gap-4 p-3 text-start">
          <img
            width={84}
            className="h-[84px] rounded-sm"
            src="/Australia-1.png"
            alt=""
          />
          <div className="py-1">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-bold text-text-black">{data.name}</h3>
              <p className="text-xs font-medium text-primary-grey">
                <span className="text-sm font-bold text-secondary-blue">
                  $165,3
                </span>
                /night
              </p>
            </div>
            <p className="mt-2 text-xs font-medium text-primary-grey">
              {data.address}, {data.location}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <img src="star.svg" alt="Star" />
              <p className="text-sm font-bold text-text-black">5.0</p>
            </div>
          </div>
        </section>
      </Link>
    );
  }
};

export default HotelCard;
