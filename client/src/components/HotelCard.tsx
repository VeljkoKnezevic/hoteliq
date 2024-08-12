import { HotelCardVariants, THotel } from "../types";
import { Link } from "react-router-dom";

type THotelCard = {
  variant: HotelCardVariants;
  data: THotel;
  handleSwiping?: (e: React.MouseEvent<HTMLElement>) => void;
};

const HotelCard = ({ variant, data, handleSwiping }: THotelCard) => {
  // Generates price and hotel rating based on id
  function getNumbers(id: number, min: number, max: number) {
    const range = max - min;

    return Number(min + (range * Math.log(id + 1)) / Math.log(40))
      .toFixed(1)
      .replace(/(\.0+|0+)$/, "");
  }

  if (variant == "nearby") {
    return (
      <Link to={"/details/1"}>
        {data && (
          <section
            onClick={handleSwiping}
            className="mx-2 max-w-fit rounded-lg"
          >
            <img
              className="rounded-t-lg"
              src={`/${data.location}-${(data.id % 3) + 1}.png`}
              alt=""
            />
            <div className="p-3">
              <div className="flex justify-between">
                <h3 className="text-sm font-bold text-text-black">
                  {data.name}
                </h3>
                <div className="flex items-end gap-2">
                  <img src="star.svg" alt="Star" />
                  <p className="text-sm font-bold text-text-black">
                    {Number(getNumbers(data.id, 3, 5)) > 5
                      ? "5.0"
                      : getNumbers(data.id, 3.5, 5)}
                  </p>
                </div>
              </div>
              <div className="text-start">
                <p className="mt-2 text-xs font-medium text-primary-grey">
                  {data.address}, {data.location}
                </p>
                <p className="mt-2 text-xs font-medium text-primary-grey">
                  <span className="text-sm font-bold text-secondary-blue">
                    ${getNumbers(data.id, 150, 450)}
                  </span>
                  /night
                </p>
              </div>
            </div>
          </section>
        )}
      </Link>
    );
  } else {
    // popular
    return (
      <Link to={"/details/1"} className="w-fit">
        {data && (
          <section className="flex gap-4 p-3 text-start">
            <img
              width={84}
              className="h-[84px] rounded-sm"
              src={`/${data.location}-${(data.id % 3) + 1}.png`}
              alt=""
            />
            <div className="py-1">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-bold text-text-black">
                  {data.name}
                </h3>
                <p className="text-xs font-medium text-primary-grey">
                  <span className="text-sm font-bold text-secondary-blue">
                    ${getNumbers(data.id, 150, 450)}
                  </span>
                  /night
                </p>
              </div>
              <p className="mt-2 text-xs font-medium text-primary-grey">
                {data.address}, {data.location}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <img src="star.svg" alt="Star" />
                <p className="text-sm font-bold text-text-black">
                  {Number(getNumbers(data.id, 3, 5)) > 5
                    ? "5.0"
                    : getNumbers(data.id, 3.5, 5)}
                </p>
              </div>
            </div>
          </section>
        )}
      </Link>
    );
  }
};

export default HotelCard;
